import { Router, Request, Response } from 'express';
import { randomBytes } from 'crypto';
import { DailyScore } from '../models/DailyScore';
import { generateDailyTargets, todayUTC } from '../utils/seedRandom';

const router = Router();

// ---------------------------------------------------------------------------
// GET /api/daily/challenge
// Returns today's target sizes (same for every player).
// Pass ?playerId=<uuid> to check whether this player has already played today.
// ---------------------------------------------------------------------------
router.get('/challenge', async (req: Request, res: Response) => {
  try {
    const date = todayUTC();
    const targets = generateDailyTargets(date);

    const playerId = req.query.playerId as string | undefined;
    let alreadyPlayed = false;
    let existingShareId: string | null = null;

    if (playerId) {
      const existing = await DailyScore.findOne({ date, playerId }).select('shareId').lean();
      if (existing) {
        alreadyPlayed = true;
        existingShareId = existing.shareId;
      }
    }

    res.json({ date, targets, alreadyPlayed, shareId: existingShareId });
  } catch (err) {
    res.status(500).json({ error: 'Failed to load daily challenge' });
  }
});

// ---------------------------------------------------------------------------
// POST /api/daily/submit
// Submit a score for today's daily challenge.
// Body: { playerId: string, playerName: string, score: number }
//   playerId   — client UUID (stored in localStorage)
//   playerName — display name shown on the leaderboard / share card
//   score      — final score (lower = better; exact meaning defined by client)
// ---------------------------------------------------------------------------
router.post('/submit', async (req: Request, res: Response) => {
  try {
    const { playerId, playerName, score } = req.body as {
      playerId?: string;
      playerName?: string;
      score?: number;
    };

    if (!playerId || typeof playerId !== 'string') {
      res.status(400).json({ error: 'playerId is required' });
      return;
    }
    if (!playerName || typeof playerName !== 'string' || playerName.trim().length === 0) {
      res.status(400).json({ error: 'playerName is required' });
      return;
    }
    if (typeof score !== 'number' || score < 0) {
      res.status(400).json({ error: 'score must be a non-negative number' });
      return;
    }

    const date = todayUTC();

    // Enforce one-play-per-day
    const existing = await DailyScore.findOne({ date, playerId }).lean();
    if (existing) {
      res.status(409).json({ error: 'Already submitted for today', shareId: existing.shareId });
      return;
    }

    const shareId = randomBytes(5).toString('hex'); // 10-char hex, e.g. "a3f2c1d0e5"

    const entry = await DailyScore.create({
      date,
      playerId,
      playerName: playerName.trim().slice(0, 30),
      score,
      shareId,
    });

    // Compute leaderboard rank (higher score = better, so rank = # of people who scored MORE)
    const rank = await DailyScore.countDocuments({ date, score: { $gt: score } }) + 1;

    res.status(201).json({
      shareId: entry.shareId,
      date: entry.date,
      playerName: entry.playerName,
      score: entry.score,
      rank,
    });
  } catch (err: any) {
    if (err.code === 11000) {
      // Duplicate key — race condition fallback
      const existing = await DailyScore.findOne({
        date: todayUTC(),
        playerId: req.body.playerId,
      }).lean();
      res.status(409).json({ error: 'Already submitted for today', shareId: existing?.shareId });
      return;
    }
    res.status(500).json({ error: 'Failed to submit score' });
  }
});

// ---------------------------------------------------------------------------
// GET /api/daily/result/:shareId
// Fetch a single result by its share ID (for share cards / links).
// ---------------------------------------------------------------------------
router.get('/result/:shareId', async (req: Request, res: Response) => {
  try {
    const entry = await DailyScore.findOne({ shareId: req.params.shareId })
      .select('-playerId -__v')
      .lean();

    if (!entry) {
      res.status(404).json({ error: 'Result not found' });
      return;
    }

    // Rank among all scores on that date
    const rank = await DailyScore.countDocuments({ date: entry.date, score: { $gt: entry.score } }) + 1;
    const total = await DailyScore.countDocuments({ date: entry.date });
    const targets = generateDailyTargets(entry.date);

    res.json({ ...entry, rank, total, targets });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch result' });
  }
});

export default router;

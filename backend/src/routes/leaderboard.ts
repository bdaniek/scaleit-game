import { Router, Request, Response } from 'express';
import { DailyScore } from '../models/DailyScore';
import { todayUTC } from '../utils/seedRandom';

const router = Router();

// ---------------------------------------------------------------------------
// GET /api/leaderboard/daily
// Returns the top scores for today's daily challenge (or a specific date).
// Query params:
//   ?date=YYYY-MM-DD  — defaults to today (UTC)
//   ?limit=N          — number of entries to return, max 100, default 10
// ---------------------------------------------------------------------------
router.get('/daily', async (req: Request, res: Response) => {
  try {
    const date = typeof req.query.date === 'string' ? req.query.date : todayUTC();
    const limit = Math.min(parseInt((req.query.limit as string) || '10', 10), 100);

    // Validate date format
    if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) {
      res.status(400).json({ error: 'Invalid date format, expected YYYY-MM-DD' });
      return;
    }

    const scores = await DailyScore.find({ date })
      .select('playerName score completedAt shareId')
      .sort({ score: -1 })  // descending: higher accuracy = better
      .limit(limit)
      .lean();

    const total = await DailyScore.countDocuments({ date });

    res.json({ date, total, scores });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch leaderboard' });
  }
});

export default router;

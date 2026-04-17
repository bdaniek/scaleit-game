const BASE_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:3000';

// ─── Response types ─────────────────────────────────────────────────────────

export interface DailyChallengeResponse {
  date: string;
  targets: number[];
  alreadyPlayed: boolean;
  shareId: string | null;
}

export interface SubmitScoreResponse {
  shareId: string;
  date: string;
  playerName: string;
  score: number;
  rank: number;
}

export interface LeaderboardEntry {
  playerName: string;
  score: number;
  completedAt: string;
  shareId: string;
}

export interface LeaderboardResponse {
  date: string;
  total: number;
  scores: LeaderboardEntry[];
}

// ─── Player ID ───────────────────────────────────────────────────────────────

export function getOrCreatePlayerId(): string {
  let id = localStorage.getItem('scaleit_player_id');
  if (!id) {
    id = crypto.randomUUID();
    localStorage.setItem('scaleit_player_id', id);
  }
  return id;
}

// ─── API calls ───────────────────────────────────────────────────────────────

export async function getDailyChallenge(playerId: string): Promise<DailyChallengeResponse> {
  const res = await fetch(`${BASE_URL}/api/daily/challenge?playerId=${encodeURIComponent(playerId)}`);
  if (!res.ok) throw new Error('Failed to fetch daily challenge');
  return res.json();
}

export async function submitDailyScore(payload: {
  playerId: string;
  playerName: string;
  score: number;
}): Promise<SubmitScoreResponse> {
  const res = await fetch(`${BASE_URL}/api/daily/submit`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error ?? 'Failed to submit score');
  return data;
}

export async function getDailyLeaderboard(): Promise<LeaderboardResponse> {
  const res = await fetch(`${BASE_URL}/api/leaderboard/daily`);
  if (!res.ok) throw new Error('Failed to fetch leaderboard');
  return res.json();
}

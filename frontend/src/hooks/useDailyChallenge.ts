import { useState, useCallback } from 'react';
import {
  getDailyChallenge,
  submitDailyScore,
  getDailyLeaderboard,
  getOrCreatePlayerId,
} from '../api/client';
import type {
  DailyChallengeResponse,
  SubmitScoreResponse,
  LeaderboardResponse,
} from '../api/client';

export type DailyStatus =
  | 'idle'
  | 'loading'
  | 'ready'
  | 'already_played'
  | 'submitting'
  | 'submitted'
  | 'error';

export const useDailyChallenge = () => {
  const [status, setStatus] = useState<DailyStatus>('idle');
  const [challenge, setChallenge] = useState<DailyChallengeResponse | null>(null);
  const [submitResult, setSubmitResult] = useState<SubmitScoreResponse | null>(null);
  const [leaderboard, setLeaderboard] = useState<LeaderboardResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  const loadChallenge = useCallback(async () => {
    setStatus('loading');
    setError(null);
    try {
      const playerId = getOrCreatePlayerId();
      const data = await getDailyChallenge(playerId);
      setChallenge(data);

      // Also pre-fetch leaderboard so it's ready immediately
      try {
        const lb = await getDailyLeaderboard();
        setLeaderboard(lb);
      } catch { /* leaderboard is non-critical */ }

      setStatus(data.alreadyPlayed ? 'already_played' : 'ready');
    } catch {
      setError("Couldn't reach the server. Is the backend running?");
      setStatus('error');
    }
  }, []);

  const submitScore = useCallback(async (score: number, playerName: string) => {
    setStatus('submitting');
    try {
      const playerId = getOrCreatePlayerId();
      const result = await submitDailyScore({ playerId, playerName, score });
      setSubmitResult(result);

      try {
        const lb = await getDailyLeaderboard();
        setLeaderboard(lb);
      } catch { /* non-critical */ }

      setStatus('submitted');
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : 'Failed to submit score');
      setStatus('error');
    }
  }, []);

  const reset = useCallback(() => {
    setStatus('idle');
    setChallenge(null);
    setSubmitResult(null);
    setLeaderboard(null);
    setError(null);
  }, []);

  return {
    status,
    challenge,
    submitResult,
    leaderboard,
    error,
    loadChallenge,
    submitScore,
    reset,
  };
};

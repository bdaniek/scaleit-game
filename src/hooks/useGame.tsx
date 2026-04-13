import { useState, useEffect, useRef } from 'react';

export const ROUNDS = 2;
export const MEMORIZE_DURATION = 1000;
const RESULT_DURATION = 1500;
const MIN_SIZE = 30;
const MAX_SIZE = 300;

const randomSize = () => Math.floor(Math.random() * (MAX_SIZE - MIN_SIZE + 1)) + MIN_SIZE;

export type Phase = 'idle' | 'countdown' | 'memorize' | 'recall' | 'result' | 'finished';

export interface RoundResult {
  target: number;
  guess: number;
  diff: number;
}

export const useGame = () => {
  const [phase, setPhase] = useState<Phase>('idle');
  const [round, setRound] = useState(1);
  const [targetSize, setTargetSize] = useState(0);
  const [shapeSize, setShapeSize] = useState(100);
  const [results, setResults] = useState<RoundResult[]>([]);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const clearTimer = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
  };

  const startRound = () => {
    const size = randomSize();
    setTargetSize(size);
    setShapeSize(randomSize());
    setPhase('memorize');

    timerRef.current = setTimeout(() => {
      setPhase('recall');
    }, MEMORIZE_DURATION);
  };

  const startCountdown = () => {
    setPhase('countdown');
  };

  const startGame = () => {
    setRound(1);
    setResults([]);
    startRound();
  };

  const submitGuess = () => {
    clearTimer();
    const diff = Math.abs(targetSize - shapeSize);
    const result: RoundResult = { target: targetSize, guess: shapeSize, diff };
    const newResults = [...results, result];
    setResults(newResults);
    setPhase('result');

    timerRef.current = setTimeout(() => {
      if (round >= ROUNDS) {
        setPhase('finished');
      } else {
        const nextRound = round + 1;
        setRound(nextRound);
        startRound();
      }
    }, RESULT_DURATION);
  };

  useEffect(() => () => clearTimer(), []);

  return {
    phase,
    round,
    targetSize,
    shapeSize,
    results,
    setShapeSize,
    startGame,
    submitGuess,
    startCountdown,
  };
};

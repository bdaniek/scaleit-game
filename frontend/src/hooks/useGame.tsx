import { useState, useEffect, useRef, useCallback } from 'react';
import { randomShape, randomColor } from '../GamePanel/shapes';
import type { ShapeType } from '../GamePanel/shapes';

export const DEFAULT_ROUNDS = 5;
export const MEMORIZE_DURATION = 2000;
const RESULT_DURATION = 2000;
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
  const [totalRounds, setTotalRounds] = useState(DEFAULT_ROUNDS);
  const [targetSize, setTargetSize] = useState(0);
  const [shapeSize, setShapeSize] = useState(100);
  const [results, setResults] = useState<RoundResult[]>([]);
  const [shape, setShape] = useState<ShapeType>(randomShape);
  const [color, setColor] = useState(randomColor);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Targets for the current game session (undefined = use random)
  const sessionTargetsRef = useRef<number[] | undefined>(undefined);

  const clearTimer = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
  };

  const startRound = (roundNumber: number) => {
    const size = sessionTargetsRef.current
      ? sessionTargetsRef.current[roundNumber - 1]
      : randomSize();
    setTargetSize(size);
    setShapeSize(randomSize());
    setShape(randomShape());
    setColor(randomColor());
    setPhase('memorize');

    timerRef.current = setTimeout(() => {
      setPhase('recall');
    }, MEMORIZE_DURATION);
  };

  const startCountdown = useCallback(() => {
    setPhase('countdown');
  }, []);

  // targets = undefined → normal random game
  // targets = number[] → daily mode with seeded sizes
  const startGame = (targets?: number[]) => {
    sessionTargetsRef.current = targets;
    const rounds = targets ? targets.length : DEFAULT_ROUNDS;
    setTotalRounds(rounds);
    setRound(1);
    setResults([]);
    startRound(1);
  };

  const submitGuess = () => {
    clearTimer();
    const diff = Math.abs(targetSize - shapeSize);
    const result: RoundResult = { target: targetSize, guess: shapeSize, diff };
    const newResults = [...results, result];
    setResults(newResults);
    setPhase('result');

    const currentRound = round;
    const currentTotalRounds = sessionTargetsRef.current
      ? sessionTargetsRef.current.length
      : totalRounds;

    timerRef.current = setTimeout(() => {
      if (currentRound >= currentTotalRounds) {
        setPhase('finished');
      } else {
        const nextRound = currentRound + 1;
        setRound(nextRound);
        startRound(nextRound);
      }
    }, RESULT_DURATION);
  };

  const handleFinishGame = () => {
    sessionTargetsRef.current = undefined;
    setPhase('idle');
    setRound(1);
    setTotalRounds(DEFAULT_ROUNDS);
  };

  useEffect(() => () => clearTimer(), []);

  return {
    phase,
    round,
    totalRounds,
    targetSize,
    shapeSize,
    shape,
    color,
    results,
    setShapeSize,
    startGame,
    submitGuess,
    startCountdown,
    handleFinishGame,
  };
};

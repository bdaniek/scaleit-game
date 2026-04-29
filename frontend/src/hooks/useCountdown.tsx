import { useEffect, useRef, useState } from 'react';

interface CountdownProps {
  start: boolean;
  from?: number;
  delay?: number;
  onFinish?: () => void;
  decimals?: boolean;
  round?: number;
}

export const useCountdown = ({
  start,
  from = 3,
  delay = 0,
  onFinish,
  decimals = false,
  round,
}: CountdownProps) => {
  const [value, setValue] = useState<number | null>(null);
  const prevRoundRef = useRef<number | undefined>(undefined);
  const prevStartRef = useRef<boolean>(false);

  useEffect(() => {
    const roundChanged = round !== prevRoundRef.current;
    const startedFresh = start && !prevStartRef.current;

    prevRoundRef.current = round;
    prevStartRef.current = start;

    if (!start && !roundChanged) return;
    if (!startedFresh && !roundChanged) return;

    const timeout = setTimeout(() => {
      setValue(from);

      if (decimals) {
        const interval = setInterval(() => {
          setValue((prev) => {
            if (typeof prev !== 'number') return prev;

            const next = Math.round((prev - 0.01) * 100) / 100;

            if (next <= 0) {
              clearInterval(interval);
              onFinish?.();
              return null;
            }

            return next;
          });
        }, 10);

        return () => clearInterval(interval);
      } else {
        const interval = setInterval(() => {
          setValue((prev) => {
            if (typeof prev !== 'number') return prev;

            if (prev <= 1) {
              clearInterval(interval);
              onFinish?.();
              return null;
            }

            return prev - 1;
          });
        }, 900);

        return () => clearInterval(interval);
      }
    }, delay);

    return () => clearTimeout(timeout);
  }, [start, round]);

  return value;
};

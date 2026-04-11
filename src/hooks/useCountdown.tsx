import { useEffect, useRef, useState } from 'react';

interface CountdownProps {
  start: boolean;
  from?: number;
  delay?: number;
  onFinish?: () => void;
}

export const useCountdown = ({ start, from = 3, delay = 1000, onFinish }: CountdownProps) => {
  const [value, setValue] = useState<number | null>(null);
  const startedRef = useRef(false);

  useEffect(() => {
    if (!start || startedRef.current) return;

    startedRef.current = true;

    const timeout = setTimeout(() => {
      setValue(from);

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
      }, 1000);
    }, delay);

    return () => clearTimeout(timeout);
  }, [start, from, delay, onFinish]);

  return value;
};

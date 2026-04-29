import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

interface SplitTextProps {
  text: string;
  ease?: string;
  duration?: number;
  delay?: number;
  stagger?: number;
  className?: string;
  from?: gsap.TweenVars;
}

const SplitText = ({
  text,
  ease = 'bounce.out',
  duration = 0.8,
  delay = 0,
  stagger = 0.04,
  className,
  from = { y: 36, opacity: 0 },
}: SplitTextProps) => {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const chars = el.querySelectorAll<HTMLElement>('.sc');
    gsap.fromTo(
      chars,
      from,
      { y: 0, opacity: 1, duration, ease, stagger, delay, clearProps: 'transform' }
    );
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [text]);

  return (
    <span ref={ref} className={className} aria-label={text} style={{ display: 'inline-block' }}>
      {Array.from(text).map((char, i) => (
        <span
          key={i}
          className="sc"
          style={{ display: 'inline-block', willChange: 'transform, opacity' }}
        >
          {char === ' ' ? '\u00A0' : char}
        </span>
      ))}
    </span>
  );
};

export default SplitText;

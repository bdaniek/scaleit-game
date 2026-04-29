import { useEffect, useRef } from 'react';

interface DotGridProps {
  dotSize?: number;
  gap?: number;
  baseColor?: string;
  activeColor?: string;
  proximity?: number;
  fadeSpeed?: number;
  style?: React.CSSProperties;
  className?: string;
}

const DotGrid = ({
  dotSize = 2,
  gap = 24,
  baseColor = '#ddd8f3',
  activeColor = '#4c39d6',
  proximity = 100,
  fadeSpeed = 0.1,
  style,
  className,
}: DotGridProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const mouse = { x: -9999, y: -9999 };
    let rafId: number;

    interface Dot {
      x: number;
      y: number;
      alpha: number;
    }

    let dots: Dot[] = [];

    const hexToRgb = (hex: string) => {
      const cleaned = hex.replace('#', '');
      return {
        r: parseInt(cleaned.slice(0, 2), 16),
        g: parseInt(cleaned.slice(2, 4), 16),
        b: parseInt(cleaned.slice(4, 6), 16),
      };
    };

    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

    const buildDots = () => {
      dots = [];
      const step = dotSize * 2 + gap;
      const cols = Math.ceil(canvas.width / step) + 1;
      const rows = Math.ceil(canvas.height / step) + 1;
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          dots.push({
            x: c * step + gap / 2,
            y: r * step + gap / 2,
            alpha: 0,
          });
        }
      }
    };

    const resize = () => {
      canvas.width = canvas.offsetWidth * window.devicePixelRatio;
      canvas.height = canvas.offsetHeight * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
      buildDots();
    };

    const base = hexToRgb(baseColor);
    const active = hexToRgb(activeColor);

    const draw = () => {
      ctx.clearRect(0, 0, canvas.offsetWidth, canvas.offsetHeight);

      for (const dot of dots) {
        const dx = dot.x - mouse.x;
        const dy = dot.y - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const target = dist < proximity ? 1 - dist / proximity : 0;
        dot.alpha += (target - dot.alpha) * fadeSpeed;

        const r = Math.round(lerp(base.r, active.r, dot.alpha));
        const g = Math.round(lerp(base.g, active.g, dot.alpha));
        const b = Math.round(lerp(base.b, active.b, dot.alpha));

        ctx.beginPath();
        ctx.arc(dot.x, dot.y, dotSize, 0, Math.PI * 2);
        ctx.fillStyle = `rgb(${r},${g},${b})`;
        ctx.fill();
      }

      rafId = requestAnimationFrame(draw);
    };

    const onMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };

    const onMouseLeave = () => {
      mouse.x = -9999;
      mouse.y = -9999;
    };

    resize();
    draw();

    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseleave', onMouseLeave);

    return () => {
      cancelAnimationFrame(rafId);
      ro.disconnect();
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseleave', onMouseLeave);
    };
  }, [dotSize, gap, baseColor, activeColor, proximity, fadeSpeed]);

  return (
    <canvas
      ref={canvasRef}
      className={className}
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        display: 'block',
        pointerEvents: 'none',
        ...style,
      }}
    />
  );
};

export default DotGrid;

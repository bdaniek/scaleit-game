import { keyframes, styled } from '@mui/material';
import { getShapePoints, type ShapeType } from './shapes';

// ─── Animations ────────────────────────────────────────────────────────────────

const scaleIn = keyframes`
  from { transform: scale(0); }
  to   { transform: scale(1); }
`;

const fadeIn = keyframes`
  from { opacity: 0; }
  to   { opacity: 1; }
`;

// ─── Wrappers (one per variant to avoid keyframe interpolation issues) ─────────

const BubbleWrap = styled('div')<{ $size: number }>`
  position: absolute;
  width: ${({ $size }) => $size}px;
  height: ${({ $size }) => $size}px;
  cursor: pointer;
  animation: ${scaleIn} 300ms cubic-bezier(0.34, 1.56, 0.64, 1) both;

  &:active {
    transform: scale(0.9);
  }
`;

const GuessWrap = styled('div')<{ $size: number }>`
  position: absolute;
  width: ${({ $size }) => $size}px;
  height: ${({ $size }) => $size}px;
  pointer-events: none;
  animation: ${scaleIn} 320ms cubic-bezier(0.34, 1.56, 0.64, 1) both;
`;

const RingWrap = styled('div')<{ $size: number }>`
  position: absolute;
  width: ${({ $size }) => $size}px;
  height: ${({ $size }) => $size}px;
  pointer-events: none;
  z-index: 2;
  filter: drop-shadow(0 0 6px rgba(45, 27, 110, 0.5));
  animation: ${fadeIn} 250ms ease both;
`;

// ─── SVG shape renderer ────────────────────────────────────────────────────────

interface ShapeSvgProps {
  shape: ShapeType;
  color: string;
  variant: 'bubble' | 'guess' | 'ring';
  isOvershot?: boolean;
}

const ShapeSvg = ({ shape, color, variant }: ShapeSvgProps) => {
  const points = getShapePoints(shape);
  const isCircle = shape === 'circle';

  const fill = variant === 'ring' ? 'none' : color;

  const fillOpacity = variant === 'guess' ? 0.75 : 1;
  const stroke = variant === 'ring' ? 'rgba(199,199,199,0.9)' : 'none';
  const strokeWidth = variant === 'ring' ? 4 : 0;
  const strokeDasharray = variant === 'ring' ? '7 4' : undefined;
  const vectorEffect = variant === 'ring' ? 'non-scaling-stroke' : undefined;

  return (
    <svg viewBox="0 0 100 100" width="100%" height="100%" overflow="visible">
      {isCircle ? (
        <circle
          cx="50"
          cy="50"
          r={variant === 'ring' ? 46 : 50}
          fill={fill}
          fillOpacity={fillOpacity}
          stroke={stroke}
          strokeWidth={strokeWidth}
          strokeDasharray={strokeDasharray}
          vectorEffect={vectorEffect}
        />
      ) : (
        <polygon
          points={points}
          fill={fill}
          fillOpacity={fillOpacity}
          stroke={stroke}
          strokeWidth={strokeWidth}
          strokeDasharray={strokeDasharray}
          vectorEffect={vectorEffect}
        />
      )}
    </svg>
  );
};

// ─── Public component ──────────────────────────────────────────────────────────

export interface GameShapeProps {
  shape: ShapeType;
  size: number;
  color: string;
  variant: 'bubble' | 'guess' | 'ring';
  isOvershot?: boolean;
}

const GameShape = ({ shape, size, color, variant, isOvershot }: GameShapeProps) => {
  const svg = <ShapeSvg shape={shape} color={color} variant={variant} isOvershot={isOvershot} />;

  if (variant === 'bubble') return <BubbleWrap $size={size}>{svg}</BubbleWrap>;
  if (variant === 'guess') return <GuessWrap $size={size}>{svg}</GuessWrap>;
  return <RingWrap $size={size}>{svg}</RingWrap>;
};

export default GameShape;

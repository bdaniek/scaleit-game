export type ShapeType = 'circle' | 'square' | 'triangle' | 'hexagon' | 'pentagon' | 'diamond' | 'star';

export const SHAPES: ShapeType[] = [
  'circle',
  'square',
  'triangle',
  'hexagon',
  'pentagon',
  'diamond',
  'star',
];

export const COLORS = [
  '#7c6af5', // purple
  '#e85d75', // coral pink
  '#3bb87f', // emerald
  '#f5a623', // amber
  '#4a9eed', // sky blue
  '#b45de8', // violet
  '#e8735a', // terracotta
  '#2dd4bf', // teal
];

export function randomShape(): ShapeType {
  return SHAPES[Math.floor(Math.random() * SHAPES.length)];
}

export function randomColor(): string {
  return COLORS[Math.floor(Math.random() * COLORS.length)];
}

/**
 * Returns SVG polygon points string for the given shape within a 100×100 viewBox.
 * Returns '' for 'circle' (rendered via <circle> element instead).
 */
export function getShapePoints(shape: ShapeType): string {
  switch (shape) {
    case 'circle':
      return '';

    case 'square':
      return '3,3 97,3 97,97 3,97';

    case 'triangle':
      return '50,3 97,95 3,95';

    case 'diamond':
      return '50,3 97,50 50,97 3,50';

    case 'hexagon': {
      // Pointy-top hexagon
      const cx = 50, cy = 50, r = 47;
      return Array.from({ length: 6 }, (_, i) => {
        const a = (Math.PI / 3) * i - Math.PI / 2;
        return `${(cx + r * Math.cos(a)).toFixed(1)},${(cy + r * Math.sin(a)).toFixed(1)}`;
      }).join(' ');
    }

    case 'pentagon': {
      const cx = 50, cy = 50, r = 47;
      return Array.from({ length: 5 }, (_, i) => {
        const a = (2 * Math.PI / 5) * i - Math.PI / 2;
        return `${(cx + r * Math.cos(a)).toFixed(1)},${(cy + r * Math.sin(a)).toFixed(1)}`;
      }).join(' ');
    }

    case 'star': {
      const cx = 50, cy = 50, outerR = 47, innerR = 20;
      const pts: string[] = [];
      for (let i = 0; i < 5; i++) {
        const oa = (2 * Math.PI / 5) * i - Math.PI / 2;
        const ia = oa + Math.PI / 5;
        pts.push(`${(cx + outerR * Math.cos(oa)).toFixed(1)},${(cy + outerR * Math.sin(oa)).toFixed(1)}`);
        pts.push(`${(cx + innerR * Math.cos(ia)).toFixed(1)},${(cy + innerR * Math.sin(ia)).toFixed(1)}`);
      }
      return pts.join(' ');
    }

    default:
      return '';
  }
}

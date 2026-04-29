export type ShapeType = 'circle' | 'square' | 'triangle' | 'hexagon' | 'pentagon' | 'diamond';

export const SHAPES: ShapeType[] = [
  'circle',
  'square',
  'triangle',
  'hexagon',
  'pentagon',
  'diamond',
];

export const COLORS = [
  '#2D1B6E', // deep indigo
  '#003153', // prussian blue
  '#5C4B6E', // dusty purple
  '#2E4A3F', // forest green
  '#1A3A5C', // midnight blue
  '#6B1F38', // dark wine
  '#3D5447', // sage green
  '#4A3260', // deep violet
  '#1F3D2E', // dark jade
  '#5C3B1E', // warm umber
  '#2C4A5C', // slate teal
  '#3D2845', // plum
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

    default:
      return '';
  }
}

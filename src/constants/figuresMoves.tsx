import { PartialRecord } from '../utils';
import { FigureName } from './boardSettings';

type LegalFields = {
  x: [number, number];
  y: [number, number];
};

type Field = { x: number; y: number } | null;
export type NullableField = Field | null;

type Rule = {
  check: (currentField: Field) => boolean;
  moves: Array<Field>;
  eats: Array<Field>;
};

export const legalFields: PartialRecord<FigureName, LegalFields> = {
  whitePawn: { x: [0, 7], y: [1, 6] }
};

type Action = '+' | '-';

const getAllMoves = (lines: { x?: Action; y?: Action }): Field[] => {
  const getValue = (index: number) => ({
    x: getNextCell(index, lines.x),
    y: getNextCell(index, lines.y)
  });

  return new Array(7).fill('').map((_, index) => getValue(index));
};

const getNextCell = (index: number, action?: Action) => {
  switch (action) {
    case '+':
      return index + 1;

    case '-':
      return -index - 1;

    default:
      return 0;
  }
};

const leftMoves = getAllMoves({ x: '-' });
const rightMoves = getAllMoves({ x: '+' });
const topMoves = getAllMoves({ y: '-' });
const bottomMoves = getAllMoves({ y: '+' });
const topLeftMoves = getAllMoves({ x: '-', y: '-' });
const topRightMoves = getAllMoves({ x: '+', y: '-' });
const bottomLeftMoves = getAllMoves({ x: '-', y: '+' });
const bottomRightMoves = getAllMoves({ x: '+', y: '+' });

export const legalMoves: PartialRecord<FigureName, Rule[]> = {
  whitePawn: [
    // 2 steps from first line
    {
      check: (currentField) => currentField?.y === 6,
      moves: topMoves.slice(1, 2),
      eats: []
    },

    // 1 step from any line
    {
      check: () => true,
      moves: topMoves.slice(0, 1),
      eats: [...topLeftMoves.slice(0, 1), ...topRightMoves.slice(0, 1)]
    }
  ]
};
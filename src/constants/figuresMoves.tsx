import { PartialRecord } from '../utils';
import { FigureName } from './boardSettings';

type LegalFields = {
  x: [number, number];
  y: [number, number];
};

export type Field = { x: number; y: number };
export type NullableField = Field | null;

type Rule = {
  check: (currentField: Field) => boolean;
  moves: Array<Field>;
  eats: Array<Field>;
  promotion?: FigureName;
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
const topLeftMoves = getAllMoves({ x: '-', y: '-' });
const bottomMoves = getAllMoves({ y: '+' });
const topRightMoves = getAllMoves({ x: '+', y: '-' });
const bottomLeftMoves = getAllMoves({ x: '-', y: '+' });
const bottomRightMoves = getAllMoves({ x: '+', y: '+' });
// const horseMoves = getAllMoves(); // TODO

export const legalMoves: PartialRecord<FigureName, Rule[]> = {
  whitePawn: [
    // two steps forward from first line
    {
      check: (currentField) => currentField?.y === 6,
      moves: topMoves.slice(1, 2),
      eats: []
    },

    // one step forward from any line
    {
      check: () => true,
      moves: topMoves.slice(0, 1),
      eats: [...topLeftMoves.slice(0, 1), ...topRightMoves.slice(0, 1)]
    },

    // pawn promotion
    {
      check: (currentField) => currentField?.y === 0,
      moves: [],
      eats: [],
      promotion: 'whiteQueen'
    }
  ],
  whiteQueen: [
    {
      check: () => true,
      moves: [
        ...topMoves,
        ...bottomMoves,
        ...leftMoves,
        ...rightMoves,
        ...topLeftMoves,
        ...topRightMoves,
        ...bottomLeftMoves,
        ...bottomRightMoves
      ],
      eats: [
        ...topMoves,
        ...bottomMoves,
        ...leftMoves,
        ...rightMoves,
        ...topLeftMoves,
        ...topRightMoves,
        ...bottomLeftMoves,
        ...bottomRightMoves
      ]
    }
  ]
};

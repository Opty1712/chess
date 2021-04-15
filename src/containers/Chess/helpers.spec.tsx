import cloneDeep from 'lodash.clonedeep';
import { emptyBoard, legalFields } from '../../constants';
import { checkIsFieldOccupied, getAllMoves, getRandomField } from './helpers';

describe(nameof(checkIsFieldOccupied), () => {
  const board = cloneDeep(emptyBoard);
  board[0][0] = 'blackPawn';

  it('Returns «false» on free fields', () => {
    expect(checkIsFieldOccupied({ x: 1, y: 0 }, board)).toBe(false);
  });

  it('Returns «true» on occupied fields', () => {
    expect(checkIsFieldOccupied({ x: 0, y: 0 }, board)).toBe(true);
  });
});

describe(nameof(getRandomField), () => {
  it('Returns «null» for undefined figure', () => {
    expect(getRandomField('whiteQueen')).toBe(null);
  });

  it('Returns «{x, y}»', () => {
    const field = getRandomField('whitePawn');
    const fields = legalFields.whitePawn;

    if (field && fields) {
      const { x, y } = field;
      expect(x).toBeGreaterThanOrEqual(fields.x[0]);
      expect(x).toBeLessThanOrEqual(fields.x[1]);
      expect(y).toBeGreaterThanOrEqual(fields.y[0]);
      expect(y).toBeLessThanOrEqual(fields.y[1]);
    }
  });
});

describe(nameof(getAllMoves), () => {
  it('Returns all moves of the figure', () => {
    expect(getAllMoves({ figure: 'whitePawn', x: 1, y: 1 })).toStrictEqual([
      { x: 0, y: -1 },
      { x: -1, y: -1 },
      { x: 1, y: -1 }
    ]);

    expect(getAllMoves({ figure: 'whitePawn', x: 1, y: 6 })).toStrictEqual([
      { x: 0, y: -2 },
      { x: 0, y: -1 },
      { x: -1, y: -1 },
      { x: 1, y: -1 }
    ]);
  });
});

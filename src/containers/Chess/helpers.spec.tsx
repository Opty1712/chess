import cloneDeep from 'lodash.clonedeep';
import { emptyBoard, legalFields } from '../../constants';
import {
  checkIsFieldOccupied,
  checkPromotion,
  convertMovesToFields,
  getAllMoves,
  getAvailableFieldsGrid,
  getRandomField,
  makeFigureStep,
  removeOutOfBoardFields,
  removeUnavailableFields
} from './helpers';

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
    expect(getAllMoves({ figure: 'whitePawn', x: 1, y: 1 })).toStrictEqual({
      eats: [
        { x: -1, y: -1 },
        { x: 1, y: -1 }
      ],
      moves: [{ x: 0, y: -1 }]
    });

    expect(getAllMoves({ figure: 'whitePawn', x: 1, y: 6 })).toStrictEqual({
      eats: [
        { x: -1, y: -1 },
        { x: 1, y: -1 }
      ],
      moves: [
        { x: 0, y: -2 },
        { x: 0, y: -1 }
      ]
    });
  });
});

describe(nameof(checkPromotion), () => {
  it('Promotion is ot needed', () => {
    expect(
      checkPromotion({ figure: 'blackPawn', x: 0, y: 0 }, { x: 0, y: 0 })
    ).toBe(undefined);
  });

  it('Promotion is ot needed', () => {
    expect(
      checkPromotion({ figure: 'whitePawn', x: 0, y: 0 }, { x: 0, y: 0 })
    ).toBe('whiteQueen');
  });
});

describe(nameof(removeOutOfBoardFields), () => {
  it('Nothing to remove', () => {
    expect(removeOutOfBoardFields([])).toEqual([]);
    expect(removeOutOfBoardFields([{ x: 1, y: 2 }])).toEqual([{ x: 1, y: 2 }]);
  });

  it('Removes everything', () => {
    expect(
      removeOutOfBoardFields([
        { x: -1, y: 0 },
        { x: -1, y: 8 },
        { x: 3, y: 8 }
      ])
    ).toEqual([]);
  });
});

describe(nameof(convertMovesToFields), () => {
  it('Converting moves to fields', () => {
    expect(
      convertMovesToFields({ x: 5, y: 5, figure: 'blackPawn' }, [
        { x: 1, y: 1 },
        { x: 2, y: 2 }
      ])
    ).toEqual([
      { x: 6, y: 6 },
      { x: 7, y: 7 }
    ]);
  });
});

describe(nameof(removeUnavailableFields), () => {
  const board = cloneDeep(emptyBoard);
  board[0][0] = 'whiteQueen';

  it('All fields are available', () => {
    expect(
      removeUnavailableFields(
        [
          { x: 1, y: 1 },
          { x: 2, y: 2 }
        ],
        board,
        'move'
      )
    ).toEqual([
      { x: 1, y: 1 },
      { x: 2, y: 2 }
    ]);
  });

  it('Removing field, where is «whiteQueen»', () => {
    expect(
      removeUnavailableFields(
        [
          { x: 0, y: 0 },
          { x: 2, y: 2 }
        ],
        board,
        'move'
      )
    ).toEqual([{ x: 2, y: 2 }]);
  });

  it('Can eat «whiteQueen»', () => {
    expect(removeUnavailableFields([{ x: 0, y: 0 }], board, 'eat')).toEqual([
      { x: 0, y: 0 }
    ]);
  });
});

describe(nameof(makeFigureStep), () => {
  it('Pawn becomes queen', () => {
    const board = cloneDeep(emptyBoard);
    board[0][1] = 'whitePawn';

    const newBoard = makeFigureStep(
      board,
      { x: 0, y: 1, figure: 'whitePawn' },
      { x: 0, y: 0 }
    );

    expect(newBoard[0][0]).toBe('whiteQueen');
    expect(newBoard[0][1]).toBe(null);
  });

  it('Pawn goes up', () => {
    const board = cloneDeep(emptyBoard);
    board[0][2] = 'whitePawn';

    const newBoard = makeFigureStep(
      board,
      { x: 0, y: 2, figure: 'whitePawn' },
      { x: 0, y: 1 }
    );

    expect(newBoard[0][2]).toBe(null);
    expect(newBoard[0][1]).toBe('whitePawn');
  });
});

describe(nameof(getAvailableFieldsGrid), () => {
  it('', () => {
    const board = cloneDeep(emptyBoard);
    board[0][6] = 'whitePawn';

    const grid = getAvailableFieldsGrid(
      { x: 0, y: 6, figure: 'whitePawn' },
      board
    );

    expect(grid[0][4]).toBe('availableMove');
    expect(grid[0][5]).toBe('availableMove');
  });
});

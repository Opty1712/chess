import { render, screen } from '@testing-library/react';
import { boardTestId, ChessBoard, getRow } from './ChessBoard';
import { whiteCellClassName } from './Field';

describe(nameof(ChessBoard), () => {
  render(<ChessBoard />);

  const board = screen.getByTestId(boardTestId);

  it('A8 is white', () => {
    expect(board.children[11].classList.contains(whiteCellClassName)).toBe(
      true
    );
  });

  it('B8 is black', () => {
    expect(board.children[12].classList.contains(whiteCellClassName)).toBe(
      false
    );
  });

  it('A1 is black', () => {
    expect(board.children[81].classList.contains(whiteCellClassName)).toBe(
      false
    );
  });
  it('H1 is white', () => {
    expect(board.children[88].classList.contains(whiteCellClassName)).toBe(
      true
    );
  });
});

describe(nameof(getRow), () => {
  it('returns 8 cells', () => {
    expect(getRow().length).toBe(8);
  });

  it('first cells are white and black ', () => {
    const row = getRow();
    const firstCell = row[0];
    const secondCell = row[1];

    expect(firstCell.props.isWhite).toBe(true);
    expect(secondCell.props.isWhite).toBe(false);
  });

  it('first cells are black and white', () => {
    const row = getRow(false);
    const firstCell = row[0];
    const secondCell = row[1];

    expect(firstCell.props.isWhite).toBe(false);
    expect(secondCell.props.isWhite).toBe(true);
  });
});

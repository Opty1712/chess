import { render, screen } from '@testing-library/react';
import { boardTestIds, ChessBoard, getRow } from './ChessBoard';
import { whiteCellClassName } from './Field';

describe(nameof(ChessBoard), () => {
  render(<ChessBoard />);

  const rows = screen.getAllByTestId(boardTestIds.row);

  it('A8 is white', () => {
    expect(rows[0].children[1].classList.contains(whiteCellClassName)).toBe(
      true
    );
  });

  it('A1 is black', () => {
    expect(rows[7].children[1].classList.contains(whiteCellClassName)).toBe(
      false
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

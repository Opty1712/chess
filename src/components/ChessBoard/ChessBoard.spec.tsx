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

  it('returns white cell first', () => {
    const firstCell = getRow()[0];
    expect(firstCell.props.isWhite).toBe(true);
  });

  it('returns black cell first', () => {
    const firstCell = getRow(false)[0];
    expect(firstCell.props.isWhite).toBe(false);
  });
});

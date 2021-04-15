import { render, screen } from '@testing-library/react';
import { cellSize, FigureName } from '../../constants';
import { Chess } from './Chess';

describe(nameof(Chess), () => {
  it('Only one black pawn on «C7» when initializing board', () => {
    render(<Chess />);

    const testId: FigureName = 'blackPawn';
    const blackPawn = screen.getByTestId(testId);

    expect(blackPawn.style.left).toBe(cellSize * 2 + 'px');
    expect(blackPawn.style.top).toBe(cellSize * 1 + 'px');
  });

  xit('Resetting board', () => {
    // TODO
  });

  xit('Adding a white pawn at random legal position', () => {
    // TODO
  });
});

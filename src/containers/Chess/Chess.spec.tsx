import { render, screen } from '@testing-library/react';
import { FigureName } from '../../constants';
import { Chess } from './Chess';
import { chessFiguresTestId } from './ChessFigures';

describe(nameof(Chess), () => {
  it('Only one black pawn on «C7» when initializing board', () => {
    render(<Chess />);

    const testId: FigureName = 'blackPawn';
    const blackPawns = screen.getAllByTestId(testId);
    expect(blackPawns.length).toBe(1);

    const board = screen.getByTestId(chessFiguresTestId);
    expect(board.children[17].children.length).toBe(1);
  });
});

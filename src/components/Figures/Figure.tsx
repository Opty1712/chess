import { memo } from 'react';
import { cellSize } from '../../constants';
import { FigureRoot } from './FigureRoot';
import { BlackPawn, WhitePawn, WhiteQueen } from './Figures';

const figureComponents = {
  blackPawn: BlackPawn,
  whitePawn: WhitePawn,
  whiteQueen: WhiteQueen
};

type FigureShiftOnChessBoard = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7;

type FigureProps = {
  left: FigureShiftOnChessBoard;
  top: FigureShiftOnChessBoard;
  figure: keyof typeof figureComponents;
};

export const Figure = memo<FigureProps>(({ left, top, figure }) => {
  const FigureComponent = figureComponents[figure];

  return (
    <FigureRoot
      style={{ left: `${left * cellSize}px`, top: `${top * cellSize}px` }}
    >
      <FigureComponent />
    </FigureRoot>
  );
});
Figure.displayName = nameof(Figure);

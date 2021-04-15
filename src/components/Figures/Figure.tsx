import React, { ComponentType, memo } from 'react';
import { cellSize, FigureName } from '../../constants';
import { FigureRoot } from './FigureRoot';
import { BlackPawn, WhitePawn, WhiteQueen } from './Figures';

const figureComponents: Record<FigureName, ComponentType> = {
  blackPawn: BlackPawn,
  whitePawn: WhitePawn,
  whiteQueen: WhiteQueen
};

type FigureProps = {
  left: number;
  top: number;
  figure: FigureName;
};

export const Figure = memo<FigureProps>(({ left, top, figure }) => {
  const FigureComponent = figureComponents[figure];

  return (
    <FigureRoot
      style={{ left: `${left * cellSize}px`, top: `${top * cellSize}px` }}
      data-testid={figure}
    >
      <FigureComponent />
    </FigureRoot>
  );
});
Figure.displayName = nameof(Figure);

import React, { ComponentType, memo, useCallback } from 'react';
import { cellSize, FigureName } from '../../constants';
import { FigureRoot } from './FigureRoot';
import { BlackPawn, WhitePawn, WhiteQueen } from './Figures';

const figureComponents: Record<FigureName, ComponentType> = {
  blackPawn: BlackPawn,
  whitePawn: WhitePawn,
  whiteQueen: WhiteQueen
};

export type FigureInfo = { figure: FigureName; x: number; y: number };
type FigureProps = {
  x: number;
  y: number;
  figure: FigureName;
  onClick: (figureInfo: FigureInfo) => void;
};

export const Figure = memo<FigureProps>(({ x, y, figure, onClick }) => {
  const FigureComponent = figureComponents[figure];

  const handleClick = useCallback(() => {
    onClick({ figure, x, y });
  }, [figure, onClick, x, y]);

  return (
    <FigureRoot
      style={{ left: `${x * cellSize}px`, top: `${y * cellSize}px` }}
      data-testid={figure}
      onClick={handleClick}
    >
      <FigureComponent />
    </FigureRoot>
  );
});
Figure.displayName = nameof(Figure);

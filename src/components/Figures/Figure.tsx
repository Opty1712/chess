import React, { ComponentType, memo, useCallback } from 'react';
import { Field, FigureName } from '../../constants';
import { FigureRoot } from './FigureRoot';
import { AvailableMove, BlackPawn, WhitePawn, WhiteQueen } from './Figures';

const figureComponents: Record<FigureName, ComponentType> = {
  blackPawn: BlackPawn,
  whitePawn: WhitePawn,
  whiteQueen: WhiteQueen,
  availableMove: AvailableMove
};

export type FigureInfo = Field & {
  figure: FigureName;
};
type FigureProps = FigureInfo & {
  onClick: (figureInfo: FigureInfo) => void;
};

export const Figure = memo<FigureProps>(({ x, y, figure, onClick }) => {
  const FigureComponent = figureComponents[figure];

  const handleClick = useCallback(() => {
    onClick({ figure, x, y });
  }, [figure, onClick, x, y]);

  return (
    <FigureRoot data-testid={figure} onClick={handleClick}>
      <FigureComponent />
    </FigureRoot>
  );
});
Figure.displayName = nameof(Figure);

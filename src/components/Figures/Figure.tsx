import React, { ComponentType, memo, useCallback } from 'react';
import { cellSize, Field, FigureName, legalMoves } from '../../constants';
import { FigureRoot } from './FigureRoot';
import { BlackPawn, WhitePawn, WhiteQueen } from './Figures';

const figureComponents: Record<FigureName, ComponentType> = {
  blackPawn: BlackPawn,
  whitePawn: WhitePawn,
  whiteQueen: WhiteQueen
};

type FigureProps = {
  x: number;
  y: number;
  figure: FigureName;
};

export const Figure = memo<FigureProps>(({ x, y, figure }) => {
  const FigureComponent = figureComponents[figure];

  const showAvailableMoves = useCallback(() => {
    const rules = legalMoves[figure];
    if (rules) {
      const availableFields = rules.reduce<Field[]>((accumulator, current) => {
        if (current.check({ x, y })) {
          accumulator.push(...current.moves, ...current.eats);
        }

        return accumulator;
      }, []);
    }
  }, [figure, x, y]);

  return (
    <FigureRoot
      style={{ left: `${x * cellSize}px`, top: `${y * cellSize}px` }}
      data-testid={figure}
      onClick={showAvailableMoves}
    >
      <FigureComponent />
    </FigureRoot>
  );
});
Figure.displayName = nameof(Figure);

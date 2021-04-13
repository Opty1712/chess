import { memo } from 'react';
import { FigureRoot } from './FigureRoot';
import { BlackPawn, WhitePawn, WhiteQueen } from './Figures';

const figureComponents = {
  blackPawn: BlackPawn,
  whitePawn: WhitePawn,
  whiteQueen: WhiteQueen
};

type FigureProps = {
  left: string;
  top: string;
  figure: keyof typeof figureComponents;
};

export const Figure = memo<FigureProps>(({ left, top, figure }) => {
  const FigureComponent = figureComponents[figure];

  return (
    <FigureRoot style={{ left, top }}>
      <FigureComponent />
    </FigureRoot>
  );
});
Figure.displayName = nameof(Figure);

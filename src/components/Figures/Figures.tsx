import { styled } from 'linaria/react';
import { cellSize } from '../../constants';

const DefaultFigure = styled.div`
  background: url(../../images/figures.svg) no-repeat;
  width: ${cellSize * 0.8}px;
  height: ${cellSize * 0.8}px;
  background-size: ${cellSize * 8}px;
`;

const ratio = cellSize / 100;

export const WhitePawn = styled(DefaultFigure)`
  background-position: ${ratio * -734}px ${ratio * -219}px;
`;

export const BlackPawn = styled(DefaultFigure)`
  background-position: ${ratio * -734}px ${ratio * -94}px;
`;

export const WhiteQueen = styled(DefaultFigure)`
  background-position: ${ratio * -142}px ${ratio * -219}px;
`;

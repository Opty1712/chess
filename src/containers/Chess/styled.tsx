import { styled } from 'linaria/react';
import { cellSize } from '../../constants';

export const ChessGrid = styled.div`
  margin: ${cellSize}px;
  position: absolute;
  display: grid;
  grid-template-rows: repeat(8, ${cellSize}px);
  grid-auto-flow: column;
`;

export const Cell = styled.div`
  height: ${cellSize}px;
  width: ${cellSize}px;
`;

import { styled } from 'linaria/react';
import { cellSize } from '../../constants';

export const ChessGrid = styled.div`
  margin: ${cellSize}px;
  position: absolute;
  top: 0;
  left: 0;
  display: grid;
  grid-template-rows: repeat(8, ${cellSize}px);
  grid-auto-flow: column;
`;

export const Cell = styled.div`
  height: ${cellSize}px;
  width: ${cellSize}px;
`;

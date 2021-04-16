import { styled } from 'linaria/react';
import { cellSize } from '../../constants';

export const ChessGrid = styled.div`
  margin: ${cellSize}px;
  position: absolute;
  top: 1px;
  left: 1px;
  display: grid;
  grid-template-rows: repeat(8, ${cellSize}px);
  grid-auto-flow: column;
`;

export const EmptyCell = styled.div`
  height: ${cellSize}px;
  width: ${cellSize}px;
`;

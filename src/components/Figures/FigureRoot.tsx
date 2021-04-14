import { styled } from 'linaria/react';
import { cellSize } from '../../constants';

export const FigureRoot = styled.div`
  position: absolute;
  width: ${cellSize}px;
  height: ${cellSize}px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: left 0.3s, top 0.3s;
`;

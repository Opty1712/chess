import { styled } from 'linaria/react';
import { cellSize, colors } from '../constants';

export const Button = styled.button`
  color: ${colors.lightMinor};
  background-color: ${colors.darkMinor};
  font-size: ${cellSize * 0.3}px;
  border: 0;
  border-radius: 5px;
  padding: 10px 20px;
  cursor: pointer;
  outline: none;
  margin: 20px;

  &:focus {
    box-shadow: 0 0 3px 4px ${colors.darkMain};
  }

  &:hover {
    color: ${colors.lightMain};
  }
`;

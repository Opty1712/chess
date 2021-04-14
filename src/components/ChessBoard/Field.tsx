import { css, cx } from 'linaria';
import { styled } from 'linaria/react';
import { memo } from 'react';
import { cellSize, colors } from '../../constants';

type Field = {
  isWhite: boolean;
};
export const Field = memo<Field>(({ isWhite }) => {
  return <BlackCell className={cx(isWhite && whiteCellClassName)} />;
});
Field.displayName = nameof(Field);

const BlackCell = styled.div`
  height: ${cellSize}px;
  width: ${cellSize}px;
  background-color: ${colors.darkMain};
`;

const whiteCellClassName = css`
  background-color: ${colors.lightMinor};
`;

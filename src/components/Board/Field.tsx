import { css, cx } from 'linaria';
import { styled } from 'linaria/react';
import { memo } from 'react';
import { colors } from '../../constants';

type Field = {
  isWhite: boolean;
};
export const Field = memo<Field>(({ isWhite }) => {
  return <BlackCell className={cx(isWhite && whiteCellClassName)} />;
});
Field.displayName = nameof(Field);

const BlackCell = styled.div`
  height: 100px;
  width: 100px;
  background-color: ${colors.darkMain};
`;

const whiteCellClassName = css`
  background-color: ${colors.lightMain};
`;

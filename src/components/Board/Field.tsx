import { css, cx } from 'linaria';
import { styled } from 'linaria/react';
import { memo } from 'react';

type Field = {
  isWhite: boolean;
};
export const Field = memo<Field>(({ isWhite }) => {
  return <BlackCell className={cx(isWhite && whiteCellClassName)} />;
});

const BlackCell = styled.div`
  height: 100px;
  width: 100px;
  background-color: #8a7601;
`;

const whiteCellClassName = css`
  background-color: #fff;
`;

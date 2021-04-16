import { styled } from 'linaria/react';
import { Fragment, memo } from 'react';
import {
  cellSize,
  colors,
  columnHeadingList,
  rowHeadingList
} from '../../constants';
import { Field } from './Field';

export const ChessBoard = memo(() => (
  <BoardWithLineHeadings>
    {rowHeadingList.map((item, index) => {
      const rowName = rowHeadingList.length - Number(item) + 1;

      return (
        <Fragment key={rowName}>
          <LineName>{rowName}</LineName>
          {getRow(index % 2 === 0)}
          <LineName>{rowName}</LineName>
        </Fragment>
      );
    })}
  </BoardWithLineHeadings>
));
ChessBoard.displayName = nameof(ChessBoard);

const AlphabeticalLine = memo(() => (
  <>
    <LineName />
    {columnHeadingList.map((item) => (
      <LineName key={item}>{item}</LineName>
    ))}
    <LineName />
  </>
));
AlphabeticalLine.displayName = nameof(AlphabeticalLine);

const BoardWithLineHeadings = memo(({ children }) => {
  return (
    <BoardStyled data-testid={boardTestId}>
      <AlphabeticalLine />
      {children}
      <AlphabeticalLine />
    </BoardStyled>
  );
});
BoardWithLineHeadings.displayName = nameof(BoardWithLineHeadings);

const rowStartingWithWhite = new Array(8)
  .fill('')
  .map((_item, index) => <Field isWhite={index % 2 === 0} key={index} />);

export const getRow = (isWhiteCellFirst = true) => {
  if (isWhiteCellFirst) {
    return [...rowStartingWithWhite];
  }

  const [firstCell, ...restCellS] = rowStartingWithWhite;

  return [...restCellS, firstCell];
};

export const boardTestId = 'board';

const LineName = styled.div`
  height: ${cellSize}px;
  font-size: ${cellSize * 0.4}px;
  box-sizing: border-box;
  padding: ${cellSize * 0.25}px 0 0 ${cellSize * 0.4}px;
  color: ${colors.lightMinor};
  background-color: ${colors.darkMinor};
  text-transform: uppercase;
  user-select: none;
`;

const BoardStyled = styled.div`
  border: 1px solid ${colors.light};
  display: grid;
  grid-template-columns: repeat(10, ${cellSize}px);
`;

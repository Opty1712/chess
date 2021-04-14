import { styled } from 'linaria/react';
import { memo } from 'react';
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
        <Row key={rowName}>
          <LineName>{rowName}</LineName>
          {getRow(index % 2 > 0)}
          <LineName>{rowName}</LineName>
        </Row>
      );
    })}
  </BoardWithLineHeadings>
));
ChessBoard.displayName = nameof(ChessBoard);

const AlphabeticalLine = memo(() => (
  <Row>
    <LineName />
    {columnHeadingList.map((item) => (
      <LineName key={item}>{item}</LineName>
    ))}
    <LineName />
  </Row>
));
AlphabeticalLine.displayName = nameof(AlphabeticalLine);

const BoardWithLineHeadings = memo(({ children }) => {
  return (
    <BoardStyled>
      <AlphabeticalLine />
      {children}
      <AlphabeticalLine />
    </BoardStyled>
  );
});
BoardWithLineHeadings.displayName = nameof(BoardWithLineHeadings);

const nineCellsRowStartingWithWhite = new Array(9)
  .fill('')
  .map((_item, index) => <Field isWhite={index % 2 === 0} key={index} />);

const getRow = (isWhiteCellFirst = true) => {
  return nineCellsRowStartingWithWhite.slice(
    isWhiteCellFirst ? 1 : 0,
    isWhiteCellFirst ? 9 : 8
  );
};

const Row = styled.div`
  display: flex;
`;

const LineName = styled.div`
  width: ${cellSize}px;
  height: ${cellSize}px;
  font-size: ${cellSize * 0.4}px;
  box-sizing: border-box;
  padding: ${cellSize * 0.25}px 0 0 ${cellSize * 0.4}px;
  color: ${colors.lightMinor};
  background-color: ${colors.darkMinor};
  text-transform: uppercase;
`;

const BoardStyled = styled.div`
  border: 1px solid ${colors.lightMain};
  display: inline-block;
`;

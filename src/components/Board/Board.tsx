import { styled } from 'linaria/react';
import { memo } from 'react';
import { colors } from '../../constants';
import { Field } from './Field';

export const Board = memo(() => (
  <BoardWithLineHeadings>
    {rowHeadingArray.map((item, index) => {
      const rowName = rowHeadingArray.length - Number(item) + 1;

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
Board.displayName = nameof(Board);

const AlphabeticalLine = memo(() => (
  <Row>
    <LineName />
    {columnHeadingArray.map((item) => (
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

const rowHeadings = '12345678';
const rowHeadingArray = rowHeadings.split('');
const columnHeadings = 'abcdefgh';
const columnHeadingArray = columnHeadings.split('');

type RowData = Record<string, string | null>;

const rowData: RowData = columnHeadingArray.reduce<RowData>(
  (accumulator, current) => {
    accumulator[current] = null;

    return accumulator;
  },
  {}
);

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
  width: 100px;
  height: 100px;
  font-size: 40px;
  box-sizing: border-box;
  padding: 25px 0 0 40px;
  color: ${colors.lightMinor};
  background-color: ${colors.darkMinor};
  text-transform: uppercase;
`;

const BoardStyled = styled.div`
  border: 1px solid ${colors.lightMain};
  display: inline-block;
  margin: 20px;
`;

type BoardCells = Record<string, RowData>;

const boardCells: BoardCells = rowHeadingArray.reduce<BoardCells>(
  (accumulator, current) => {
    accumulator[current] = { ...rowData };

    return accumulator;
  },
  {}
);

console.log(boardCells);

import { styled } from 'linaria/react';
import { memo, useCallback } from 'react';
import { colors } from '../../constants';
import { Field } from './Field';

export const Board = memo(() => {
  const getHorizontalLineView = useCallback((isWhiteCellFirst = true) => {
    return horizontalLineSymbolsArray.map((item, index) => {
      const isWhite = Boolean(
        Number(isWhiteCellFirst) - Number(index % 2 === 0)
      );

      return <Field isWhite={isWhite} key={item} />;
    });
  }, []);

  const m = verticalLineSymbolsArray.map((item, index) => {
    const name = verticalLineSymbolsArray.length - Number(item) + 1;
    return (
      <Row key={name}>
        <LineName>{name}</LineName>
        {getHorizontalLineView(index % 2 > 0)}
        <LineName>{name}</LineName>
      </Row>
    );
  });

  const alphabeticalLine = horizontalLineSymbolsArray.map((item) => (
    <LineName key={item}>{item}</LineName>
  ));

  return (
    <BoardWithSymbols>
      <Row>
        <LineName />
        {alphabeticalLine}
        <LineName />
      </Row>
      {m}
      <Row>
        <LineName />
        {alphabeticalLine}
        <LineName />
      </Row>
    </BoardWithSymbols>
  );
});
Board.displayName = nameof(Board);

const verticalLineSymbols = '12345678';
const verticalLineSymbolsArray = verticalLineSymbols.split('');

const horizontalLineSymbols = 'abcdefgh';
const horizontalLineSymbolsArray = horizontalLineSymbols.split('');

type HorizontalLine = Record<string, string | null>;

const horizontalLine: HorizontalLine = horizontalLineSymbolsArray.reduce<HorizontalLine>(
  (accumulator, current) => {
    accumulator[current] = null;

    return accumulator;
  },
  {}
);

type BoardCells = Record<string, HorizontalLine>;

const boardCells: BoardCells = verticalLineSymbolsArray.reduce<string>(
  (accumulator, current) => {
    accumulator[current] = { ...horizontalLine };

    return accumulator;
  },
  {}
);

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

const BoardView = styled.div`
  border: 1px solid ${colors.lightMain};
  display: inline-block;
  margin: 20px;
`;

const BoardWithSymbols = memo(({ children }) => {
  return <BoardView>{children}</BoardView>;
});
BoardWithSymbols.displayName = nameof(BoardWithSymbols);

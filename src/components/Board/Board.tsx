import { styled } from 'linaria/react';
import { memo, useCallback } from 'react';
import { Field } from './Field';

export const Board = memo(() => {
  const getHorizontalLineView = useCallback((isWhiteCellFirst = true) => {
    console.log(isWhiteCellFirst);
    let isWhite = isWhiteCellFirst;
    return horizontalLineSymbolsArray.map((item) => {
      isWhite = !isWhite;
      return <Field isWhite={isWhite} key={item} />;
    });
  }, []);

  const m = verticalLineSymbolsArray.map((item, index) => {
    return <Row key={item}>{getHorizontalLineView(index % 2 === 0)}</Row>;
  });

  return <>{m}</>;
});
Board.displayName = nameof(Board);

const verticalLineSymbols = 'abcdefgh';
const verticalLineSymbolsArray = verticalLineSymbols.split('');

const horizontalLineSymbols = '12345678';
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

const boardCells: BoardCells = verticalLineSymbolsArray.reduce<BoardCells>(
  (accumulator, current) => {
    accumulator[current] = { ...horizontalLine };

    return accumulator;
  },
  {}
);

const Row = styled.div`
  display: flex;
`;

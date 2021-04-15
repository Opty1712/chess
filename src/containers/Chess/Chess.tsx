import { styled } from 'linaria/react';
import { memo, useCallback, useEffect, useState } from 'react';
import { ChessBoard, Figure, FigureInfo } from '../../components';
import { BoardState, cellSize, emptyBoard } from '../../constants';
import { useSwitcher } from '../../utils';
import { AddPawnButton } from './AddPawnButton';
import { addWhitePawn, getAllMoves, getInitialBoard } from './helpers';
import { ResetButton } from './ResetButton';

export const Chess = memo(() => {
  const {
    isSwitchedOn: isInitialState,
    switchOff: setIsInitialStateOff,
    switchOn: setIsInitialStateOn
  } = useSwitcher(true);

  const [boardState, setBoardState] = useState<BoardState>(emptyBoard);

  const resetBoardState = useCallback(() => {
    setIsInitialStateOn();
    setBoardState(getInitialBoard());
  }, [setIsInitialStateOn]);

  const addFigure = useCallback(() => {
    setIsInitialStateOff();
    setBoardState((value) => addWhitePawn(value));
  }, [setIsInitialStateOff]);

  useEffect(() => {
    isInitialState && resetBoardState();
  }, [isInitialState, resetBoardState]);

  const handleFigureClick = useCallback((figureInfo: FigureInfo) => {
    const allMoves = getAllMoves(figureInfo);
  }, []);

  return (
    <>
      <Root>
        <ChessBoard />

        <ChessFigures>
          {boardState.map((itemRow, indexRow) =>
            itemRow.map((itemCell, indexCell) =>
              itemCell ? (
                <Figure
                  x={indexRow}
                  y={indexCell}
                  figure={itemCell}
                  key={indexRow + indexCell}
                  onClick={handleFigureClick}
                />
              ) : null
            )
          )}
        </ChessFigures>
      </Root>

      {isInitialState ? (
        <AddPawnButton onAdd={addFigure} />
      ) : (
        <ResetButton onReset={resetBoardState} />
      )}
    </>
  );
});
Chess.displayName = nameof(Chess);

const Root = styled.div`
  position: relative;
`;

const ChessFigures = styled.div`
  margin: ${cellSize}px;
  position: absolute;
  width: ${cellSize * 8}px;
  height: ${cellSize * 8}px;
  top: 0;
  left: 0;
`;

import { styled } from 'linaria/react';
import cloneDeep from 'lodash.clonedeep';
import { memo, useCallback, useEffect, useState } from 'react';
import { ChessBoard, Figure } from '../../components';
import { BoardState, cellSize, emptyBoard } from '../../constants';
import { useSwitcher } from '../../utils';
import { AddPawnButton } from './AddPawnButton';
import { getLegalRandomPosition } from './helpers';
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

    const clonedState = cloneDeep(emptyBoard);
    clonedState[2][1] = 'blackPawn';
    setBoardState(clonedState);
  }, [setIsInitialStateOn]);

  const addFigure = useCallback(() => {
    setIsInitialStateOff();

    setBoardState((value) => {
      const clonedState = cloneDeep(value);
      const field = getLegalRandomPosition('whitePawn', clonedState);
      if (field) {
        clonedState[field.x][field.y] = 'whitePawn';
      }

      return clonedState;
    });
  }, [setIsInitialStateOff]);

  useEffect(() => {
    isInitialState && resetBoardState();
  }, [isInitialState, resetBoardState]);

  return (
    <>
      <Root>
        <ChessBoard />

        <ChessFigures>
          {boardState.map((itemRow, indexRow) =>
            itemRow.map((itemCell, indexCell) =>
              itemCell ? (
                <Figure
                  left={indexRow}
                  top={indexCell}
                  figure={itemCell}
                  key={indexRow + indexCell}
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

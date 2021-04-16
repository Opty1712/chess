import { styled } from 'linaria/react';
import { memo, useCallback, useEffect, useState } from 'react';
import { ChessBoard, FigureInfo } from '../../components';
import { BoardState, emptyBoard } from '../../constants';
import { useSwitcher } from '../../utils';
import { AddPawnButton } from './AddPawnButton';
import { AvailableMoves } from './AvailableMoves';
import { ChessFigures } from './ChessFigures';
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
    console.warn(allMoves);
  }, []);

  return (
    <>
      <Root>
        <ChessBoard />
        <ChessFigures onClick={handleFigureClick} boardState={boardState} />
        <AvailableMoves onClick={handleFigureClick} boardMoves={[]} />
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

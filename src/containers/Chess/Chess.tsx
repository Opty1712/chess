import { styled } from 'linaria/react';
import { memo, useCallback, useEffect, useMemo, useState } from 'react';
import { ChessBoard, FigureInfo } from '../../components';
import { BoardState, emptyBoard, Field } from '../../constants';
import { useSwitcher } from '../../utils';
import { AddPawnButton } from './AddPawnButton';
import { AvailableMoves } from './AvailableMoves';
import { ChessFigures } from './ChessFigures';
import {
  addWhitePawn,
  getAvailableFieldsGrid,
  getInitialBoard,
  makeFigureStep
} from './helpers';
import { ResetButton } from './ResetButton';

export const Chess = memo(() => {
  const {
    isSwitchedOn: isInitialState,
    switchOff: setIsInitialStateOff,
    switchOn: setIsInitialStateOn
  } = useSwitcher(true);

  const [boardState, setBoardState] = useState<BoardState>(emptyBoard);
  const [figureInfo, setFigureInfo] = useState<FigureInfo>();
  const [isAvailableMovesVisible, setIsAvailableMovesVisible] = useState(false);

  const resetBoardState = useCallback(() => {
    setIsInitialStateOn();
    setIsAvailableMovesVisible(false);
    setBoardState(getInitialBoard());
  }, [setIsInitialStateOn]);

  const addFigure = useCallback(() => {
    setIsInitialStateOff();
    setBoardState((value) => addWhitePawn(value));
  }, [setIsInitialStateOff]);

  useEffect(() => {
    isInitialState && resetBoardState();
  }, [isInitialState, resetBoardState]);

  const boardMoves = useMemo(
    () => (figureInfo ? getAvailableFieldsGrid(figureInfo, boardState) : []),
    [boardState, figureInfo]
  );

  const handleFigureClick = useCallback((figure: FigureInfo) => {
    setFigureInfo(figure);
    setIsAvailableMovesVisible(true);
  }, []);

  const handleAvailableFieldClick = useCallback(
    (field: Field) => {
      setIsAvailableMovesVisible(false);
      const isMakingStep = Boolean(boardMoves[field.x][field.y]);

      if (isMakingStep && figureInfo) {
        setBoardState((value) => makeFigureStep(value, figureInfo, field));
      }
    },
    [boardMoves, figureInfo]
  );

  return (
    <>
      <Root>
        <ChessBoard />
        <ChessFigures onClick={handleFigureClick} boardState={boardState} />
        {isAvailableMovesVisible && (
          <AvailableMoves
            onClick={handleAvailableFieldClick}
            boardMoves={boardMoves}
          />
        )}
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

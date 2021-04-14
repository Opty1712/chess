import { styled } from 'linaria/react';
import { memo } from 'react';
import { ChessBoard, Figure } from '../../components';
import { cellSize } from '../../constants';
import { useSwitcher } from '../../utils';
import { AddPawnButton } from './AddPawnButton';
import { ResetButton } from './ResetButton';

export const Chess = memo(() => {
  const {
    isSwitchedOn: isInitialBoard,
    toggleSwitcher: toggleIsInitialBoard
  } = useSwitcher();

  return (
    <>
      <FiguresRoot>
        <ChessBoard />
        {isInitialBoard ? (
          <Figure left={3} top={2} figure="blackPawn" />
        ) : (
          <>
            <Figure left={1} top={1} figure="whitePawn" />
            <Figure left={2} top={1} figure="whiteQueen" />
          </>
        )}
      </FiguresRoot>

      {isInitialBoard ? (
        <ResetButton onReset={toggleIsInitialBoard} />
      ) : (
        <AddPawnButton onAdd={toggleIsInitialBoard} />
      )}
    </>
  );
});
Chess.displayName = nameof(Chess);

const FiguresRoot = styled.div`
  width: ${cellSize * 10}px;
  height: ${cellSize * 10}px;
  position: relative;
`;

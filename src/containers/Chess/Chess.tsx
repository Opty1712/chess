import { styled } from 'linaria/react';
import { memo } from 'react';
import { ChessBoard, Figure } from '../../components';
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
          <Figure left="300px" top="200px" figure="blackPawn" />
        ) : (
          <>
            <Figure left="100px" top="100px" figure="whitePawn" />
            <Figure left="200px" top="100px" figure="whiteQueen" />
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
  border: 1px solid red;
  width: 1000px;
  height: 1000px;
  position: relative;
`;

import { memo } from 'react';
import { Board } from '../../components';
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
      <Board />
      {isInitialBoard ? (
        <ResetButton onReset={toggleIsInitialBoard} />
      ) : (
        <AddPawnButton onAdd={toggleIsInitialBoard} />
      )}
    </>
  );
});
Chess.displayName = nameof(Chess);

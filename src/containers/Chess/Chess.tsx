import { memo, useState } from 'react';
import { Board } from '../../components';
import { AddPawnButton } from './AddPawnButton';
import { ResetButton } from './ResetButton';

export const Chess = memo(() => {
  const [isInitialBoard, setIsInitialBoard] = useState(true);

  return (
    <>
      <Board />
      {isInitialBoard ? (
        <ResetButton onReset={() => setIsInitialBoard(false)} />
      ) : (
        <AddPawnButton onAdd={() => setIsInitialBoard(true)} />
      )}
    </>
  );
});
Chess.displayName = nameof(Chess);

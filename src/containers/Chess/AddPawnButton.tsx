import React, { memo, useCallback, useEffect } from 'react';
import { Button } from '../../components';

export const AddPawnButton = memo<{
  onAdd: () => void;
}>(({ onAdd }) => {
  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (event.key.toLowerCase() === 'a') {
        onAdd();
      }
    },
    [onAdd]
  );

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);

    return () => document.removeEventListener('keydown', handleKeyDown);
  });

  return (
    <Button
      aria-label="Add a pawn"
      title="You can press «A» instead"
      onClick={onAdd}
      data-testid={addPawnButtonTestId}
    >
      Add a pawn
    </Button>
  );
});
AddPawnButton.displayName = nameof(AddPawnButton);

export const addPawnButtonTestId = 'addPawnButtonTestId';

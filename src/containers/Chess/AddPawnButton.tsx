import React, { memo, useCallback, useEffect } from 'react';
import { Button } from '../../components';

export const AddPawnButton = memo<{
  onAdd: () => void;
}>(({ onAdd }) => {
  const handleKeyPress: EventListener = useCallback(
    (event) => {
      if (event instanceof KeyboardEvent && event.key === 'a') {
        onAdd();
      }
    },
    [onAdd]
  );

  useEffect(() => {
    document.addEventListener('keydown', handleKeyPress);

    return () => document.removeEventListener('keypress', handleKeyPress);
  });

  return (
    <Button
      aria-label="Add a pawn"
      title="You can press «A» instead"
      onClick={onAdd}
    >
      Add a pawn
    </Button>
  );
});
AddPawnButton.displayName = nameof(AddPawnButton);

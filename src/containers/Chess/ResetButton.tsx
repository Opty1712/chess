import React, { memo, useCallback, useEffect } from 'react';
import { Button } from '../../components';

export const ResetButton = memo<{
  onReset: () => void;
}>(({ onReset }) => {
  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (event.key.toLowerCase() === 'r') {
        onReset();
      }
    },
    [onReset]
  );

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);

    return () => document.removeEventListener('keydown', handleKeyDown);
  });

  return (
    <Button
      aria-label="Reset board"
      title="You can press «R» instead"
      onClick={onReset}
      data-testid={resetButtonTestId}
    >
      Reset board
    </Button>
  );
});
ResetButton.displayName = nameof(ResetButton);

export const resetButtonTestId = 'resetButtonTestId';

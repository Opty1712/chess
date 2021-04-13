import React, { memo, useCallback, useEffect } from 'react';
import { Button } from '../../components';

export const ResetButton = memo<{
  onReset: () => void;
}>(({ onReset }) => {
  const handleKeyPress: EventListener = useCallback(
    (event) => {
      if (event instanceof KeyboardEvent && event.key === 'r') {
        onReset();
      }
    },
    [onReset]
  );

  useEffect(() => {
    document.addEventListener('keydown', handleKeyPress);

    return () => document.removeEventListener('keypress', handleKeyPress);
  });

  return (
    <Button
      aria-label="Reset board"
      title="You can press «R» instead"
      onClick={onReset}
    >
      Reset board
    </Button>
  );
});
ResetButton.displayName = nameof(ResetButton);

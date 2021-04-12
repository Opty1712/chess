import { memo } from 'react';
import { AppRoot, Board } from '../src/components';

const Chess = memo(() => (
  <AppRoot>
    <Board />
  </AppRoot>
));
Chess.displayName = nameof(Chess);

export default Chess;

import { memo } from 'react';
import { AppRoot } from '../src/components';
import { Chess } from '../src/containers';

const ChessGame = memo(() => (
  <AppRoot>
    <Chess />
  </AppRoot>
));
ChessGame.displayName = nameof(ChessGame);

export default ChessGame;

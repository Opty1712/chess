import { memo } from 'react';
import { Board } from '../../components';

export const Chess = memo(() => <Board />);
Chess.displayName = nameof(Chess);

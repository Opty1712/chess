import { memo } from 'react';
import { Figure, FigureInfo } from '../../components';
import { BoardState } from '../../constants';
import { Cell, ChessGrid } from './styled';

type ChessFiguresProps = {
  boardState: BoardState;
  onClick: (figureInfo: FigureInfo) => void;
};

export const ChessFigures = memo<ChessFiguresProps>(
  ({ boardState, onClick }) => {
    return (
      <ChessGrid data-testid={chessFiguresTestId}>
        {boardState.map((itemRow, indexRow) =>
          itemRow.map((itemCell, indexCell) =>
            itemCell ? (
              <Figure
                x={indexRow}
                y={indexCell}
                figure={itemCell}
                key={indexRow + indexCell}
                onClick={onClick}
              />
            ) : (
              <Cell key={indexRow + indexCell} />
            )
          )
        )}
      </ChessGrid>
    );
  }
);
ChessFigures.displayName = nameof(ChessFigures);

export const chessFiguresTestId = 'chessFiguresTestId';

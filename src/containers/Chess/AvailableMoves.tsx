import { memo } from 'react';
import { Figure, FigureInfo } from '../../components';
import { BoardState } from '../../constants';
import { ChessGrid, EmptyCell } from './styled';

type AvailableMovesProps = {
  boardMoves: BoardState;
  onClick: (figureInfo: FigureInfo) => void;
};

export const AvailableMoves = memo<AvailableMovesProps>(
  ({ boardMoves, onClick }) => {
    return (
      <ChessGrid data-testid={availableMovesTestId}>
        {boardMoves.map((itemRow, indexRow) =>
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
              <EmptyCell key={indexRow + indexCell} />
            )
          )
        )}
      </ChessGrid>
    );
  }
);
AvailableMoves.displayName = nameof(AvailableMoves);

const availableMovesTestId = 'availableMovesTestId';

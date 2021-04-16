import { memo, MouseEventHandler, useCallback } from 'react';
import { Figure } from '../../components';
import { BoardState, Field } from '../../constants';
import { Cell, ChessGrid } from './styled';

type AvailableMovesProps = {
  boardMoves: BoardState;
  onClick: (field: Field) => void;
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
              <EmptyCell
                key={indexRow + indexCell}
                onClick={onClick}
                field={{ x: indexRow, y: indexCell }}
              />
            )
          )
        )}
      </ChessGrid>
    );
  }
);
AvailableMoves.displayName = nameof(AvailableMoves);

export const availableMovesTestId = 'availableMovesTestId';

type EmptyCellProps = Pick<AvailableMovesProps, 'onClick'> & {
  field: Field;
};

const EmptyCell = memo<EmptyCellProps>(({ onClick, field }) => {
  const handleClick = useCallback<MouseEventHandler<HTMLDivElement>>(
    (event) => {
      event.stopPropagation();
      onClick(field);
    },
    [field, onClick]
  );

  return <Cell onClick={handleClick} />;
});
EmptyCell.displayName = nameof(EmptyCell);

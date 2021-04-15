import {
  BoardState,
  FigureName,
  legalFields,
  NullableField
} from '../../constants';

export const getLegalRandomPosition = (
  figure: FigureName,
  boardState: BoardState
): NullableField => {
  const field = getRandomField(figure);

  if (!field) {
    return null;
  }

  const isFieldOccupied = checkIsFieldOccupied(field, boardState);

  if (isFieldOccupied) {
    return getLegalRandomPosition(figure, boardState);
  }

  return field;
};

const getRandomNumberFromInterval = (min: number, max: number) =>
  Math.floor(min + Math.random() * (max + 1 - min));

export const getRandomField = (figure: FigureName): NullableField => {
  const positions = legalFields[figure];
  if (positions) {
    const x = getRandomNumberFromInterval(positions.x[0], positions.x[1]);
    const y = getRandomNumberFromInterval(positions.y[0], positions.y[1]);

    return { x, y };
  }

  console.warn(`Legal fields for «${figure}» not found`);

  return null;
};

export const checkIsFieldOccupied = (
  field: NullableField,
  boardState: BoardState
) => {
  if (!field) {
    return null;
  }

  return Boolean(boardState[field.x][field.y]);
};

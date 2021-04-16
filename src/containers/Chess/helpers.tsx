import cloneDeep from 'lodash.clonedeep';
import { FigureInfo } from '../../components';
import {
  BoardState,
  emptyBoard,
  FigureName,
  legalFields,
  legalMoves,
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

export const getInitialBoard = () => {
  const clonedState = cloneDeep(emptyBoard);
  clonedState[2][1] = 'blackPawn';

  return clonedState;
};

export const addWhitePawn = (boardState: BoardState) => {
  const clonedState = cloneDeep(boardState);
  const field = getLegalRandomPosition('whitePawn', clonedState);
  if (field) {
    clonedState[field.x][field.y] = 'whitePawn';
  }

  return clonedState;
};

export const getAllMoves = ({ figure, x, y }: FigureInfo) => {
  const rules = legalMoves[figure];
  if (rules) {
    return rules.reduce<NullableField[]>((accumulator, current) => {
      if (current.check({ x, y })) {
        accumulator.push(...current.moves, ...current.eats);
      }

      return accumulator;
    }, []);
  }

  return [];
};

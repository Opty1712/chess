import cloneDeep from 'lodash.clonedeep';
import { FigureInfo } from '../../components';
import {
  BoardState,
  emptyBoard,
  Field,
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

export const makeFigureStep = (
  boardState: BoardState,
  figureInfo: FigureInfo,
  field: Field
) => {
  const clonedState = cloneDeep(boardState);
  clonedState[figureInfo.x][figureInfo.y] = null;

  const promotingFigure = checkPromotion(
    { ...figureInfo, x: field.x, y: field.y },
    field
  );

  clonedState[field.x][field.y] = promotingFigure || figureInfo.figure;

  return clonedState;
};

export const checkPromotion = (figureInfo: FigureInfo, field: Field) => {
  const rules = legalMoves[figureInfo.figure];

  if (rules) {
    return rules.reduce<FigureName | null>(
      (accumulator, { check, promotion }) => {
        return check(field) && promotion ? promotion : accumulator;
      },
      null
    );
  }
};

export const getAvailableFieldsGrid = (
  figureInfo: FigureInfo,
  boardState: BoardState
) => {
  const allMoves = getAllMoves(figureInfo);

  const fields = getAvailableFieldsByCurrentBoardState(
    figureInfo,
    boardState,
    allMoves
  );

  const grid = cloneDeep(emptyBoard);

  fields.forEach(({ x, y }) => (grid[x][y] = 'availableMove'));

  return grid;
};

type AllMoves = { moves: Field[]; eats: Field[] };

export const getAllMoves = ({ figure, x, y }: FigureInfo) => {
  const rules = legalMoves[figure];
  const emptyMoves: AllMoves = { moves: [], eats: [] };

  if (rules) {
    return rules.reduce<AllMoves>((accumulator, current) => {
      if (current.check({ x, y })) {
        accumulator.moves.push(...current.moves);
        accumulator.eats.push(...current.eats);
      }

      return accumulator;
    }, emptyMoves);
  }

  return emptyMoves;
};

export const getAvailableFieldsByCurrentBoardState = (
  figureInfo: FigureInfo,
  boardState: BoardState,
  allMoves: AllMoves
) => {
  const fieldsToEat = convertMovesToFields(figureInfo, allMoves.eats);
  const fieldsToEatInsideBoard = removeUnavailableFields(
    fieldsToEat,
    boardState,
    'eat'
  );

  const fieldsToMove = convertMovesToFields(figureInfo, allMoves.moves);
  const fieldsToMoveInsideBoard = removeUnavailableFields(
    fieldsToMove,
    boardState,
    'move'
  );

  return [...fieldsToEatInsideBoard, ...fieldsToMoveInsideBoard];
};

export const convertMovesToFields = (figureInfo: FigureInfo, moves: Field[]) =>
  moves.reduce<Field[]>((accumulator, current) => {
    const x = figureInfo.x + current.x;
    const y = figureInfo.y + current.y;
    accumulator.push({ x, y });

    return accumulator;
  }, []);

export const removeOutOfBoardFields = (fields: Field[]) => {
  return fields.filter(({ x, y }) => x >= 0 && x <= 7 && y >= 0 && y <= 7);
};

export const removeUnavailableFields = (
  fields: Field[],
  boardState: BoardState,
  action: 'move' | 'eat'
) => {
  const inBoardFields = removeOutOfBoardFields(fields);
  const availableFields = inBoardFields.filter((item) => {
    const isFieldOccupied = checkIsFieldOccupied(item, boardState);

    return action === 'eat' ? isFieldOccupied : !isFieldOccupied;
  });

  return availableFields;
};

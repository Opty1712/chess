import { PartialRecord } from '../utils';
import { FigureName } from './boardSettings';

// type LegalMove = {
//   move: [
//     {
//       from: {};
//       to: {};
//     }
//   ];
//   eat: {};
// };

// export const legalMoves: PartialRecord<FigureName, any> = {
//   blackPawn: '',
//   whitePawn: '',
//   whiteQueen: ''
// };

type LegalFields = {
  x: [number, number];
  y: [number, number];
};

export const legalFields: PartialRecord<FigureName, LegalFields> = {
  whitePawn: { x: [0, 7], y: [1, 6] }
};

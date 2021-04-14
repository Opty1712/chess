/**
 * Size of every element is calculated based on this parameter in «px»
 * Restarting «yarn dev» is obligatory after changing!!!
 * */
export const cellSize = 50;

const rowHeadings = '12345678';
const columnHeadings = 'abcdefgh';

/** Vertical board lines naming (digits) */
export const rowHeadingList = rowHeadings.split('');

/** Horizontal board lines naming (letters) */
export const columnHeadingList = columnHeadings.split('');

type RowData = Array<FigureName | null>;
const rowData = new Array(8).fill(null);

/** State of empty/occupied chess cells */
export type BoardState = Array<RowData>;

/** Initial empty board */
export const emptyBoard: BoardState = rowData.map(() => [...rowData]);

/** Names of chess figures */
export type FigureName = 'blackPawn' | 'whitePawn' | 'whiteQueen';

/** Size of every element is calculated based on this parameter */
export const cellSize = 50; //px

const rowHeadings = '12345678';
const columnHeadings = 'abcdefgh';

/** Symbols for vertical board lines naming (digits) */
export const rowHeadingList = rowHeadings.split('');

/** Symbols for horizontal board lines naming (letters) */
export const columnHeadingList = columnHeadings.split('');

type RowData = Record<string, string | null>;

const rowData: RowData = columnHeadingList.reduce<RowData>(
  (accumulator, current) => {
    accumulator[current] = null;

    return accumulator;
  },
  {}
);

type BoardCells = Record<string, RowData>;

export const boardCells: BoardCells = rowHeadingList.reduce<BoardCells>(
  (accumulator, current) => {
    accumulator[current] = { ...rowData };

    return accumulator;
  },
  {}
);

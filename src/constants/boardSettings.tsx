const rowHeadings = '12345678';
export const rowHeadingList = rowHeadings.split('');
const columnHeadings = 'abcdefgh';
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

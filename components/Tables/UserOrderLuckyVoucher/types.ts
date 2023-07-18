export interface Data {
  _id: string;
  userName: string;
  phoneNumber: string;
  voucherName: string;
  voucherContent: string;
}

export interface IHeadCell {
  disablePadding: boolean;
  id: keyof Data;
  label: string;
  numeric: boolean;
}
export interface ILuckyVoucherTableProps {
  title: string;
  data: Data[];
  setIsDeletedSelected: (isDeleted: any) => void;
}
export interface EnhancedTableProps {
  numSelected: number;
  onRequestSort: (
    event: React.MouseEvent<unknown>,
    property: keyof Data
  ) => void;
  onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
  order: Order;
  orderBy: string;
  rowCount: number;
  headCells: IHeadCell[];
}

export type Order = "asc" | "desc";
export interface EnhancedTableToolbarProps {
  numSelected: number;
  title: string;
  selected: string[];
  //setIsDeletedSelected: (isDeleted: any) => void;
}

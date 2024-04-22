export type TransactionStatus =
  | 'CREATED'
  | 'FAILED'
  | 'SETTLED'
  | 'CAPTURED'
  | 'COMPLETED'
  | null;

export interface Transaction {
  id: string;
  amount: number;
  currency: string;
  description: string;
  status: TransactionStatus;
  createdAt: string;
}

export interface TransactionQuery {
  pageIndex?: number;
  status?: TransactionStatus;
  start?: Date | null;
  end?: Date | null;
}

interface Pagination<T> {
  currentPage: number;
  hasNext: boolean;
  items: T[];
  numberOfPages: number;
  pageSize: number;
  totalNumberOfItems: number;
}

export type PaginatedTransactions = Pagination<Transaction>;

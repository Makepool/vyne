import { HttpParams } from '@angular/common/http';
import { dateToString } from '../utils/date-to-string.util';
import { TransactionQuery } from './transactions.model';

export const queryBuilder = (data: TransactionQuery) => {
  const queryTokens = {
    ...(data.pageIndex && { page: data.pageIndex }),
    ...(data.status && { status: data.status }),
    ...(data.start && { createdAtStart: dateToString(data.start) }),
    ...(data.end && { createdAtEnd: dateToString(data.end) }),
  };

  return new HttpParams().appendAll(queryTokens);
};

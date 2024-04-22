import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { TransactionStatus, PaginatedTransactions } from './transactions.model';
import { queryBuilder } from './transation-query-builder.util';

@Injectable({
  providedIn: 'root',
})
export class TransationsApiService {
  constructor(private http: HttpClient) {}

  get(
    pageIndex: number = 0,
    status: TransactionStatus = null,
    start: Date | null = null,
    end: Date | null = null
  ): Observable<PaginatedTransactions> {
    const params = queryBuilder({
      pageIndex: pageIndex,
      status,
      start,
      end,
    });

    return this.http
      .get<PaginatedTransactions>(`http://localhost:8080/api/v1/payments/`, {
        params,
      })
      .pipe(
        tap({
          error: () =>
            console.log(
              'in production we might show a toast here or send a request to our servers to log the failure'
            ),
        })
      );
  }
}

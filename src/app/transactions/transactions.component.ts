import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { BehaviorSubject, tap } from 'rxjs';
import { TransationsApiService } from './transations-api.service';
import { TableComponent } from '../components/table/table.component';
import { Transaction } from './transactions.model';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { AsyncPipe, NgIf } from '@angular/common';

@Component({
  selector: 'app-transactions',
  standalone: true,
  templateUrl: './transactions.component.html',
  styleUrl: './transactions.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgIf, AsyncPipe, TableComponent, MatPaginatorModule],
})
export class TransactionsComponent {
  private readonly pageIndex$ = new BehaviorSubject(0);

  readonly pageIndex = signal(this.pageIndex$);

  readonly totalResults = signal(0);

  readonly tableData = signal<Transaction[]>([]);

  readonly loading = signal(true);

  readonly paginationAndFilter$ = this.pageIndex$.pipe(
    tap((pageIndex) => {
      this.api
        .get(pageIndex)
        .pipe(
          tap({
            next: (result) => {
              this.totalResults.set(result.totalNumberOfItems);
              this.tableData.set(result.items);
              this.loading.set(false);
            },
          })
        )
        .subscribe();
    })
  );

  constructor(private api: TransationsApiService) {}

  pageChanged(data: PageEvent) {
    this.pageIndex$.next(data.pageIndex);
  }
}

import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { BehaviorSubject, combineLatest, tap } from 'rxjs';
import { TransationsApiService } from './transations-api.service';
import { TableComponent } from '../components/table/table.component';
import { Transaction, TransactionStatus } from './transactions.model';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { AsyncPipe, NgIf } from '@angular/common';
import { FormBuilder, FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-transactions',
  standalone: true,
  templateUrl: './transactions.component.html',
  styleUrl: './transactions.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    NgIf,
    AsyncPipe,
    TableComponent,
    MatPaginatorModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatSelectModule,
  ],
})
export class TransactionsComponent {
  private readonly pageIndex$ = new BehaviorSubject(0);

  readonly pageIndex = signal(this.pageIndex$);

  readonly totalResults = signal(0);

  readonly tableData = signal<Transaction[]>([]);

  readonly loading = signal(true);

  private readonly filter$ = new BehaviorSubject<TransactionStatus>(null);

  readonly paginationAndFilter$ = combineLatest([
    this.filter$,
    this.pageIndex$,
  ]).pipe(
    tap(([filter, pageIndex]) => {
      this.api
        .get(pageIndex, filter)
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

  readonly form = this.fb.group({
    filter_by: new FormControl<TransactionStatus>(null),
    start: new FormControl<Date | null>(null),
    end: new FormControl<Date | null>(null),
  });

  readonly filterChanged$ = this.form.get('filter_by')?.valueChanges.pipe(
    tap((value: TransactionStatus) => {
      this.pageIndex$.next(0);
      this.filter$.next(value);
    })
  );

  constructor(private api: TransationsApiService, private fb: FormBuilder) {}

  pageChanged(data: PageEvent) {
    this.pageIndex$.next(data.pageIndex);
  }
}

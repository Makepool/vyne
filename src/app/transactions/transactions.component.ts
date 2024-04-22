import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { BehaviorSubject, combineLatest, startWith, tap } from 'rxjs';
import { TransationsApiService } from './transations-api.service';
import { TableComponent } from '../components/table/table.component';
import { Transaction, TransactionStatus } from './transactions.model';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { AsyncPipe, NgIf } from '@angular/common';
import { FormBuilder, FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';

@Component({
  selector: 'app-transactions',
  standalone: true,
  templateUrl: './transactions.component.html',
  styleUrl: './transactions.component.scss',
  providers: [provideNativeDateAdapter()],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    NgIf,
    AsyncPipe,
    TableComponent,
    MatPaginatorModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatDatepickerModule,
  ],
})
export class TransactionsComponent {
  private readonly pageIndex$ = new BehaviorSubject(0);

  readonly pageIndex = signal(this.pageIndex$);

  readonly totalResults = signal(0);

  readonly tableData = signal<Transaction[]>([]);

  readonly loading = signal(true);

  private readonly statusFilter$ = new BehaviorSubject<TransactionStatus>(null);

  readonly form = this.fb.group({
    status: new FormControl<TransactionStatus>(null),
    start: new FormControl<Date | null>(null),
    end: new FormControl<Date | null>(null),
  });

  readonly statusChanged$ = this.form.get('status')?.valueChanges.pipe(
    tap((value: TransactionStatus) => {
      this.pageIndex$.next(0);
      this.statusFilter$.next(value);
    })
  );

  readonly startChanged$ = this.form.controls['start'].valueChanges;

  readonly endChanged$ = this.form.controls['end'].valueChanges;

  readonly datesFilter$ = combineLatest([
    this.startChanged$,
    this.endChanged$,
  ]).pipe(startWith([null, null]));

  readonly paginationAndFilter$ = combineLatest([
    this.statusFilter$,
    this.pageIndex$,
    this.datesFilter$,
  ]).pipe(
    tap(([filter, pageIndex, filterDates]) => {
      this.api
        .get(pageIndex, filter, filterDates[0], filterDates[1])
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

  constructor(private api: TransationsApiService, private fb: FormBuilder) {}

  pageChanged(data: PageEvent) {
    this.pageIndex$.next(data.pageIndex);
  }

  clear() {
    this.form.reset();
  }
}

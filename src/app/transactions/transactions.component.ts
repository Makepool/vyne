import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { tap } from 'rxjs';
import { TransationsApiService } from './transations-api.service';
import { TableComponent } from '../components/table/table.component';
import { Transaction } from './transactions.model';

@Component({
  selector: 'app-transactions',
  standalone: true,
  templateUrl: './transactions.component.html',
  styleUrl: './transactions.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [TableComponent],
})
export class TransactionsComponent {
  readonly tableData = signal<Transaction[]>([]);

  readonly loading = signal(true);

  constructor(api: TransationsApiService) {
    api
      .get()
      .pipe(
        tap({
          next: (result) => {
            console.log('result', result);
            this.tableData.set(result.items);
            this.loading.set(false);
          },
        })
      )
      .subscribe();
  }
}

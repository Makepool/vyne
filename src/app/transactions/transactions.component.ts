import { ChangeDetectionStrategy, Component } from '@angular/core';
import { tap } from 'rxjs';
import { TransationsApiService } from './transations-api.service';

@Component({
  selector: 'app-transactions',
  standalone: true,
  imports: [],
  templateUrl: './transactions.component.html',
  styleUrl: './transactions.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TransactionsComponent {
  constructor(api: TransationsApiService) {
    api
      .get()
      .pipe(
        tap({
          next: (result) => {
            console.log('result', result);
          },
        })
      )
      .subscribe();
  }
}

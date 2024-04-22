import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Transaction } from '../../transactions/transactions.model';
import { DatePipe, DecimalPipe, NgFor, NgIf } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { TagComponent } from '../tag/tag.component';

@Component({
  selector: 'vyne-table',
  standalone: true,
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    NgFor,
    NgIf,
    DatePipe,
    DecimalPipe,
    MatProgressSpinnerModule,
    TagComponent,
  ],
})
export class TableComponent {
  @Input()
  data: Transaction[];

  @Input()
  loading: boolean;
}

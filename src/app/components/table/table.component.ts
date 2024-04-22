import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Transaction } from '../../transactions/transactions.model';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'vyne-table',
  standalone: true,
  imports: [NgFor, NgIf],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TableComponent {
  @Input()
  data: Transaction[];

  @Input()
  loading: boolean;
}

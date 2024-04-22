import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  Input,
} from '@angular/core';

import { TransactionStatus } from '../../transactions/transactions.model';

@Component({
  selector: 'vyne-tag',
  standalone: true,
  // imports: [],
  template: '<ng-content></ng-content>',
  styleUrl: './tag.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TagComponent {
  _status: string;

  @HostBinding('class')
  @Input()
  set status(d: TransactionStatus) {
    this._status = d === null ? '' : d.toLocaleLowerCase();
  }

  get status(): string {
    return this._status;
  }
}

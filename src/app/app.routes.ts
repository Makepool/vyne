import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        data: { title: 'Account Assessments' },
        loadComponent: () =>
          import('./transactions/transactions.component').then(
            (x) => x.TransactionsComponent
          ),
      },
    ],
  },
];

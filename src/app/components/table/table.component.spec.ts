import { render, screen } from '@testing-library/angular';
import { TableComponent } from './table.component';

describe('Table Component', () => {
  it('should display the loading spinner when loading', async () => {
    await render(TableComponent, {
      componentProperties: { data: [], loading: true },
    });

    expect(screen.getAllByRole('progressbar').length).toBe(1);
  });

  it('should display text when there is no data for the table', async () => {
    await render(TableComponent, {
      componentProperties: { data: [], loading: false },
    });

    expect(
      screen.getByText('There are no results for your current filter options.')
    ).toBeTruthy();
  });

  it('should display the data passed as a table', async () => {
    await render(TableComponent, {
      componentProperties: {
        data: [
          {
            id: 'TXID_sdfb-sodj-3gb34-3r3brb',
            amount: 23.35,
            currency: 'GBP',
            description: 'Test payment made only for this technical task #1',
            status: 'CREATED',
            createdAt: '2021-07-01T12:27:07.965',
          },
        ],
        loading: false,
      },
    });

    screen.getByText('Test payment made only for this technical task #1');
    expect(screen.getAllByRole('row').length).toBe(2);
  });
});

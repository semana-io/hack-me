import React from 'react';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { FieldsWithLabels, Item } from '../../../types';
import Table from '../table';

interface Test extends Item {
  id: number,
  field1: string,
  field2: string,
}

const columns : FieldsWithLabels<Test> = [
  {
    field: 'field1',
    label: 'Field 1',
  },
  {
    field: 'field2',
    label: 'Field 2',
  },
];

const items : Test[] = [{
  id: 1,
  field1: 'test1',
  field2: 'test1@test.com',
}, {
  id: 2,
  field1: 'test2',
  field2: 'test@test.com',
}, {
  id: 3,
  field1: 'test3',
  field2: 'test@test.com',
}];

describe('Table', () => {
  it('should display the correct rows without modify/delete controls', async () => {
    const { findByTestId } = render(<Table
      columns={columns}
      items={items}
    />);

    const headers = (await findByTestId('headers')).getElementsByTagName('th');

    expect(headers[0].textContent).toBe('Field 1');
    expect(headers[1].textContent).toBe('Field 2');

    const row1 = (await findByTestId('row-1')).getElementsByTagName('td');
    const row2 = (await findByTestId('row-2')).getElementsByTagName('td');
    const row3 = (await findByTestId('row-3')).getElementsByTagName('td');

    expect(row1[0].textContent).toBe(items[0].field1);
    expect(row1[1].textContent).toBe(items[0].field2);

    expect(row2[0].textContent).toBe(items[1].field1);
    expect(row2[1].textContent).toBe(items[1].field2);

    expect(row3[0].textContent).toBe(items[2].field1);
    expect(row3[1].textContent).toBe(items[2].field2);
  });

  it('should display the modify/delete controls when their corresponding props are passed', async () => {
    const mockOpenModifyModal = jest.fn();
    const mockDeleteItem = jest.fn();

    const { findByTestId } = render(<Table
      columns={columns}
      items={items}
      openModifyModal={mockOpenModifyModal}
      deleteItem={mockDeleteItem}
    />);

    const headers = (await findByTestId('headers')).getElementsByTagName('th');

    expect(headers[2].textContent).toBe('Modify');
    expect(headers[3].textContent).toBe('Delete');

    const row1 = (await findByTestId('row-1')).getElementsByTagName('td');
    const modify1 = row1[2].getElementsByTagName('button')[0];
    const delete1 = row1[3].getElementsByTagName('button')[0];

    expect(modify1.textContent).toBe('Modify');
    expect(delete1.textContent).toBe('Delete');
  });

  it('should call the functions corresponding to modify/delete with the correct parameters when the buttons are clicked', async () => {
    const mockOpenModifyModal = jest.fn();
    const mockDeleteItem = jest.fn();

    const { findByTestId } = render(<Table
      columns={columns}
      items={items}
      openModifyModal={mockOpenModifyModal}
      deleteItem={mockDeleteItem}
    />);

    const row2 = (await findByTestId('row-2')).getElementsByTagName('td');
    const modify2 = row2[2].getElementsByTagName('button')[0];
    const delete2 = row2[3].getElementsByTagName('button')[0];

    userEvent.click(modify2);

    expect(mockOpenModifyModal).toHaveBeenCalledTimes(1);
    expect(mockOpenModifyModal.mock.calls).toEqual([[items[1]]]);

    userEvent.click(delete2);

    expect(mockDeleteItem).toHaveBeenCalledTimes(1);
    expect(mockDeleteItem.mock.calls).toEqual([[2]]);

    mockOpenModifyModal.mockClear();
    mockDeleteItem.mockClear();

    const row3 = (await findByTestId('row-3')).getElementsByTagName('td');
    const modify3 = row3[2].getElementsByTagName('button')[0];
    const delete3 = row3[3].getElementsByTagName('button')[0];

    userEvent.click(modify3);

    expect(mockOpenModifyModal).toHaveBeenCalledTimes(1);
    expect(mockOpenModifyModal.mock.calls).toEqual([[items[2]]]);

    userEvent.click(delete3);

    expect(mockDeleteItem).toHaveBeenCalledTimes(1);
    expect(mockDeleteItem.mock.calls).toEqual([[3]]);
  });
});

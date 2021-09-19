import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import FormModal from '../form-modal';
import { FieldsWithLabelsAndTypes, Item } from '../../../types';

interface Test extends Item {
  field1: string,
  field2: string,
}

const formFields : FieldsWithLabelsAndTypes<Test> = [
  {
    field: 'field1',
    label: 'Field 1',
    type: 'text',
  },
  {
    field: 'field2',
    label: 'Field 2',
    type: 'email',
  },
];

const item : Test = {
  field1: 'test',
  field2: 'test@test.com',
};

// eslint-disable-next-line @typescript-eslint/no-empty-function
const noop = () => {};

describe('FormModal', () => {
  it('should display the correct field labels and use the correct input types', async () => {
    const mockSubmit = jest.fn();

    const { findByTestId } = render(<FormModal
      formFields={formFields}
      initialItem={item}
      isModalOpen
      setIsModalOpen={noop}
      title="Modal"
      submit={mockSubmit}
    />);

    const field1 = await findByTestId(`field-${formFields[0].field}`);
    const field2 = await findByTestId(`field-${formFields[1].field}`);

    expect(field1.innerHTML).toContain(`${formFields[0].label}:`);
    expect(field1.getElementsByTagName('input')[0].type).toBe(formFields[0].type);
    expect(field2.getElementsByTagName('input')[0].type).toBe(formFields[1].type);
  });

  it('should display the correct initial values', async () => {
    const mockSubmit = jest.fn();

    const { findByTestId } = render(<FormModal
      formFields={formFields}
      initialItem={item}
      isModalOpen
      setIsModalOpen={noop}
      title="Modal"
      submit={mockSubmit}
    />);

    const field1 = await findByTestId(`field-${formFields[0].field}`);
    const field2 = await findByTestId(`field-${formFields[1].field}`);

    expect(field1.getElementsByTagName('input')[0].value).toBe(item.field1);
    expect(field2.getElementsByTagName('input')[0].value).toBe(item.field2);
  });

  it('should submit the correct values', async () => {
    const mockSubmit = jest.fn();

    const div = document.createElement('div');
    div.id = 'root';
    const { findByTestId } = render(<FormModal
      formFields={formFields}
      initialItem={item}
      isModalOpen
      setIsModalOpen={noop}
      title="Modal"
      submit={mockSubmit}
    />);

    const field1 = await findByTestId(`field-${formFields[0].field}`);
    const field2 = await findByTestId(`field-${formFields[1].field}`);
    const button = await findByTestId('submit');
    const form = await findByTestId('form') as HTMLFormElement;

    const newItem1: Test = {
      field1: 'Test value for field 1',
      field2: 'value@forfield2.com',
    };

    const newItem2: Test = {
      field1: 'Another value for field 1',
      field2: 'value2@forfield2.com',
    };

    const newItem3: Test = {
      field1: 'Different value for field 1',
      field2: 'value3@forfield2.com',
    };

    userEvent.clear(field1.getElementsByTagName('input')[0]);
    userEvent.type(field1.getElementsByTagName('input')[0], newItem1.field1);
    userEvent.clear(field2.getElementsByTagName('input')[0]);
    userEvent.type(field2.getElementsByTagName('input')[0], `${newItem1.field2}{enter}`);

    expect(mockSubmit).toHaveBeenCalledTimes(1);
    expect(mockSubmit.mock.calls).toEqual([[newItem1]]);

    mockSubmit.mockClear();

    userEvent.clear(field1.getElementsByTagName('input')[0]);
    userEvent.type(field1.getElementsByTagName('input')[0], newItem2.field1);
    userEvent.clear(field2.getElementsByTagName('input')[0]);
    userEvent.type(field2.getElementsByTagName('input')[0], newItem2.field2);
    userEvent.click(button);

    expect(mockSubmit).toHaveBeenCalledTimes(1);
    expect(mockSubmit.mock.calls).toEqual([[newItem2]]);

    mockSubmit.mockClear();

    userEvent.clear(field1.getElementsByTagName('input')[0]);
    userEvent.type(field1.getElementsByTagName('input')[0], newItem3.field1);
    userEvent.clear(field2.getElementsByTagName('input')[0]);
    userEvent.type(field2.getElementsByTagName('input')[0], newItem3.field2);
    fireEvent.submit(form);

    expect(mockSubmit).toHaveBeenCalledTimes(1);
    expect(mockSubmit.mock.calls).toEqual([[newItem3]]);
  });
});

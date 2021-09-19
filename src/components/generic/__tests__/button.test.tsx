import React from 'react';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Button from '../button';

describe('Button', () => {
  it('should display the correct label', async () => {
    const mockClick = jest.fn();
    const { findByTestId } = render(<Button onClick={mockClick} label="Test" />);

    const button = await findByTestId('button') as HTMLButtonElement;
    expect(button.textContent).toBe('Test');
  });

  it('should call the onClick prop on click', async () => {
    const mockClick = jest.fn();
    const { findByTestId } = render(<Button onClick={mockClick} label="Test" />);

    const button = await findByTestId('button');
    userEvent.click(button);

    expect(mockClick).toHaveBeenCalled();
  });
});

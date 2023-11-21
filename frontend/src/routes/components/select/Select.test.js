// Necessary imports
import { render, fireEvent } from '@testing-library/svelte';
import SelectComponent from './Select.svelte'; // Replace with path to your component
import '@testing-library/jest-dom';

// Mock Data
const mockData = [
  { id: 1, name: 'Option 1' },
  { id: 2, name: 'Option 2' },
];

describe('SelectComponent', () => {
  it('renders the correct default selected option', () => {
    const { getByDisplayValue } = render(SelectComponent, {
      data: mockData,
      valueKey: 'id',
      titleKey: 'name',
      value: 1
    });

    expect(getByDisplayValue('Option 1')).toBeInTheDocument();
  });

  it('changes option when a new value is selected', async () => {
    const { getByDisplayValue, getByTestId } = render(SelectComponent, {
      data: mockData,
      valueKey: 'id',
      titleKey: 'name',
      value: 1
    });

    const select = getByTestId('form-select');
    await fireEvent.change(select, { target: { value: 2 } });

    expect(getByDisplayValue('Option 2')).toBeInTheDocument();
  });
});

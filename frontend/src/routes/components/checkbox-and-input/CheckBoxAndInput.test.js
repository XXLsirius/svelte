import { render, fireEvent } from "@testing-library/svelte";
import CheckboxComponent from './CheckBoxAndInput.svelte'; // Replace with the path to your Svelte component
import '@testing-library/jest-dom';

describe('CheckboxComponent', () => {
  it('should render with default props', async () => {
    const { getByText, getByRole, getByTestId } = render(CheckboxComponent);

    // Verify that the component renders with the default props
    expect(getByText('Check Box')).toBeInTheDocument(); // Assuming the default value of title is "Check Box"
    const checkbox = getByRole('checkbox');
    expect(checkbox).not.toBeChecked(); // Assuming the default value of checked is "false"
    const dateInput = getByTestId('datepicker');
    expect(dateInput).toBeDisabled();
  });

  it('should enable date input when checkbox is checked', async () => {
    const { getByRole, getByTestId } = render(CheckboxComponent);

    const checkbox = getByRole('checkbox');
    const dateInput = getByTestId('datepicker');

    // Simulate user checking the checkbox
    await fireEvent.click(checkbox);

    // Verify that the date input is enabled when the checkbox is checked
    expect(dateInput).not.toBeDisabled();
  });

  // Add more test cases to cover other interactions and edge cases
  it('should datepicker chanaged when date is selected', async () => {
    const { getByDisplayValue, getByTestId } = render(CheckboxComponent);

    const dateInput = getByTestId('datepicker');

    // Simulate user checking the checkbox
    await fireEvent.change(dateInput, {target: {value: '2020-05-24'}});

    // Verify that the date input is enabled when the checkbox is checked
    expect(getByDisplayValue('2020-05-24')).toBeInTheDocument();
  });
});

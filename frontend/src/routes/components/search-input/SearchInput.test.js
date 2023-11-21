import { render, fireEvent, waitFor } from "@testing-library/svelte";
import SearchComponent from './SearchInput.svelte';
import '@testing-library/jest-dom';

    const mockData = [
		"Apple",
		"Banana",
		"Lemon",
		"Pineapple",
		"Strawberry",
		"Berry",
		"Watermelon",
		"Melon",
		"Grapes",
		"Papaya",
		"Guava",
		"Mango",
		"Pear",
		"Peach",
		"Pomegranate",
	];

describe('SearchComponent', () => {
  it('should display search recommendations when input value changes', async () => {
    const { getByRole, getByText } = render(SearchComponent, {
      data: mockData,
    });

    // Get the input element
    const inputElement = getByRole('textbox', { name: "" });

    // Simulate user typing in the input
    await fireEvent.input(inputElement, { target: { value: 'ap' } });

    // Wait for the recommendations to appear
    await waitFor(() => {
      expect(getByText('Apple')).toBeInTheDocument();
    });
  });

  it('should select a recommendation when clicked', async () => {
    const { getByRole, getByText, queryByText } = render(SearchComponent, {
      data: ['Apple', 'Banana', 'Cherry', 'Orange'],
    });

    // Get the input element
    const inputElement = getByRole('textbox', { name: "" });

    // Simulate user typing in the input
    await fireEvent.input(inputElement, { target: { value: 'ch' } });

    // Wait for the recommendations to appear
    await waitFor(() => {
      expect(getByText('Cherry')).toBeInTheDocument();
    });

    // Click on the recommendation
    await fireEvent.click(getByText('Cherry'));

    // Verify that the input value is updated
    expect(inputElement.value).toBe('Cherry');
    expect(queryByText('Cherry')).not.toBeInTheDocument();
  });

  // Add more test cases to cover other interactions and edge cases
});

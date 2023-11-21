import { render, fireEvent } from "@testing-library/svelte";
import { vi } from "vitest";
import ModalComponent from './Modal.svelte'; // Replace with the path to your Svelte component

describe('ModalComponent', () => {
  it('should call the onConfirmClick function when the OK button is clicked', async () => {
    const mockOnConfirmClick = vi.fn();
    const modalTitle = 'Test Modal';
    const modalID = 'test-modal';
    
    const { getByText } = render(ModalComponent, {
      modalTitle,
      modalID,
      onConfirmClick: mockOnConfirmClick,
    });

    // Find and click the OK button
    const confirmButton = getByText('OK');
    await fireEvent.click(confirmButton);

    // Ensure that the onConfirmClick function was called
    expect(mockOnConfirmClick).toHaveBeenCalled();
  });

  // Add more test cases to cover other interactions and edge cases
});

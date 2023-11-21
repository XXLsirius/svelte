import { render, fireEvent } from "@testing-library/svelte";
import CustomComponent from './LabelGroup.svelte';  // Replace with the path to your Svelte component
import '@testing-library/jest-dom';

describe('CustomComponent', () => {
  it('should render with default props', async () => {
    const mockOnLinkClick = vi.fn();
    const { getByText, queryByRole } = render(CustomComponent, {
      props: {
        onLinkClick: mockOnLinkClick,
        hasLink: "false",  // Setting hasLink to "true" to trigger link rendering
      },
    });

    // Verify that the component renders with the default props
    expect(getByText('S-Number')).toBeInTheDocument();  // Assuming the default value of leftLabel is "S-Number"
    expect(getByText('Ship name')).toBeInTheDocument();  // Assuming the default value of rightLabel is "Ship name"
    expect(queryByRole('link')).not.toBeInTheDocument(); // Assuming the default value of hasLink is "false"
    // Add more expectations for other default prop values as needed
  });

  it('should handle link click correctly', async () => {
    const mockOnLinkClick = vi.fn(); // Creating a mock function to simulate onLinkClick
    const { getByText } = render(CustomComponent, {
      props: {
        onLinkClick: mockOnLinkClick,
        hasLink: "true",  // Setting hasLink to "true" to trigger link rendering
      },
    });

    const linkElement = getByText('S-Number');
    await fireEvent.click(linkElement);

    // Verify that the mock function was called when the link is clicked
    expect(mockOnLinkClick).toHaveBeenCalled();
  });

  // Add more test cases to cover other interactions and edge cases
});

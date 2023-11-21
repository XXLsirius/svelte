import { render } from "@testing-library/svelte";
import Page from './+page.svelte';
import '@testing-library/jest-dom';

describe('Checkbox and input component', () => {
    const value = "2020-05-24";
  it('should render with default props', async () => {
    const { getByTestId } = render(Page, { props: { value: value, checked: true } });

    expect(getByTestId('h_check')).toHaveTextContent("true");
    expect(getByTestId('h_value')).toHaveTextContent(value);
  });
});

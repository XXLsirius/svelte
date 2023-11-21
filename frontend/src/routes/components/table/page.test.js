import { render } from "@testing-library/svelte";
import Page from './+page.svelte';
import '@testing-library/jest-dom';

describe('table component', () => {
  const tdata = [
    {
      id: 1,
      name: "Apple",
      size: "big",
      price: "$120",
      count: "3",
    },
    {
      id: 2,
      name: "Banana",
      size: "small",
      price: "$219",
      count: "2",
    },
    {
      id: 3,
      name: "Orange",
      size: "big",
      price: "$520",
      count: "1",
    },
  ];

  it('should render with table content', async () => {
    const { queryAllByRole, getByText } = render(Page, { props: { tdata: tdata, hasPagination: true } });

    expect(queryAllByRole('row').length).toBe(3 + 1);

    expect(getByText("Next")).toBeInTheDocument();
    expect(getByText("Prev")).toBeInTheDocument();

    expect(getByText("Show entries")).toBeInTheDocument();
  });

  it('should render table without no pagination and count selector', async () => {
    const { queryAllByRole, queryByText } = render(Page, { props: { tdata: tdata, hasPagination: false } });

    expect(queryAllByRole('row').length).toBe(3 + 1);

    expect(queryByText("Next") === null).toBe(true);
    expect(queryByText("Prev") === null).toBe(true);

    expect(queryByText("Show entries") === null).toBe(true);
  });
});

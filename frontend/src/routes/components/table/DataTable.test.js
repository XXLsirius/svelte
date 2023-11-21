import DataTable from "./DataTable.svelte";
import { fireEvent, render } from '@testing-library/svelte';
import '@testing-library/jest-dom';

describe("DataTable Component", () => {
    let data = [
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

    test("should render the DataTable component", () => {

        const { getByText, getByRole } = render(DataTable, { data });

        const selectElement = getByRole('combobox');

        // Assert that the default value "10" is selected
        expect(selectElement).toHaveValue('10');

        fireEvent.click(getByText('Next'));
        fireEvent.click(getByText('Prev'));
    });
})


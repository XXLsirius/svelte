<script>
  import DataTable from "./DataTable.svelte";

  export let tdata = [
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

  export let hasPagination = true;
</script>

<DataTable data={tdata} {hasPagination}>
  <tr slot="header">
    <th>id</th>
    <th>Fruit Name</th>
    <th>Size</th>
    <th>Price / Count</th>
  </tr>
  <tr slot="body" let:item={row}>
    <td>{row.id}</td>
    <td>{row.name}</td>
    <td>{row.size}</td>
    <td>
      <span>{row.price}</span> / <span>{row.count}</span>
    </td></tr
  >
</DataTable>

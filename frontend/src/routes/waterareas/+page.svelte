<script>
  import Card from "../components/card/Card.svelte";
  import DataTable from "../components/table/Table.svelte";
  import WaterAreaModel from "../../assets/js/models/WaterAreaModel";
  import { currentItemStore, forRefreshStore } from "../stores";
  import { onMount } from "svelte";

  export let title = "WATER AREAS";
  export let formData = [];

  let pagination = {
    perPage: "10",
    page: 1,
    startPage: 1,
    totalPage: 0,
    totalCount: 0,
  };
  let isLoading;
  function initTable() {
    isLoading = true;
    WaterAreaModel.getAll({ pagination }).then((res) => {
      isLoading = false;
      formData = res.data;
      pagination.totalCount = res.count;
    });
  }

  forRefreshStore.subscribe((item) => {
    initTable();
  });

  function onPlusClick() {
    currentItemStore.update((item) => ({
      id: 0,
      table: "waterarea",
    }));
  }

  // for unit test
  export let onEditClick = ({ id }) => {
    currentItemStore.update((item) => ({
      id,
      table: "waterarea",
    }));
  };

  export let onDeleteClick = ({ id, title }) => {
    currentItemStore.update((item) => ({
      id,
      title,
      table: "waterarea",
    }));
  };

  onMount(() => {
    initTable();
  });
</script>

<Card {title} hasPlus="true" plusTarget="#waterarea-modal" {onPlusClick}>
  <DataTable data={formData} {pagination} {initTable} {isLoading}>
    <tr slot="header">
      <th>#</th>
      <th>Name</th>
      <th>Note</th>
      <th />
    </tr>
    <tr slot="body" let:item={row} let:i>
      <td>{i + 1}</td>
      <td>{row.name ? row.name : "N/A"}</td>
      <td>{row.note ? row.note : "N/A"}</td>
      <td class="text-right">
        <!-- for unitest -->
        <button
          aria-label="editButton"
          class="mb-2 mr-2 btn-icon btn-icon-only btn-square btn btn-primary btn-xs"
          on:click={() => onEditClick({ id: row.id })}
          data-toggle="modal"
          data-target="#waterarea-modal"
          ><i class="lnr-pencil btn-icon-wrapper" /></button
        >
        <button
          aria-label="deleteButton"
          class="mb-2 mr-2 btn-icon btn-icon-only btn-square btn btn-danger btn-xs"
          on:click={() =>
            onDeleteClick({
              id: row.id,
              title: row.name,
            })}
          data-toggle="modal"
          data-target="#delete-confirm-modal"
          ><i class="lnr-trash btn-icon-wrapper" /></button
        >
      </td>
    </tr>
  </DataTable>
</Card>

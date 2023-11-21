<script>
  import Card from "../components/card/Card.svelte";
  import DataTable from "../components/table/Table.svelte";
  import CertificateTypeModel from "../../assets/js/models/CertificateTypeModel";
  import { currentItemStore, forRefreshStore } from "../stores";
  import { onMount } from "svelte";

  export let title;
  export let t_data = [];

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
    CertificateTypeModel.getAll({ pagination, filter: { type: "ship" } }).then(
      (res) => {
        isLoading = false;
        t_data = res.data;
        pagination.totalCount = res.count;
      }
    );
  }

  forRefreshStore.subscribe((item) => {
    initTable();
  });

  function onPlusClick() {
    currentItemStore.update((item) => ({
      id: 0,
      table: "certificateTypeShip",
    }));
  }

  // for unit test
  export let onEditClick = ({ id }) => {
    currentItemStore.update((item) => ({
      id,
      table: "certificateTypeShip",
    }));
  };

  export let onDeleteClick = ({ id, title }) => {
    currentItemStore.update((item) => ({
      id,
      title,
      table: "certificateTypeShip",
    }));
  };

  onMount(() => {
    initTable();
  });
</script>

<Card {title} hasPlus="true" plusTarget="#toc-ship-modal" {onPlusClick}>
  <DataTable data={t_data} {pagination} {initTable} {isLoading}>
    <tr slot="header">
      <th>#</th>
      <th>Name</th>
      <th>Issuing Agency</th>
      <th>Note</th>
      <th />
    </tr>
    <tr slot="body" let:item={row} let:i>
      <td>{i + 1}</td>
      <td>{row.name ? row.name : "N/A"}</td>
      <td>{row.issuingAgency ? row.issuingAgency : "N/A"}</td>
      <td>{row.note ? row.note : "N/A"}</td>
      <td class="text-right">
        <button
          aria-label="editButton"
          class="mr-2 btn-icon btn-icon-only btn-square btn btn-primary btn-xs"
          on:click={() => onEditClick({ id: row.id })}
          data-toggle="modal"
          data-target="#toc-ship-modal"
          ><i class="lnr-pencil btn-icon-wrapper" /></button
        >
        <button
          aria-label="deleteButton"
          class="mr-2 btn-icon btn-icon-only btn-square btn btn-danger btn-xs"
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

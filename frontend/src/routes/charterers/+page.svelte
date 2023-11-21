<script>
  import Card from "../components/card/Card.svelte";
  import DataTable from "../components/table/Table.svelte";
  import ChartererModel from "../../assets/js/models/ChartererModel";
  import { currentItemStore, forRefreshStore } from "../stores";
  import { onMount } from "svelte";
  import SearchInput from "../components/search-input/SearchInput.svelte";

  export let title = "CHARTERERS";
  export let formData = [];
  let companies = [];
  let nations = [];
  let searchOptions = {
    company: "",
    nation: "",
  };
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
    ChartererModel.getAll({
      pagination,
      includeFilter: {
        company: searchOptions.company,
        nation: searchOptions.nation,
      },
    }).then((res) => {
      isLoading = false;
      formData = res.data;
      pagination.totalCount = res.count;
    });

    ChartererModel.getAll({}).then((res) => {
      companies = [...new Set(res.map((item) => item.company))];
      nations = [...new Set(res.map((item) => item.nation))];
    });
  }

  forRefreshStore.subscribe((item) => {
    initTable();
  });

  function onPlusClick() {
    currentItemStore.update((item) => ({
      id: 0,
      table: "charterer",
    }));
  }

  // for unit test
  export let onEditClick = ({ id }) => {
    currentItemStore.update((item) => ({
      id,
      table: "charterer",
    }));
  };

  export let onDeleteClick = ({ id, title }) => {
    currentItemStore.update((item) => ({
      id,
      title,
      table: "charterer",
    }));
  };

  onMount(() => {
    initTable();
  });
</script>

<Card {title} hasPlus="true" plusTarget="#charterer-modal" {onPlusClick}>
  <div class="form-row">
    <div class="col-md-3 col-4">
      <div class="position-relative form-group">
        <label for="inputCompany">Company</label>
        <SearchInput
          id="inputCompany"
          data={companies}
          bind:value={searchOptions.company}
        />
      </div>
    </div>
    <div class="col-md-3 col-4">
      <div class="position-relative form-group">
        <label for="inputNation">Nation</label>
        <SearchInput
          id="inputNation"
          data={nations}
          bind:value={searchOptions.nation}
        />
      </div>
    </div>

    <div class="col-md-6 col-4 d-flex align-items-end">
      <div class="d-flex">
        <button
          type="button"
          class="btn btn-primary mb-3 mr-3"
          style="width: 100px;"
          on:click={initTable}>Search</button
        >
      </div>
    </div>
  </div>
  <DataTable data={formData} {pagination} {initTable} {isLoading}>
    <tr slot="header">
      <th>#</th>
      <th>Company</th>
      <th>Nation</th>
      <th>Phone</th>
      <th>Email</th>
      <th />
    </tr>
    <tr slot="body" let:item={row} let:i>
      <td>{i + 1}</td>
      <td>{row.company ? row.company : "N/A"}</td>
      <td>{row.nation ? row.nation : "N/A"}</td>
      <td>{row.phone ? row.phone : "N/A"}</td>
      <td>{row.email ? row.email : "N/A"}</td>
      <td class="text-right">
        <button
          aria-label="editButton"
          class="mb-2 mr-2 btn-icon btn-icon-only btn-square btn btn-primary btn-xs"
          on:click={() => onEditClick({ id: row.id })}
          data-toggle="modal"
          data-target="#charterer-modal"
          ><i class="lnr-pencil btn-icon-wrapper" /></button
        >
        <button
          aria-label="deleteButton"
          class="mb-2 mr-2 btn-icon btn-icon-only btn-square btn btn-danger btn-xs"
          on:click={() =>
            onDeleteClick({
              id: row.id,
              title: row.company,
            })}
          data-toggle="modal"
          data-target="#delete-confirm-modal"
          ><i class="lnr-trash btn-icon-wrapper" /></button
        >
      </td>
    </tr>
  </DataTable>
</Card>

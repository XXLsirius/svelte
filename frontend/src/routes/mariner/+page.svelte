<script>
  import Card from "../components/card/Card.svelte";
  import DataTable from "../components/table/Table.svelte";
  import MarinerModel from "../../assets/js/models/MarinerModel";
  import ShipModel from "../../assets/js/models/ShipModel";
  import { currentItemStore, forRefreshStore } from "../stores";
  import { goto } from "$app/navigation";
  import { onMount } from "svelte";
  import Select from "../components/select/Select.svelte";
  import ModelFuncs from "../../assets/js/models/ModelMain";
  import SearchInput from "../components/search-input/SearchInput.svelte";

  let title = "Mariners";
  let data = [];
  let ships = [];
  let marinerNames = [];
  let searchOptions = {
    name: "",
    shipId: "",
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
    MarinerModel.getAll({
      pagination,
      filter: {
        "ship.id": searchOptions.shipId,
      },
      includeFilter: {
        name: searchOptions.name,
      },
    }).then((res) => {
      isLoading = false;
      data = res.data;
      pagination.totalCount = res.count;
    });
  }

  function initSelect() {
    ShipModel.getAll({}).then((res) => {
      ships = [
        {
          id: "",
          vesselName: "All",
        },
        ...res,
      ];
    });

    MarinerModel.getAll({ onlyNames: true }).then((res) => {
      marinerNames = [...new Set(res.map((item) => item.name))];
    });
  }

  forRefreshStore.subscribe((item) => {
    initTable();
  });

  function onPlusClick() {
    goto("/mariner/mariner-create/id=0");
  }

  function onEditClick({ id }) {
    goto(`/mariner/mariner-create/id=${id}`);
  }

  function goToDetail({ id }) {
    goto(`/mariner/mariner-detail/id=${id}`);
  }

  function onDeleteClick({ id, title }) {
    currentItemStore.update((item) => ({
      id,
      title,
      table: "mariner",
    }));
  }

  onMount(() => {
    initTable();
    initSelect();
  });
</script>

<Card {title} hasPlus="true" {onPlusClick}>
  <div class="form-row">
    <div class="col-md-9">
      <div class="form-row">
        <div class="col-md-3 col-4">
          <div class="position-relative form-group">
            <label for="selectName">Name</label>
            <SearchInput
              id="selectName"
              data={marinerNames}
              bind:value={searchOptions.name}
            />
          </div>
        </div>
        <div class="col-md-3 col-4">
          <div class="position-relative form-group">
            <label for="selectPersonal">Ship</label>
            <Select
              data={ships}
              valueKey="id"
              titleKey="vesselName"
              bind:value={searchOptions.shipId}
            />
          </div>
        </div>
        <div class="col-md-3 col-4 d-flex align-items-end">
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
    </div>
  </div>
  <DataTable {data} {pagination} {initTable} {isLoading}>
    <tr slot="header">
      <th>#</th>
      <th>Name</th>
      <th>Ship</th>
      <th>Duty(Job)</th>
      <th>Certificate(Expire)</th>
      <th />
    </tr>
    <tr
      class="cursor-pointer"
      slot="body"
      let:item={row}
      let:i
      on:click={(e) => {
        if (e.target.tagName === "BUTTON" || e.target.tagName === "I") {
          return;
        }
        goToDetail({ id: row.id });
      }}
    >
      <td>{i + 1}</td>
      <td class="d-flex">
        <div
          style="min-width:50px; max-width:50px; height:50px; display:flex; align-items:center; justify-content:center; background:#ccc;"
        >
          <img
            alt="mariner"
            class="mariner-img-sm"
            style="max-width:100%; max-height:100%;"
            src={row.image
              ? `${ModelFuncs.getServerUrl()}/${row.image}`
              : "/src/assets/images/mariners/placeholder.png"}
          />
        </div>

        <div class="ml-3 my-auto">
          <h6>
            {row.name ? row.name : "-"}
          </h6>
        </div>
      </td>
      <td>
        <div>{row.ship ? row.ship.vesselName : "N/A"}</div>
      </td>
      <td>
        <div>
          {row.duty ? row.duty.name : "N/A"}
          {row.job ? `(${row.job.name})` : "(N/A)"}
        </div>
      </td>
      <td>
        <div>
          {row.certificates.length ? row.certificates[0].issue.id : "N/A"}
        </div>
        <div class="mt-2">
          {row.certificates.length
            ? `${row.certificates[0]?.issue.expire}`
            : "N/A"}
        </div>
      </td>
      <td class="text-right">
        <button
          class="mr-2 btn-icon btn-icon-only btn-square btn btn-primary btn-xs"
          on:click={() => onEditClick({ id: row.id })}
          ><i class="lnr-pencil btn-icon-wrapper" />
        </button>
        <button
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

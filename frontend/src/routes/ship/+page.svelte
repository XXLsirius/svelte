<script>
  import Card from "../components/card/Card.svelte";
  import DataTable from "../components/table/Table.svelte";
  import ModelFuncs from "../../assets/js/models/ModelMain";
  import ShipModel from "../../assets/js/models/ShipModel";
  import { currentItemStore, forRefreshStore } from "../stores";
  import { goto } from "$app/navigation";
  import { onMount } from "svelte";

  export let title = "Ships";
  let data = [];
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
    ShipModel.getAll({ pagination }).then((res) => {
      isLoading = false;
      data = res.data;
      pagination.totalCount = res.count;
    });
  }

  forRefreshStore.subscribe((item) => {
    initTable();
  });

  function onPlusClick() {
    goto("/ship/ship-create/id=0");
  }

  function onEditClick({ id }) {
    goto(`/ship/ship-create/id=${id}`);
  }

  function goToDetail({ id }) {
    goto(`/ship/ship-detail/id=${id}`);
  }

  function onDeleteClick({ id, title }) {
    currentItemStore.update((item) => ({
      id,
      title,
      table: "ship",
    }));
  }

  onMount(() => {
    initTable();
  });
</script>

<Card {title} hasPlus="true" {onPlusClick}>
  <DataTable {data} {pagination} {initTable} {isLoading}>
    <tr slot="header">
      <th>#</th>
      <th>Vessel</th>
      <th>IMO / CS</th>
      <th>Length / Beam</th>
      <th>DWT / GT</th>
      <th>Certificate / Expiration</th>
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
          style="min-width:100px; max-width:100px; height:57px; display:flex; align-items:center; justify-content:center; background:#ccc;"
        >
          <img
            alt="ship"
            class="ship-img-sm"
            style="max-width:100%; max-height:100%;"
            src={row.images && row.images.length
              ? `${ModelFuncs.getServerUrl()}/${row.images[0]}`
              : "/src/assets/images/ships/placeholder.png"}
          />
        </div>

        <div class="ml-3 my-auto">
          <h6>
            {row.vesselName ? row.vesselName : "-"}
          </h6>
          <div class="mt-2">{row.shipType ? row.shipType : ""}</div>
        </div>
      </td>
      <td>
        <div>{row.imoNumber ? row.imoNumber : "N/A"}</div>
        <div class="mt-2">{row.callsign ? row.callsign : "N/A"}</div>
      </td>
      <td>
        <div>{row.length ? row.length : "N/A"}</div>
        <div class="mt-2">{row.beam ? row.beam : "N/A"}</div>
      </td>
      <td>
        <div>{row.deadWeight ? row.deadWeight : "N/A"}</div>
        <div class="mt-2">{row.grossTonnage ? row.grossTonnage : "N/A"}</div>
      </td>
      <td>
        <div>{row.certificates[0]?.issue?.id ?? "N/A"}</div>
        <div class="mt-2">
          {row.certificates[0]?.issue?.expire ?? "N/A"}
        </div>
      </td>
      <td class="text-right">
        <button
          class="mr-2 btn-icon btn-icon-only btn-square btn btn-primary btn-xs"
          on:click={(e) => {
            onEditClick({ id: row.id });
          }}
          ><i class="lnr-pencil btn-icon-wrapper" />
        </button>
        <button
          class="mr-2 btn-icon btn-icon-only btn-square btn btn-danger btn-xs"
          on:click={(e) => {
            onDeleteClick({
              id: row.id,
              title: row.vesselName,
            });
          }}
          data-toggle="modal"
          data-target="#delete-confirm-modal"
          ><i class="lnr-trash btn-icon-wrapper" /></button
        >
      </td>
    </tr>
  </DataTable>
</Card>

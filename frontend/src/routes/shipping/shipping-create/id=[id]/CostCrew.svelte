<script>
  import DataTable from "../../../components/table/DataTable.svelte";

  import { onMount } from "svelte";

  import MarinerModel from "../../../../assets/js/models/MarinerModel";

  let cost_crew_total = 0;
  let ship_id = "";
  export let currentItem;
  export let mariners = [];
  // let mariners = [];

  // $: calcTotal(mariners);
  $: getMariners(currentItem.main_ship.id);

  function calcTotal() {
    cost_crew_total = 0;

    if (mariners) {
      // currentItem.cost_crews = [];

      mariners.forEach((row) => {
        let val = row.mariner_daily_fee * row.mariner_days;
        cost_crew_total += val;
      });
    }
  }

  function getMariners() {
    if (!currentItem.main_ship.id) {
      mariners = [];
      return;
    }

    if (
      ship_id !== "" &&
      currentItem.main_ship.id !== "" &&
      currentItem.main_ship.id === ship_id
    ) {
      return;
    }

    ship_id = currentItem.main_ship.id;

    MarinerModel.getAll({
      onlyNames: true,
      filter: { "ship.id": currentItem.main_ship.id },
    }).then((marins) => {
      mariners = [];
      cost_crew_total = 0;

      marins.forEach((mariner) => {
        let tmp_mariner = mariner;
        let is_in_crew = false;

        currentItem.cost_crews.forEach((cost_crew) => {
          if (cost_crew.id == mariner.id) {
            tmp_mariner.mariner_daily_fee = cost_crew.mariner_daily_fee;
            tmp_mariner.mariner_days = cost_crew.mariner_days;
            tmp_mariner.amount =
              tmp_mariner.mariner_daily_fee * tmp_mariner.mariner_days;

            is_in_crew = true;
          }
        });

        if (is_in_crew == false) {
          tmp_mariner.mariner_daily_fee = mariner.dailyFee;
          tmp_mariner.mariner_days = 0;
          tmp_mariner.amount = 0;
        }

        mariners = [...mariners, tmp_mariner];
      });

      calcTotal();
    });
  }

  onMount(() => {
    getMariners();
  });
</script>

<div>
  <!-- [Total] -->
  <div class="position-relative form-group mb-4">
    <div class="d-flex">
      <label for="cost-crew-total" class="my-auto mr-2">Total</label>
      <div class="col-md-3 pl-0 pr-0">
        <input
          id="cost-crew-total"
          type="text"
          class="form-control"
          value={cost_crew_total}
          disabled
        />
      </div>
    </div>
  </div>

  <!-- Cost Crew Table -->
  {#if mariners.length > 0}
    <DataTable bind:data={mariners} hasPagination={false}>
      <tr slot="header">
        <th>No</th>
        <th>Job</th>
        <th>Name</th>
        <th>Daily fee</th>
        <th>Days</th>
        <th>Amount</th>
      </tr>
      <tr slot="body" let:item={row} let:i>
        <td>{i + 1}</td>
        <td>{row.job ? row.job.name : ""}</td>
        <td>{row.name}</td>
        <td class="p-0"
          ><input
            type="number"
            value={row.mariner_daily_fee}
            class="form-control"
            min="0"
            on:input={(event) => {
              row.mariner_daily_fee = event.target.value;
              mariners[i].amount = row.mariner_daily_fee * row.mariner_days;
              calcTotal();
            }}
          /></td
        >
        <td class="p-0"
          ><input
            type="number"
            value={row.mariner_days}
            class="form-control"
            min="0"
            on:input={(event) => {
              row.mariner_days = event.target.value;
              mariners[i].amount = row.mariner_daily_fee * row.mariner_days;
              calcTotal();
            }}
            on:keypress={(event) => {
              if (event.key == ".") {
                event.preventDefault();
              }
            }}
          /></td
        >
        <td>{row.amount}</td>
      </tr>
    </DataTable>
  {/if}

  <!-- [Note] -->
  <div class="position-relative form-group">
    <label for="cost-crew-note">Note</label>
    <textarea
      cols="10"
      class="form-control"
      bind:value={currentItem.cost_crew_note}
    />
  </div>
</div>

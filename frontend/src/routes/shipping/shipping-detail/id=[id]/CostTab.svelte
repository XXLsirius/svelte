<script>
  import { onMount } from "svelte";
  import DataTable from "../../../components/table/DataTable.svelte";

  import MarinerModel from "../../../../assets/js/models/MarinerModel";

  export let currentItem;

  let cost_crew_total = 0;
  let cost_other_total = 0;

  $: calcCrewTotal(currentItem.cost_crews);
  $: calcOtherTotal(currentItem.cost_others);

  function update_cost_crew_table() {
    if (currentItem.cost_crews != null) {
      MarinerModel.getAll({ onlyNames: true }).then((mariners) => {
        currentItem.cost_crews.forEach((cost_crew) => {
          cost_crew.mariner = mariners.find(
            (mariner) => mariner.id == cost_crew.id
          );
        });
      });
    }
  }

  function calcCrewTotal(cost_crews) {
    update_cost_crew_table();
    cost_crew_total = 0;
    cost_crews.forEach((row) => {
      row.amount = row.mariner_daily_fee * row.mariner_days;
      cost_crew_total += row.amount;
    });
  }

  function calcOtherTotal(cost_others) {
    cost_other_total = 0;
    cost_others.forEach((row) => {
      row.amount = row.price * period_total_days(row.from, row.to);
      cost_other_total += row.amount;
    });
  }

  function period_total_days(from, to) {
    // Convert the date strings to Date objects
    let startDate = new Date(from);
    let endDate = new Date(to);

    // Calculate the difference in milliseconds
    let timeDifference = Math.abs(endDate.getTime() - startDate.getTime());
    // Calculate the number of days
    let dayMilliSeconds = 1000 * 60 * 60 * 24;
    let totalDays = Math.floor(timeDifference / dayMilliSeconds);

    return totalDays;
  }

  onMount(() => {
    update_cost_crew_table();
  });
</script>

<div class="ml-3 mr-3">
  <div class="mb-4">
    <div class="mb-1">
      Shipping fee: <span
        >{currentItem.cost_shipping_fee
          ? currentItem.cost_shipping_fee
          : "0"}</span
      > kg
    </div>

    <div class="mb-1">
      Deposit: <span
        >{currentItem.cost_deposit ? currentItem.cost_deposit : "0"}</span
      > kg
    </div>

    <div class="mb-1">
      Daily wages: <span
        >{currentItem.cost_daily_wages
          ? currentItem.cost_daily_wages
          : "0"}</span
      > kg
    </div>

    <div class="mb-1">
      Additional fee: <span
        >{currentItem.cost_additional_fee
          ? currentItem.cost_additional_fee
          : "0"}</span
      > kg
    </div>
  </div>

  <div class="mb-2">
    <div class="d-flex">
      <i class="metismenu-icon pe-7s-cash pe-2x mr-2" />
      <p class="font-weight-bolder">Crew fees</p>
    </div>
    <div class="ml-3 mr-3">
      <div class="mb-3">Total: <span>{cost_crew_total}</span> USD</div>
      <div class="mb-3">
        {currentItem.cost_crew_note ? currentItem.cost_crew_note : ""}
      </div>
      {#if currentItem.cost_crews.length > 0}
        <DataTable bind:data={currentItem.cost_crews} hasPagination={false}>
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
            <td>{row.mariner && row.mariner.job ? row.mariner.job.name : ""}</td
            >
            <td>{row.mariner ? row.mariner.name : ""}</td>
            <td>{row.mariner_daily_fee}</td>
            <td>{row.mariner_days}</td>
            <td>{row.amount}</td>
          </tr>
        </DataTable>
      {/if}
    </div>
  </div>

  <div>
    <div class="d-flex">
      <i class="metismenu-icon pe-7s-cash pe-2x mr-2" />
      <p class="font-weight-bolder">Other</p>
    </div>
    <div class="ml-3 mr-3">
      <div class="mb-3">Total: <span>{cost_other_total}</span> USD</div>
      <div class="mb-3">
        {currentItem.cost_other_note ? currentItem.cost_other_note : ""}
      </div>
      <DataTable bind:data={currentItem.cost_others} hasPagination={false}>
        <tr slot="header">
          <th>No</th>
          <th>Item</th>
          <th>Price</th>
          <th>From</th>
          <th>To</th>
          <th>Amount</th>
        </tr>
        <tr slot="body" let:item={row} let:i>
          <td>{i + 1}</td>
          <td>{row.item}</td>
          <td>{row.price}</td>
          <td>{row.from}</td>
          <td>{row.to}</td>
          <td>{row.amount}</td>
        </tr>
      </DataTable>
    </div>
  </div>
</div>

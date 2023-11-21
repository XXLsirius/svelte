<script>
  import DataTable from "../../../components/table/DataTable.svelte";

  export let currentItem;
  let cost_other_total = 0;

  function period_total_days(from, to) {
    if (from == null || to == null) {
      return 0;
    }

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

  $: calcTotal(currentItem.cost_others);

  function calcTotal(cost_others) {
    cost_other_total = 0;
    if (cost_others) {
      cost_others.forEach((row) => {
        row.amount = row.price * period_total_days(row.from, row.to);
        cost_other_total += row.amount;
      });
    }
  }

  function onPlusClick(e) {
    e.preventDefault();
    currentItem.cost_others = [
      ...currentItem.cost_others,
      {
        id: currentItem.cost_others.length + 1,
        item: "",
        price: 0,
        from: null,
        to: null,
      },
    ];
  }

  function onDeleteClick(id) {
    currentItem.cost_others = currentItem.cost_others.filter(
      (item) => item.id !== id.id
    );
  }
</script>

<div>
  <!-- Cost Other [Total] -->
  <div class="position-relative form-group mb-4">
    <div class="d-flex">
      <label for="cost-other-total" class="my-auto mr-2">Total</label>
      <div class="col-md-3 pl-0 pr-0">
        <input
          id="cost-other-total"
          type="text"
          class="form-control"
          value={cost_other_total}
          disabled
        />
      </div>
      <div class="d-flex plus-action ml-2" style="height:38px;">
        <a href="/" on:click={onPlusClick} style="margin:8px 0px;">
          <i class="fa fa-fw fa-lg"></i>
        </a>
      </div>
    </div>
  </div>

  <!-- Cost Other Table -->
  <DataTable bind:data={currentItem.cost_others} hasPagination={false}>
    <tr slot="header">
      <th>No</th>
      <th>Item</th>
      <th>Price</th>
      <th>From</th>
      <th>To</th>
      <th>Amount</th>
      <th />
    </tr>
    <tr slot="body" let:item={row} let:i>
      <td>{i + 1}</td>
      <td class="p-0"
        ><input
          type="text"
          value={row.item}
          class="form-control"
          on:input={(event) => {
            row.item = event.target.value;
            currentItem.cost_others[i].amount = 0;
          }}
        /></td
      >
      <td class="p-0"
        ><input
          type="number"
          value={row.price}
          class="form-control"
          min="0"
          on:input={(event) => {
            row.price = event.target.value;
            currentItem.cost_others[i].amount = 0;
          }}
        /></td
      >
      <td class="p-0"
        ><input
          type="date"
          value={row.from}
          class="form-control"
          on:input={(event) => {
            row.from = event.target.value;
            currentItem.cost_others[i].amount = 0;
          }}
        /></td
      >
      <td class="p-0"
        ><input
          type="date"
          value={row.to}
          class="form-control"
          on:input={(event) => {
            row.to = event.target.value;
            currentItem.cost_others[i].amount = 0;
          }}
        /></td
      >
      <td>{row.amount}</td>
      <td class="text-right">
        <button
          class="mr-2 btn-icon btn-icon-only btn-square btn btn-danger btn-xs"
          on:click={() =>
            onDeleteClick({
              id: row.id,
            })}><i class="lnr-trash btn-icon-wrapper" /></button
        >
      </td>
    </tr>
  </DataTable>

  <!-- Cost Other [Note] -->
  <div class="position-relative form-group">
    <label for="cost-other-note">Note</label>
    <textarea
      cols="10"
      class="form-control"
      bind:value={currentItem.cost_other_note}
    />
  </div>
</div>

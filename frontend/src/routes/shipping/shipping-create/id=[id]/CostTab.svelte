<script>
  import SubTab from "../../../components/tab/SubTab.svelte";
  import SubTabContent from "../../../components/tab/SubTabContent.svelte";
  import CostCrew from "./CostCrew.svelte";
  import CostOther from "./CostOther.svelte";

  let subTabAttrs = [
    {
      tabName: "Crew fees",
      tabHref: "cost-crew-tab",
    },
    {
      tabName: "Other",
      tabHref: "cost-other-tab",
    },
  ];

  export let currentItem;
  export let mariners = [];
</script>

<div class="mt-2 pl-2 pr-2">
  <div class="form-row mb-2">
    <div class="col-md-3">
      <div class="position-relative form-group">
        <label for="cost-shipping-fee">Shipping fee</label>
        <input
          id="cost-shipping-fee"
          type="text"
          class="form-control"
          bind:value={currentItem.cost_shipping_fee}
        />
      </div>
    </div>
    <div class="col-md-3">
      <div class="position-relative form-group">
        <label for="cost-deposit">Deposit</label>
        <input
          id="cost-deposit"
          type="text"
          class="form-control"
          bind:value={currentItem.cost_deposit}
        />
      </div>
    </div>
    <div class="col-md-3">
      <div class="position-relative form-group">
        <label for="cost-daily-wages">Daily wages</label>
        <input
          id="cost-daily-wages"
          type="text"
          class="form-control"
          bind:value={currentItem.cost_daily_wages}
        />
      </div>
    </div>
    <div class="col-md-3">
      <div class="position-relative form-group">
        <label for="cost-additional-fee">Additional fee</label>
        <input
          id="cost-additional-fee"
          type="text"
          class="form-control"
          bind:value={currentItem.cost_additional_fee}
        />
      </div>
    </div>
  </div>

  <SubTab {subTabAttrs} hasPlus="false">
    <SubTabContent subTabID={subTabAttrs[0].tabHref} isActive="true">
      <CostCrew bind:currentItem bind:mariners />
    </SubTabContent>
    <SubTabContent subTabID={subTabAttrs[1].tabHref}>
      <CostOther bind:currentItem />
    </SubTabContent>
  </SubTab>
</div>

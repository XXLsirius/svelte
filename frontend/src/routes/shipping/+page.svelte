<script>
  import ShippingCards from "./ShippingCard.svelte";
  import { onMount } from "svelte";
  import { goto } from "$app/navigation";

  import ShippingModel from "../../assets/js/models/ShippingModel";
  import { currentItemStore, forRefreshStore } from "../stores.js";

  /**
   * @type {never[]}
   */
  let shippings = [];

  function initShippingTable() {
    ShippingModel.getAll({}).then((res) => {
      shippings = res;
    });
  }

  forRefreshStore.subscribe((item) => {
    initShippingTable();
  });

  function onCreateShipping() {
    let id = "0";
    goto(`/shipping/shipping-create/id=${id}`);
  }

  function onShippingHistory() {
    goto("/shipping/shipping-history");
  }

  onMount(() => {
    initShippingTable();
  });
</script>

<div class="text-right">
  <button
    class="mb-2 mr-2 btn-transition btn btn-outline-warning"
    on:click={onShippingHistory}>Shipment History</button
  >
  <button class="mb-2 mr-2 btn btn-warning" on:click={onCreateShipping}
    >Create Shipment</button
  >
</div>

<ShippingCards {shippings} />

<script>
  import Card from "../components/card/Card.svelte";
  import LabelGroup from "../components/label-group/LabelGroup.svelte";
  import ShippingCardArea from "./ShippingCardArea.svelte";

  /**
   * @type {any}
   */
  export let shippings;

  function onEditClick({ shippingID }) {}
</script>

{#each shippings as shipping}
  <Card title="" hasPlus="false" onPlusClick="">
    <!-- Label Group & Edit Button -->
    <div class="d-flex mt-n3">
      <div class="w-50">
        <LabelGroup
          leftLabel={shipping.main_snumber ? shipping.main_snumber : "-"}
          rightLabel={shipping.main_ship ? shipping.main_ship.vesselName : "-"}
          hasLink="true"
          fontSize="14px;"
          onLinkClick={() => onEditClick({ shippingID: shipping.id })}
          linkTo="/shipping/shipping-detail/id={shipping.id}"
        />
      </div>

      <div class="ml-auto my-auto">
        <a
          href="/shipping/shipping-create/id={shipping.id}"
          on:click={() => onEditClick({ shippingID: shipping.id })}
          ><i class="lnr-pencil btn-icon-wrapper" /></a
        >
      </div>
    </div>

    <!-- Start Date & B/L & Company name -->
    <div class="d-flex mt-3">
      <img
        src="/src/assets/images/big.svg"
        alt="big"
        style="width:17px; height: 17px;"
      />
      <div class="ml-2">
        {shipping.departure_date ? shipping.departure_date : "-"}
      </div>
      <img
        src="/src/assets/images/document.svg"
        class="ml-5"
        alt="document"
        style="width:15px; height: 17px;"
      />
      <div class="ml-2">
        {shipping.main_bl ? shipping.main_bl : "-"}
      </div>
      <img
        src="/src/assets/images/abc.svg"
        class="ml-5"
        alt="company"
        style="width:17px; height: 17px;"
      />
      <div class="ml-2">
        {shipping.main_charterer ? shipping.main_charterer.company : "-"}
      </div>
    </div>

    <div class="ml-4">
      <!-- Start Date & B/L & Company name -->
      <ShippingCardArea {shipping} />
    </div>
  </Card>
  <div class="mt-3" />
{/each}

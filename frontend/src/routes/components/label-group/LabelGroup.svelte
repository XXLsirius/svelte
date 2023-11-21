<script>
  /**
   * @type {any}
   */
  export let leftLabel = "S-Number";
  export let rightLabel = "Ship name";
  export let hasLink = "false";
  export let isOrange = "false";
  export let fontSize = "16px";
  /**
   * @type {any}
   */
  export let onLinkClick;
  export let linkTo = "/";
</script>

<div class="d-flex">
  <div
    class="label left-label w-50 {isOrange == 'false'
      ? 'left-label-blue'
      : 'left-label-orange'}"
    style="font-size: {fontSize};"
    title={leftLabel}
  >
    {#if hasLink == "true"}
      <a href={linkTo} on:click={onLinkClick}>{leftLabel}</a>
    {:else}
      {leftLabel}
    {/if}
  </div>
  <div
    class="label right-label w-50"
    style="font-size: {fontSize};"
    title={rightLabel}
  >
    {rightLabel}
  </div>
</div>

<style>
  .left-label {
    border-top-left-radius: 5px;
    border-bottom-left-radius: 5px;
    padding: 5px 20px;
  }

  .right-label {
    border-top-right-radius: 5px;
    border-bottom-right-radius: 5px;
    background-color: rgba(127, 127, 127, 1);
    padding: 5px 20px;
    color: white;
  }

  .left-label-blue {
    background-color: rgba(129, 211, 248, 1);
  }

  .left-label-orange {
    background-color: rgba(245, 154, 35, 1);
  }
</style>

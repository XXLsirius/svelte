<script>
  export let checked = false;
  export let title = "Check Box";
  export let value = "";
</script>

<div class="position-relative form-group">
  <label class="form-check-label">
    <input type="checkbox" class="form-check-input" bind:checked />
    {title}
  </label>
  <input
    data-testid="datepicker"
    type="date"
    class="form-control"
    bind:value
    disabled={!checked}
  />
</div>

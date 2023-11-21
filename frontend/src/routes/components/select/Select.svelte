<script>
  export let data;
  export let valueKey;
  export let titleKey;
  export let value;
  export let placeholder = "";
  export let required = false;
  export let id = null;
</script>

<select
  data-testid="form-select"
  class="form-control"
  bind:value
  {required}
  {id}
>
  {#if placeholder && placeholder !== ""}
    <option value="" disabled>{placeholder}</option>
  {/if}
  {#each data as item, i (i)}
    {#if i}
      <option value={item[valueKey]}>{item[titleKey]}</option>
    {:else}
      <option value={item[valueKey]} selected>{item[titleKey]}</option>
    {/if}
  {/each}
</select>

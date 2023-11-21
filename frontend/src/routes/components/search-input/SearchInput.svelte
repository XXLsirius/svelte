<script>
  export let data = [""];
  export let value = "";
  export let id = "";

  $: filteredData = data.filter((fruit) =>
    fruit?.toLowerCase().includes(value.toLowerCase())
  );

  $: recommendVisible = false;
</script>

<div class="position-relative">
  <input
    {id}
    class="form-control"
    bind:value
    on:input={() => {
      recommendVisible = true;
    }}
  />

  {#if recommendVisible && value}
    {#if filteredData.length}
      <div class="search-recommends form-control">
        {#each filteredData as fruit}
          <a
            href={undefined}
            on:click={() => {
              value = fruit;
              recommendVisible = false;
            }}
          >
            <div>{fruit}</div>
          </a>
        {/each}
      </div>
    {:else}
      <div class="search-recommends form-control">
        <div>Nothing found</div>
      </div>
    {/if}
  {/if}
</div>

<style>
  .search-recommends {
    background: white;
    height: max-content;
    position: absolute;
    margin-top: 3px;
    z-index: 999;
  }
</style>

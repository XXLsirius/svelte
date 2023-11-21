<script>
  export let unloads;
</script>

{#if typeof unloads !== "undefined" && unloads.length != 0}
  {#each unloads as unload, i}
    <div class={i === 0 ? "pt-3" : ""}>
      <div class="d-flex">
        <img
          src="/src/assets/images/unload.svg"
          style="width: 24px; height: 24px; margin-top: 8px;	margin-left: 8px"
          alt="LoadImage"
        />
        <div class="ml-2 my-auto font-weight-bold fsize-2">Unload</div>
      </div>

      <div class="ml-3">
        <div class="ml-4 pb-3">
          <div class="pt-1">
            Port: {unload.unload_port ? unload.unload_port : "-"}
          </div>
          <div>
            {#if unload.unload_arrived_date}
              Arrived: {unload.unload_arrived_date}
              {unload.unload_arrived_time}
            {:else}
              Arrived: -
            {/if}
          </div>
          <div>
            Weight: {unload.unload_weight ? unload.unload_weight : "0"} (t)
          </div>
          <div>
            {#if unload.unload_to_date && unload.unload_from_date}
              Period: {unload.unload_from_date}
              {unload.unload_from_time ? unload.unload_from_time : ""} ~ {unload.unload_to_date}
              {unload.unload_to_time ? unload.unload_to_time : ""}
            {:else if unload.unload_from_date}
              Period: {unload.unload_from_date}
              {unload.unload_from_time ? unload.unload_from_time : ""} ~ -
            {:else}
              Period: -
            {/if}
          </div>
          <div class="mt-3">
            {unload.unload_note ? unload.unload_note : ""}
          </div>
        </div>
      </div>
    </div>
  {/each}
{/if}

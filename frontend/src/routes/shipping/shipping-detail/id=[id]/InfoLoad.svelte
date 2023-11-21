<script>
  export let loads;
</script>

{#if typeof loads !== "undefined" && loads.length != 0}
  {#each loads as load, i}
    <div class={i === 0 ? "pt-3" : ""}>
      <div class="d-flex">
        <img
          src="/src/assets/images/kubernetes.svg"
          style="width: 24px; height: 24px; margin-top: 8px;	margin-left: 8px"
          alt="LoadImage"
        />
        <div class="ml-2 my-auto font-weight-bold fsize-2">Load</div>
      </div>

      <div class="ml-3">
        <div class="ml-4 pb-3">
          <div class="pt-1">
            Port: {load.load_port ? load.load_port : "-"}
          </div>
          <div>
            {#if load.load_arrived_date}
              Arrived: {load.load_arrived_date}
              {load.load_arrived_time}
            {:else}
              Arrived: -
            {/if}
          </div>
          <div>
            Weight: {load.load_weight ? load.load_weight : "0"} (t)
          </div>
          <div>
            {#if load.load_to_date && load.load_from_date}
              Period: {load.load_from_date}
              {load.load_from_time ? load.load_from_time : ""} ~ {load.load_to_date}
              {load.load_to_time ? load.load_to_time : ""}
            {:else if load.load_from_date}
              Period: {load.load_from_date}
              {load.load_from_time ? load.load_from_time : ""} ~ -
            {:else}
              Period: -
            {/if}
          </div>
          <div class="mt-3">
            {load.load_note ? load.load_note : ""}
          </div>
        </div>
      </div>
    </div>
  {/each}
{/if}

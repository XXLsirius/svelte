<script>
  export let hasHeader = "true";
  export let title = "Example Card Title";
  export let hasPlus = "false";
  export let plusTarget = "#example-card";
  export let onPlusClick = null;
</script>

<div class="main-card card">
  <div class="card-body">
    {#if hasHeader == "true"}
      <div class="d-flex">
        <div class="card-title">{title}</div>
        {#if hasPlus == "true"}
          <div class="ml-3 d-flex plus-action">
            <a
              href="/"
              data-toggle="modal"
              data-target={plusTarget}
              on:click={(e) => {
                e.preventDefault();
                onPlusClick();
              }}
            >
              <i class="fa fa-fw fa-lg"></i>
            </a>
          </div>
        {/if}
      </div>
    {/if}

    <slot />
  </div>
</div>

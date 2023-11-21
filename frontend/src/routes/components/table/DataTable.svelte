<script>
  export let data;
  export let hasPagination = true;
  let pagination = {
    perPage: "10",
    page: 1,
    startPage: 1,
    totalPage: 0,
  };

  function goToPage(page) {
    switch (page) {
      case "prev":
        if (pagination.page > 1) {
          pagination.page--;
        }

        pagination.startPage = Math.min(pagination.startPage, pagination.page);
        break;

      case "next":
        if (pagination.page < pagination.totalPage) {
          pagination.page++;
        }

        pagination.startPage = Math.max(
          pagination.startPage,
          pagination.page - 4
        );
        break;

      default:
        pagination.page = page;
        break;
    }
  }

  $: pagination.totalPage = Math.ceil(data.length / pagination.perPage);
</script>

<div class="dataTables_wrapper">
  {#if hasPagination}
    <div class="row">
      <div class="col-sm-12 col-md-6">
        <div class="dataTables_length">
          <label>
            Show
            <select
              bind:value={pagination.perPage}
              class="custom-select custom-select-sm form-control form-control-sm"
            >
              <option value="10" selected>10</option>
              <option value="25">25</option>
              <option value="50">50</option>
              <option value="100">100</option>
            </select>
            entries
          </label>
        </div>
      </div>
      <!-- <div class="col-sm-12 col-md-6">
      <div class="dataTables_filter">
        <label>
          Search:
          <input type="search" class="form-control form-control-sm" />
        </label>
      </div>
    </div> -->
    </div>
  {/if}

  <div class="row">
    <div class="col-sm-12">
      <table class="table table-hover table-striped table-bordered">
        <thead>
          <slot name="header" />
        </thead>
        <tbody>
          {#each hasPagination ? data.slice((pagination.page - 1) * pagination.perPage, pagination.page * pagination.perPage) : data as item, i (i)}
            <slot
              name="body"
              {item}
              i={(pagination.page - 1) * pagination.perPage + i}
            />
          {/each}
        </tbody>
      </table>
    </div>
  </div>

  {#if hasPagination}
    <div class="row">
      <div class="col-sm-12 col-md-5">
        <div class="dataTables_info">
          Showing {(pagination.page - 1) * pagination.perPage + 1} to {Math.min(
            pagination.page * pagination.perPage,
            data.length
          )} of {data.length} entries
        </div>
      </div>
      <div class="col-sm-12 col-md-7">
        <div class="dataTables_paginate paging_simple_numbers">
          <ul class="pagination">
            <li
              class="paginate_button page-item previous disabled"
              class:disabled={pagination.page == 1}
            >
              <a
                href={undefined}
                tabindex="0"
                class="page-link"
                on:click={() => goToPage("prev")}>Prev</a
              >
            </li>
            {#each [0, 1, 2, 3, 4] as idx}
              {#if pagination.startPage + idx <= pagination.totalPage}
                <li
                  class="paginate_button page-item"
                  class:active={pagination.page == pagination.startPage + idx}
                >
                  <a
                    href={undefined}
                    tabindex="0"
                    class="page-link"
                    on:click={() => goToPage(pagination.startPage + idx)}
                    >{pagination.startPage + idx}</a
                  >
                </li>
              {/if}
            {/each}
            <li
              class="paginate_button page-item next"
              class:disabled={pagination.page == pagination.totalPage}
            >
              <a
                href={undefined}
                tabindex="0"
                class="page-link"
                on:click={() => goToPage("next")}>Next</a
              >
            </li>
          </ul>
        </div>
      </div>
    </div>
  {/if}
</div>

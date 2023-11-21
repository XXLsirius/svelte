<script>
  import LinearProgress from "@smui/linear-progress";
  export let data;
  export let hasPagination = true;
  export let pagination = {
    perPage: "10",
    page: 1,
    startPage: 1,
    totalPage: 0,
    totalCount: 0,
  };
  export let initTable = () => {};
  export let isLoading = true;

  function goToPage(page) {
    let savedPagination = { ...pagination };

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
        let rightPage = page;
        if (!isNaN(pagination.totalPage)) {
          rightPage = Math.min(page, pagination.totalPage);
        }
        rightPage = Math.max(1, rightPage);
        pagination.page = rightPage;
        break;
    }

    if (savedPagination.page != pagination.page) {
      initTable();
    }
  }

  $: (pagination.totalPage = Math.ceil(
    pagination.totalCount / pagination.perPage
  )),
    goToPage(pagination.page);
</script>

<div class="dataTables_wrapper">
  {#if hasPagination}
    <div class="dataTables_length row m-0">
      <label>
        Show
        <select
          bind:value={pagination.perPage}
          on:change={initTable}
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
  {/if}
  <div class="circle-container">
    <LinearProgress indeterminate closed={!isLoading} progress={0} />
  </div>
  <div class="row overflow-auto">
    <div class="col-sm-12">
      <table class="table table-hover table-striped table-bordered">
        <thead>
          <slot name="header" />
        </thead>
        <tbody>
          {#each data as item, i (i)}
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
    <div class="d-flex">
      <div class="w-100 dataTables_info">
        Showing {(pagination.page - 1) * pagination.perPage + 1} to {Math.min(
          pagination.page * pagination.perPage,
          pagination.totalCount
        )} of {pagination.totalCount} entries
      </div>
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
  {/if}
</div>

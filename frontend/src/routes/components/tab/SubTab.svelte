<script>
  /**
   * @type {any}
   */
  export let subTabAttrs = [
    {
      tabName: "Area1",
      tabHref: "subtab-content-area1",
    },
  ];

  export let hasPlus = "false";
  export let onPlusClick = () => {};
  export let currentItem = null;
  export let isNewArea = false;
  export let navTab = "";

  function onDeleteClick(i) {
    if (currentItem) {
      let areas = [];
      if (navTab === "departure") {
        areas = currentItem.departure_areas;
        areas.splice(i, 1);

        currentItem.departure_areas = areas;
      } else if (navTab === "navigation") {
        areas = currentItem.navigation_areas;
        areas.splice(i, 1);

        currentItem.navigation_areas = areas;
      } else if (navTab === "arrived") {
        areas = currentItem.arrived_areas;
        areas.splice(i, 1);
        currentItem.arrived_areas = areas;
      }
    }
  }
</script>

<ul class="nav nav-tabs">
  {#each subTabAttrs as tab, i}
    <li class="nav-item">
      <a
        aria-label="newAreaSubTab"
        data-toggle="tab"
        href="#{tab.tabHref}"
        id="#{tab.tabHref}"
        class="nav-link {isNewArea && i === subTabAttrs.length - 1
          ? 'active'
          : !i && !isNewArea
          ? 'active'
          : ''}"
      >
        {tab.tabName}
        {#if navTab !== ""}
          <a
            href="/"
            on:click={(e) => {
              e.preventDefault();
              onDeleteClick(i);
            }}
          >
            <img
              class="line-tab-remove"
              src="/src/assets/images/btn_delete.svg"
              alt="Area Delete"
            />
          </a>
        {/if}
      </a>
    </li>
  {/each}
  {#if hasPlus == "true"}
    <div class="d-flex plus-action ml-auto">
      <a
        aria-label="shippingSubTab"
        href="/"
        class="area-plus"
        on:click={(e) => {
          e.preventDefault();
          onPlusClick();
        }}
        style="margin:8px 0px;"
      >
        <i class="fa fa-fw fa-lg"></i>
      </a>
    </div>
  {/if}
</ul>

<div class="tab-content">
  <slot />
</div>

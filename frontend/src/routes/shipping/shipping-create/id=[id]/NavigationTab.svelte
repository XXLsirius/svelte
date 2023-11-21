<script>
  import SubTab from "../../../components/tab/SubTab.svelte";
  import SubTabContent from "../../../components/tab/SubTabContent.svelte";
  import AreaTab from "./AreaTab.svelte";
  import { onMount } from "svelte";

  import WaterAreaModel from "../../../../assets/js/models/WaterAreaModel";

  export let currentItem;

  let areas = [];
  let subTabAttrs = [];
  let isNewArea = false;
  let waterAreas = [];

  $: getTabAttrs(currentItem, false);

  export let onPlusClick = () => {
    currentItem.navigation_areas.push({
      area_id: 1,
      area_in_date: null,
      area_in_time: null,
      area_out_date: null,
      area_out_time: null,
      area_note: "",
      loads: [],
      unloads: [],
    });

    isNewArea = true;
    getTabAttrs(currentItem, true);

    subTabAttrs.forEach((tabAttr, i) => {
      if (i < subTabAttrs.length - 1) {
        let element = document.getElementById("#" + tabAttr.tabHref);
        element.classList.remove("active");
        element = document.getElementById(tabAttr.tabHref);
        element.classList.remove("active");
      }
    });
  };

  function getTabAttrs(item, is_new) {
    subTabAttrs = [];
    areas = item.navigation_areas;

    if (typeof areas === "undefined" || areas == null) {
      return;
    }
    if (areas.length == 0 && is_new == false) {
      return;
    }

    areas.forEach((area, i) => {
      let tmp_tabAttr = {};

      let waterArea = waterAreas.find((a) => a.id === area.area_id);
      if (waterArea && waterArea.name) {
        area.area = waterArea;
      }

      tmp_tabAttr = {
        tabName: typeof area.area === "undefined" ? "New area" : area.area.name,
        tabHref: "navigation-area-" + i,
      };

      subTabAttrs.push(tmp_tabAttr);
    });
  }

  function initWaterAreaTables() {
    WaterAreaModel.getAll({}).then((res) => {
      waterAreas = res;
    });
  }

  onMount(() => {
    initWaterAreaTables();
  });
</script>

<div
  class="form-wizard-content sw-container tab-content"
  style="min-height: 125px;"
>
  <div id="step-1" class="tab-pane step-content" style="display: block;">
    <!-- Navigation datetime & Pass datetime-->
    <SubTab
      {subTabAttrs}
      hasPlus="true"
      {onPlusClick}
      {isNewArea}
      bind:currentItem
      navTab="navigation"
    >
      {#if areas != null && typeof areas !== "undefined" && areas.length != 0}
        {#each subTabAttrs as subTabAttr, i}
          <SubTabContent
            subTabID={subTabAttrs[i].tabHref}
            isActive={isNewArea && i === subTabAttrs.length - 1
              ? "true"
              : !i && !isNewArea
              ? "true"
              : "false"}
          >
            <AreaTab bind:current_area={currentItem.navigation_areas[i]} />
          </SubTabContent>
        {/each}
      {/if}
    </SubTab>
  </div>
</div>

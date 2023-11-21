<script>
  import Select from "../../../components/select/Select.svelte";
  import Load from "./Load.svelte";
  import Unload from "./Unload.svelte";

  import { onMount } from "svelte";

  import WaterAreaModel from "../../../../assets/js/models/WaterAreaModel";

  /**
   * @type {{ area_id: any; area_in_date: any; area_in_time: any; area_out_date: any; area_out_time: any; area_note: any; }}
   */
  export let current_area;

  function onLoadClick() {
    current_area.loads = [
      ...current_area.loads,
      {
        load_arrived_date: null,
        load_arrived_time: null,
        load_from_date: null,
        load_from_time: null,
        load_to_date: null,
        load_to_time: null,
        load_checked: false,
        load_checked_date: null,
        load_weight: 0,
        load_port: "",
        load_note: "",
      },
    ];
  }

  function onUnloadClick() {
    current_area.unloads = [
      ...current_area.unloads,
      {
        unload_arrived_date: null,
        unload_arrived_time: null,
        unload_from_date: null,
        unload_from_time: null,
        unload_to_date: null,
        unload_to_time: null,
        unload_weight: 0,
        unload_port: "",
        unload_note: "",
      },
    ];
  }

  /**
   * @type {never[]}
   */
  let waterAreas = [];

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
  <div class="tab-pane step-content" style="display: block;">
    <!-- Area Main Contents -->
    <div>
      <!-- [Area Name] & [+Load], [+Unload] -->
      <div class="row">
        <!-- [Area Name] -->
        <div class="col-md-6">
          <div class="position-relative form-group">
            <label for="area-name">Area Name</label>
            <Select
              data={waterAreas}
              valueKey="id"
              titleKey="name"
              placeholder="Please select an area"
              bind:value={current_area.area_id}
            />
          </div>
        </div>
        <!-- [+Load], [+Unload] -->
        <div class="col-md-6">
          <div class="position-relative form-group">
            <label for="load-unload">&nbsp;</label>
            <div class="form-row">
              <div class="col-md-6">
                <button
                  type="button"
                  class="mb-2 mr-2 btn-transition btn btn-outline-primary w-100"
                  on:click={onLoadClick}>+Load</button
                >
              </div>
              <div class="col-md-6">
                <button
                  type="button"
                  class="mb-2 mr-2 btn-transition btn btn-outline-primary w-100"
                  on:click={onUnloadClick}>+Unload</button
                >
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- Area In & Out datetime -->
      <div class="row">
        <!-- Area In date & time -->
        <div class="col-md-6">
          <div class="position-relative form-group">
            <label for="area-in-datetime">In</label>
            <div class="form-row">
              <div class="col-md-6">
                <input
                  type="date"
                  class="form-control"
                  bind:value={current_area.area_in_date}
                />
              </div>
              <div class="col-md-6">
                <input
                  type="time"
                  class="form-control"
                  bind:value={current_area.area_in_time}
                />
              </div>
            </div>
          </div>
        </div>
        <!-- Area Out date & time -->
        <div class="col-md-6">
          <div class="position-relative form-group">
            <label for="area-out-datetime">Out</label>
            <div class="form-row">
              <div class="col-md-6">
                <input
                  type="date"
                  class="form-control"
                  bind:value={current_area.area_out_date}
                />
              </div>
              <div class="col-md-6">
                <input
                  type="time"
                  class="form-control"
                  bind:value={current_area.area_out_time}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- Area Note -->
      <div class="position-relative form-group">
        <label for="area-note">Note</label>
        <textarea
          cols="10"
          class="form-control"
          bind:value={current_area.area_note}
        />
      </div>
    </div>

    <!-- Loads -->
    {#if typeof current_area.loads !== "undefined" && current_area.length != 0}
      {#each current_area.loads as current_load}
        <Load bind:current_load />
      {/each}
    {/if}

    <!-- Loads -->
    {#if typeof current_area.unloads !== "undefined" && current_area.length != 0}
      {#each current_area.unloads as current_unload}
        <Unload bind:current_unload />
      {/each}
    {/if}
  </div>
</div>

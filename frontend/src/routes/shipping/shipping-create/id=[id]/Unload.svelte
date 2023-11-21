<script>
  import CheckBoxAndInput from "../../../components/checkbox-and-input/CheckBoxAndInput.svelte";
  export let current_unload;
</script>

<div>
  <!-- [Unload] Title -->
  <div class="row mt-4 mb-3">
    <div class="col-md-6 d-flex">
      <div
        style="border-width:0px; width:4px; height:21px; background-color:rgba(2, 167, 240, 1); border-radius:2px;"
      />
      <p
        style="margin-left:5px; margin-block-start:0px; margin-block-end:0px; font-weight:bold;"
      >
        Unload
      </p>
    </div>
  </div>

  <!-- [Port] & [Arrived] datetime -->
  <div class="row">
    <!-- [Port] -->
    <div class="col-md-6">
      <div class="position-relative form-group">
        <label for="unload-port">Port</label>
        <input
          type="text"
          class="form-control"
          bind:value={current_unload.unload_port}
        />
      </div>
    </div>
    <!-- [Arrived] datetime -->
    <div class="col-md-6">
      <div class="position-relative form-group">
        <label for="unload-arrived-datetime">Arrived</label>
        <div class="form-row">
          <div class="col-md-6">
            <input
              type="date"
              class="form-control"
              bind:value={current_unload.unload_arrived_date}
            />
          </div>
          <div class="col-md-6">
            <input
              type="time"
              class="form-control"
              bind:value={current_unload.unload_arrived_time}
            />
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- [Weight] & [Check] date -->
  <div class="row">
    <!-- [Weight] -->
    <div class="col-md-6">
      <div class="position-relative form-group">
        <label for="unload-weight">Weight</label>
        <div class="form-row">
          <div class="col-md-6">
            <input
              type="text"
              class="form-control"
              bind:value={current_unload.unload_weight}
            />
          </div>
          <div class="col-md-6 my-auto">t</div>
        </div>
      </div>
    </div>
  </div>

  <!-- [Period]-->
  <div class="row">
    <!-- [Period] {from} datetime -->
    <div class="col-md-6">
      <div class="position-relative form-group">
        <label for="unload-from-datetime">Period [From]</label>
        <div class="form-row">
          <div class="col-md-6">
            <input
              type="date"
              class="form-control"
              bind:value={current_unload.unload_from_date}
            />
          </div>
          <div class="col-md-6">
            <input
              type="time"
              class="form-control"
              bind:value={current_unload.unload_from_time}
            />
          </div>
        </div>
      </div>
    </div>
    <!-- [Period] {to} datetime -->
    <div class="col-md-6">
      <div class="position-relative form-group">
        <label for="unload-to-datetime">[to]</label>
        <div class="form-row">
          <div class="col-md-6">
            <input
              type="date"
              class="form-control"
              bind:value={current_unload.unload_to_date}
            />
          </div>
          <div class="col-md-6">
            <input
              type="time"
              class="form-control"
              bind:value={current_unload.unload_to_time}
            />
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- [Note] -->
  <div class="position-relative form-group">
    <label for="unload-note">Note</label>
    <textarea
      cols="10"
      class="form-control"
      bind:value={current_unload.unload_note}
    />
  </div>
</div>

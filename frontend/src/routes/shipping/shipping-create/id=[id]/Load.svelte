<script>
  import CheckBoxAndInput from "../../../components/checkbox-and-input/CheckBoxAndInput.svelte";
  export let current_load;
</script>

<div>
  <!-- [Load] Title -->
  <div class="row mt-4 mb-3">
    <div class="col-md-6 d-flex">
      <div
        style="border-width:0px; width:4px; height:21px; background-color:rgba(2, 167, 240, 1); border-radius:2px;"
      />
      <p
        style="margin-left:5px; margin-block-start:0px; margin-block-end:0px; font-weight:bold;"
      >
        Load
      </p>
    </div>
  </div>

  <!-- [Port] & [Arrived] datetime -->
  <div class="row">
    <!-- [Port] -->
    <div class="col-md-6">
      <div class="position-relative form-group">
        <label for="load-port">Port</label>
        <input
          type="text"
          class="form-control"
          bind:value={current_load.load_port}
        />
      </div>
    </div>
    <!-- [Arrived] datetime -->
    <div class="col-md-6">
      <div class="position-relative form-group">
        <label for="load-arrived-datetime">Arrived</label>
        <div class="form-row">
          <div class="col-md-6">
            <input
              type="date"
              class="form-control"
              bind:value={current_load.load_arrived_date}
            />
          </div>
          <div class="col-md-6">
            <input
              type="time"
              class="form-control"
              bind:value={current_load.load_arrived_time}
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
        <label for="load-weight">Weight</label>
        <div class="form-row">
          <div class="col-md-6">
            <input
              type="text"
              class="form-control"
              bind:value={current_load.load_weight}
            />
          </div>
          <div class="col-md-6 my-auto">t</div>
        </div>
      </div>
    </div>
    <div class="col-md-4">
      <CheckBoxAndInput
        title="Check"
        bind:value={current_load.load_checked_date}
        bind:checked={current_load.load_checked}
      />
    </div>
  </div>

  <!-- [Period]-->
  <div class="row">
    <!-- [Period] {from} datetime -->
    <div class="col-md-6">
      <div class="position-relative form-group">
        <label for="load-from-datetime">Period [From]</label>
        <div class="form-row">
          <div class="col-md-6">
            <input
              type="date"
              class="form-control"
              bind:value={current_load.load_from_date}
            />
          </div>
          <div class="col-md-6">
            <input
              type="time"
              class="form-control"
              bind:value={current_load.load_from_time}
            />
          </div>
        </div>
      </div>
    </div>
    <!-- [Period] {to} datetime -->
    <div class="col-md-6">
      <div class="position-relative form-group">
        <label for="load-to-datetime">[to]</label>
        <div class="form-row">
          <div class="col-md-6">
            <input
              type="date"
              class="form-control"
              bind:value={current_load.load_to_date}
            />
          </div>
          <div class="col-md-6">
            <input
              type="time"
              class="form-control"
              bind:value={current_load.load_to_time}
            />
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- [Note] -->
  <div class="position-relative form-group">
    <label for="load-note">Note</label>
    <textarea
      cols="10"
      class="form-control"
      bind:value={current_load.load_note}
    />
  </div>
</div>

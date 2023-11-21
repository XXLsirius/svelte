<script>
  import Select from "../../../components/select/Select.svelte";
  import { onMount } from "svelte";

  import ModelFuncs from "../../../../assets/js/models/ModelMain";
  import ShipModel from "../../../../assets/js/models/ShipModel";
  import ChartererModel from "../../../../assets/js/models/ChartererModel";

  function downloadFile(url, filename) {
    fetch(url)
      .then((response) => response.blob())
      .then((blob) => {
        const url = window.URL.createObjectURL(new Blob([blob]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", filename);
        document.body.appendChild(link);
        link.click();
        link.remove();
      });
  }

  export let currentItem;
  let fileInput;
  let ships = [];
  let charterers = [];

  function handleFileSelect(event) {
    const files = event.target.files;
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const formData = new FormData();
      formData.append("file", file);

      fetch(`${ModelFuncs.getServerUrl()}/upload`, {
        method: "POST",
        body: formData,
      })
        .then((response) => response.json())
        .then((data) => {
          const attachment = {
            name: file.name,
            path: data.url,
          };

          currentItem.main_attachments = [
            ...currentItem.main_attachments,
            attachment,
          ];
        });
    }
  }

  function deleteAttachment(index) {
    currentItem.main_attachments = currentItem.main_attachments.filter(
      (_, i) => i !== index
    );
  }

  function initTables() {
    ShipModel.getAll({}).then((res) => {
      ships = res;
    });

    ChartererModel.getAll({}).then((res) => {
      charterers = res;
    });
  }

  onMount(() => {
    initTables();
  });
</script>

<div
  class="form-wizard-content sw-container tab-content"
  style="min-height: 125px;"
>
  <div class="tab-pane step-content" style="display: block;">
    <!-- [S-Number] & [Ship] -->
    <div class="form-row">
      <!-- [S-Number] -->
      <div class="col-md-6">
        <div class="position-relative form-group">
          <label for="main-s-number">S-Number</label>
          <input
            id="ship-main-s-number"
            name="ship-main-s-number"
            type="text"
            class="form-control"
            bind:value={currentItem.main_snumber}
            required
          />
        </div>
      </div>
      <!-- [Ship] -->
      <div class="col-md-6">
        <div class="position-relative form-group">
          <label for="main-ship-select">Ship</label>
          <Select
            data={ships}
            valueKey="id"
            titleKey="vesselName"
            bind:value={currentItem.main_ship.id}
            required
          />
        </div>
      </div>
    </div>
    <!-- [Charterer] & [B/L]-->
    <div class="form-row">
      <!-- [Charterer] -->
      <div class="col-md-6">
        <div class="position-relative form-group">
          <label for="main-charterer">Charterer</label>
          <Select
            data={charterers}
            valueKey="id"
            titleKey="company"
            bind:value={currentItem.main_charterer.id}
            required
          />
        </div>
      </div>
      <!-- [B/L] -->
      <div class="col-md-6">
        <div class="position-relative form-group">
          <label for="main-bl">B/L</label>
          <input
            id="main_bl"
            type="text"
            class="form-control"
            bind:value={currentItem.main_bl}
          />
        </div>
      </div>
    </div>
    <!-- [Load/Unload Port] & [Cargo] & currentItem.main_attachments -->
    <div class="form-row">
      <!-- [Load/Unload Port] & [Cargo] -->
      <div class="col-md-6">
        <div class="position-relative form-group">
          <!-- [Load/Unload Port] -->
          <div class="position-relative form-group">
            <label for="load-unload-port">Load/Unload Port</label>
            <input
              id="load-unload-port"
              type="text"
              class="form-control"
              bind:value={currentItem.main_load_unload_port}
            />
          </div>
          <!-- [Cargo] -->
          <div class="position-relative form-group">
            <label for="cargo">Cargo</label>
            <input
              id="cargo"
              type="text"
              class="form-control"
              bind:value={currentItem.main_cargo}
            />
          </div>
        </div>
      </div>
      <!-- currentItem.main_attachments -->
      <div class="col-md-6">
        <input
          type="file"
          id="file-input"
          style="display: none;"
          bind:this={fileInput}
          on:change={handleFileSelect}
        />
        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
        <img
          src="/src/assets/images/edit_shipping/u417.svg"
          alt="Click to choose a file"
          style="width:16px; height:16px; cursor:pointer;"
          class="mt-n2"
          on:click={() => fileInput.click()}
        />
        {#each currentItem.main_attachments as attachment, index}
          <div class="d-flex mb-1">
            <a
              class="filename"
              href="/"
              on:click={(e) => {
                e.preventDefault();
                downloadFile(
                  `${ModelFuncs.getServerUrl()}/${attachment.path}`,
                  attachment.name
                );
              }}>{attachment.name}</a
            >
            <!-- svelte-ignore a11y-click-events-have-key-events -->
            <!-- svelte-ignore a11y-no-static-element-interactions -->
            <span class="delete-icon" on:click={() => deleteAttachment(index)}
              >X</span
            >
          </div>
        {/each}
      </div>
    </div>
    <!-- [Note] -->
    <div class="position-relative form-group">
      <label for="main-note">Note</label>
      <textarea
        id="main-note"
        cols="10"
        class="form-control"
        bind:value={currentItem.main_note}
      />
    </div>
  </div>
</div>

<style>
  .filename {
    vertical-align: center;
    padding: 8px;
    border-radius: 5px 0px 0px 5px;
    background-color: rgba(215, 215, 215, 1);
    flex-grow: 1;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .delete-icon {
    cursor: pointer;
    font-weight: bold;
    padding: 8px;
    background-color: rgba(215, 215, 215, 1);
    border-radius: 0px 5px 5px 0px;
  }
</style>

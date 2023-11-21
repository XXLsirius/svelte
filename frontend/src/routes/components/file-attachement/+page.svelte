<script>
  let fileInput;
  let attachments = [];

  function handleFileSelect(event) {
    const files = event.target.files;
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const attachment = {
        name: file.name,
        path: URL.createObjectURL(file),
      };

      attachments = [...attachments, attachment];
    }
  }

  function deleteAttachment(index) {
    attachments = attachments.filter((_, i) => i !== index);
  }
</script>

<div>
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
  {#each attachments as attachment, index}
    <div class="d-flex mb-1">
      <span class="filename">{attachment.name}</span>
      <!-- svelte-ignore a11y-click-events-have-key-events -->
      <!-- svelte-ignore a11y-no-static-element-interactions -->
      <span class="delete-icon" on:click={() => deleteAttachment(index)}>X</span
      >
    </div>
  {/each}
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

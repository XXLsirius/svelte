<script>
  import CheckBoxAndInput from "./CheckBoxAndInput.svelte";

  function onPlusClick() {
    alert("Button Clicked!");
  }

  export let value = "";
  export let checked = false;
</script>

<CheckBoxAndInput title="Check Box" bind:value bind:checked />

<div class="mt-3">
  <h5 data-testid="h_check">Checked: {checked}</h5>
  <h5 data-testid="h_value">Value: {checked ? value : ""}</h5>
</div>

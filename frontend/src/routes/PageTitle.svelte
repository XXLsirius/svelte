<script>
  import { onMount } from "svelte";

  export let menus;
  export let icon;
  export let title;
  export let content;

  onMount(() => {
    menus.forEach((menu) => {
      if (
        menu.link &&
        window.location.href.split("/")[3] == menu.link.slice(1)
      ) {
        icon = menu.icon;
        title = menu.title;
        content = menu.content;
      }
    });
  });
</script>

<div class="app-page-title">
  <div class="page-title-wrapper">
    <div class="page-title-heading">
      <div class="page-title-icon">
        <i class="pe-7s-{icon} icon-gradient bg-premium-dark" />
      </div>
      <div>
        {title}
        <div class="page-title-subheading">{content}</div>
      </div>
    </div>
  </div>
</div>

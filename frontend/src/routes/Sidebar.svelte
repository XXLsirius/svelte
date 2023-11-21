<script>
  export let menus;
  export let onClickMenu;
</script>

<div class="app-sidebar sidebar-shadow bg-dark sidebar-text-light">
  <div class="app-header__logo">
    <div class="logo-src" />
    <div class="header__pane ml-auto">
      <div>
        <button
          type="button"
          class="hamburger close-sidebar-btn hamburger--elastic"
          data-class="closed-sidebar"
        >
          <span class="hamburger-box">
            <span class="hamburger-inner" />
          </span>
        </button>
      </div>
    </div>
  </div>
  <div class="app-header__mobile-menu">
    <div>
      <button
        type="button"
        class="hamburger hamburger--elastic mobile-toggle-nav"
      >
        <span class="hamburger-box">
          <span class="hamburger-inner" />
        </span>
      </button>
    </div>
  </div>
  <div class="app-header__menu">
    <span>
      <button
        type="button"
        class="btn-icon btn-icon-only btn btn-primary btn-sm mobile-toggle-header-nav"
      >
        <span class="btn-icon-wrapper">
          <i class="fa fa-ellipsis-v fa-w-6" />
        </span>
      </button>
    </span>
  </div>
  <div class="scrollbar-sidebar ps">
    <div class="app-sidebar__inner">
      <ul class="vertical-nav-menu metismenu">
        {#each menus as menu, i}
          {#if menu.type == "heading"}
            <li class="app-sidebar__heading">{menu.title}</li>
          {:else}
            <li>
              <a href={menu.link} on:click={() => onClickMenu(i)}>
                <i class="metismenu-icon pe-7s-{menu.icon}" />{menu.title}
              </a>
            </li>
          {/if}
        {/each}
      </ul>
    </div>
  </div>
</div>

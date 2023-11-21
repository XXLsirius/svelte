<script>
  let menus = [
    { title: "Select", link: "/components/select" },
    { title: "Tab", link: "/components/tab" },
    { title: "Card", link: "/components/card" },
    { title: "Modal", link: "/components/modal" },
    { title: "Table", link: "/components/table" },
    { title: "Label Group", link: "/components/label-group" },
    { title: "CheckBox and Input", link: "/components/checkbox-and-input" },
    { title: "Carousel", link: "/components/carousel" },
    { title: "FileAttach", link: "/components/file-attachement" },
    { title: "SearchInput", link: "/components/search-input" },
  ];
</script>

<ul class="vertical-nav-menu metismenu">
  <li class="app-sidebar__heading">Components</li>
  {#each menus as menu}
    <li>
      <a href={menu.link}>
        <i class="metismenu-icon pe-7s-plugin" />{menu.title}
      </a>
    </li>
  {/each}
</ul>

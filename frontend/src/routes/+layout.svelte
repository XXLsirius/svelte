<script>
  import Sidebar from "./Sidebar.svelte";
  import PageTitle from "./PageTitle.svelte";

  import { onMount } from "svelte";
  import { goto } from "$app/navigation";
  import { userData, isLogin } from "./stores";

  // Modals
  import ExampleModal from "./modals/ExampleModal.svelte";
  import DeleteConfirmModal from "./modals/DeleteConfirmModal.svelte";
  import TocShipModal from "./modals/ToCShipModal.svelte";
  import TocPersonalModal from "./modals/ToCPersonalModal.svelte";
  import CertShipModal from "./modals/CertShipModal.svelte";
  import CertPersonalModal from "./modals/CertPersonalModal.svelte";
  import WaterAreaModal from "./modals/WaterAreaModal.svelte";
  import ChartererModal from "./modals/ChartererModal.svelte";
  import apm from "../rum";
  import { page } from "$app/stores";
  import ModelFuncs from "../assets/js/models/ModelMain";
  $: url = $page.url;
  let menus = [
    { type: "heading", title: "Dashboard" },
    {
      type: "menu",
      title: "Dashboard",
      link: "/",
      icon: "helm",
      content:
        "This is Dashboard Page. You can do see the contents of dashboard here.",
    },
    { type: "heading", title: "Shipping" },
    {
      type: "menu",
      title: "Shippings",
      link: "/shipping",
      icon: "anchor",
      content:
        "This is Shippings Page. You can do something about shippings here.",
    },
    {
      type: "menu",
      title: "Water Areas",
      link: "/waterareas",
      icon: "target",
      content:
        "This is Water Areas Page. You can do something about water areas here.",
    },
    {
      type: "menu",
      title: "Charterers",
      link: "/charterers",
      icon: "id",
      content:
        "This is Charterers Page. You can do something about charterers here.",
    },
    {
      type: "menu",
      title: "Certificates",
      link: "/certificates",
      icon: "credit",
      content:
        "This is Certificates Page. You can do something about certificates here.",
    },
    { type: "heading", title: "Setting" },
    {
      type: "menu",
      title: "Ships",
      link: "/ship",
      icon: "helm",
      content: "This is Ships Page. You can do something about ships here.",
    },
    {
      type: "menu",
      title: "Mariners",
      link: "/mariner",
      icon: "users",
      content:
        "This is Mariners Page. You can do something about mariners here.",
    },
    {
      type: "menu",
      title: "Types of Certificate",
      link: "/typeofcertificate",
      icon: "box1",
      content:
        "This is Types of Certificate Page. You can do something about types of certificate here.",
    },
    {
      type: "menu",
      title: "Components",
      link: "/components",
      icon: "share",
      content:
        "This is Components Page. You can see the components that we've created here.",
    },
  ];

  let currentMenu = 1;
  let username = "";
  let email = "";
  let userInfo = {};

  function onClickMenu(i) {
    currentMenu = i;
  }

  userData.subscribe((item) => {
    if (item && item.username !== "") {
      username = item.username;
    }

    if (item && item.email !== "") {
      email = item.email;
    }
  });

  onMount(() => {
    apm.setInitialPageLoadName("Initial Page");
  });

  async function onLogOut() {
    localStorage.removeItem("jwt");
    userData.set(null);
    isLogin.set(false);
    goto("/sign-in");
  }

  onMount(async () => {
    const jwt = localStorage.getItem("jwt");
    try {
      userInfo = localStorage.getItem("user");
    } catch (e) {
      userInfo = {};
    }

    try {
      const response = await fetch(`${ModelFuncs.getServerUrl()}/checkUser`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });
      if (response.ok) {
        const data = await response.json(); // Extract the JSON data from the response
        if (data?.status) {
          isLogin.set(false);
          goto("/sign-in");
        } else {
          userData.set(data);
          isLogin.set(true);
        }
      } else {
        goto("/sign-in");
        // Handle non-200 status codes
        console.error("Failed to fetch data:", response.status);
      }
    } catch (error) {
      // Handle fetch errors
      goto("/sign-in");
      console.error("Fetch error:", error);
    }
  });
</script>

{#if $isLogin}
  <div
    class="app-container app-theme-white body-tabs-shadow fixed-header fixed-sidebar"
  >
    <div class="app-header header-shadow bg-dark header-text-light">
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
      <div class="app-header__content">
        <div class="app-header-left">
          <div class="search-wrapper">
            <div class="input-holder">
              <input
                type="text"
                class="search-input"
                placeholder="Type to search"
              />
              <button class="search-icon"><span /></button>
            </div>
            <button class="close" />
          </div>
        </div>
        <div class="app-header-right">
          <div class="header-dots">
            <div class="dropdown">
              <button
                type="button"
                aria-haspopup="true"
                aria-expanded="false"
                data-toggle="dropdown"
                class="p-0 mr-2 btn btn-link"
              >
                <span class="icon-wrapper icon-wrapper-alt rounded-circle">
                  <span class="icon-wrapper-bg bg-danger" />
                  <i
                    class="icon text-danger icon-anim-pulse ion-android-notifications"
                  />
                  <span class="badge badge-dot badge-dot-sm badge-danger"
                    >Notifications</span
                  >
                </span>
              </button>
            </div>
          </div>
          <div class="header-btn-lg pr-0">
            <div class="widget-content p-0">
              <div class="widget-content-wrapper">
                <div class="widget-content-left">
                  <div class="btn-group">
                    <a
                      href={undefined}
                      data-toggle="dropdown"
                      aria-haspopup="true"
                      aria-expanded="false"
                      class="p-0 btn"
                    >
                      <img
                        width="42"
                        class="rounded-circle"
                        src="/src/assets/images/avatars/1.jpg"
                        alt=""
                      />
                      <i class="fa fa-angle-down ml-2 opacity-8" />
                    </a>
                    <div
                      tabindex="-1"
                      role="menu"
                      aria-hidden="true"
                      class="rm-pointers dropdown-menu-lg dropdown-menu dropdown-menu-right"
                      style="position: absolute; transform: translate3d(-291px, 50px, 0px); top: 0px; left: 0px; will-change: transform;"
                    >
                      <div
                        class="dropdown-menu-header"
                        style="margin-bottom:-0.65rem;"
                      >
                        <div class="dropdown-menu-header-inner bg-info">
                          <div class="menu-header-image opacity-2" />
                          <div class="menu-header-content text-left">
                            <div class="widget-content p-0">
                              <div class="widget-content-wrapper">
                                <div class="widget-content-left mr-3">
                                  <img
                                    width="42"
                                    class="rounded-circle"
                                    src="/src/assets/images/avatars/1.jpg"
                                    alt=""
                                  />
                                </div>
                                <div class="widget-content-left">
                                  <div class="widget-heading">
                                    {userInfo && userInfo ? userInfo : ""}
                                  </div>
                                  <div class="widget-subheading opacity-8">
                                    {userInfo && userInfo.email
                                      ? userInfo.email
                                      : "user1@gmail.com"}
                                  </div>
                                </div>
                                <div class="widget-content-right mr-2">
                                  <button
                                    class="btn-pill btn-shadow btn-shine btn btn-focus"
                                    on:click={onLogOut}>Logout</button
                                  >
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="widget-content-left ml-3 header-user-info">
                  <div class="widget-heading">Team</div>
                  <div class="widget-subheading">Svelte Som</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="app-main">
      <Sidebar {menus} {onClickMenu} />

      <div class="app-main__outer">
        <div class="app-main__inner">
          <PageTitle
            {menus}
            icon={menus[currentMenu].icon}
            title={menus[currentMenu].title}
            content={menus[currentMenu].content}
          />

          <slot />
        </div>
        <div class="app-wrapper-footer">
          <div class="app-footer">
            <div class="app-footer__inner" />
          </div>
        </div>
      </div>
    </div>

    <!-- Modals -->
    <ExampleModal />
    <DeleteConfirmModal />
    <TocShipModal />
    <TocPersonalModal />
    <CertShipModal />
    <CertPersonalModal />
    <WaterAreaModal />
    <ChartererModal />
  </div>
{:else if url.pathname == "/sign-in" || url.pathname == "/sign-up"}
  <slot />
{:else}{/if}

<script>
  import MainTab from "../../../components/tab/MainTab.svelte";
  import TabContent from "../../../components/tab/TabContent.svelte";
  import Card from "../../../components/card/Card.svelte";
  import LabelGroup from "../../../components/label-group/LabelGroup.svelte";

  import ArrivedTab from "./ArrivedTab.svelte";
  import CostTab from "./CostTab.svelte";
  import DepartureTab from "./DepartureTab.svelte";
  import FuelTab from "./FuelTab.svelte";
  import NavigationTab from "./NavigationTab.svelte";
  import ShippingMainTab from "./MainTab.svelte";

  import { currentItemStore, forRefreshStore } from "../../../stores";
  import { goto } from "$app/navigation";
  import { page } from "$app/stores";
  import toast, { Toaster } from "svelte-french-toast";

  import ShippingModel from "../../../../assets/js/models/ShippingModel";

  let mariners = [];
  let currentItem = {
    main_snumber: "",
    main_ship: {
      id: "",
    },
    main_charterer: {
      id: "",
    },
    main_bl: "",
    main_attachments: [],
    main_load_unload_port: "",
    main_cargo: "",
    main_note: "",

    departure_date: null,
    departure_time: null,
    departure_pass_date: null,
    departure_pass_time: null,
    departure_areas: [],

    navigation_areas: [],

    arrived_date: null,
    arrived_time: null,
    arrived_pass_date: null,
    arrived_pass_time: null,
    arrived_areas: [],

    cost_shipping_fee: "",
    cost_deposit: "",
    cost_daily_wages: "",
    cost_additional_fee: "",

    cost_crews: [],
    cost_crew_note: "",

    cost_others: [],
    cost_other_note: "",

    fuel_ibd: "",
    fuel_af: "",
    fuel_cbd: "",
    fuel_iwa: "",
    fuel_note: "",
  };

  let tabAttrs = [
    {
      tabName: "Main",
      tabHref: "tab-content-main",
    },
    {
      tabName: "Departure",
      tabHref: "tab-content-departure",
    },
    {
      tabName: "Navigation",
      tabHref: "tab-content-navigation",
    },
    {
      tabName: "Arrived",
      tabHref: "tab-content-arrived",
    },
    {
      tabName: "Cost",
      tabHref: "tab-content-cost",
    },
    {
      tabName: "Fuel",
      tabHref: "tab-content-fuel",
    },
  ];

  if ($page.params.id != "0" && $page.params.id != "undefined") {
    ShippingModel.getAll({ filter: { id: $page.params.id } }).then((items) => {
      currentItem = items[0];
    });
  }

  function onSaveClick() {
    if (mariners) {
      currentItem.cost_crews = [];

      mariners.forEach((row) => {
        let tmp_cost_crew = {
          id: null,
          mariner_daily_fee: 0,
          mariner_days: 0,
        };

        tmp_cost_crew.id = row.id;
        tmp_cost_crew.mariner_daily_fee = row.mariner_daily_fee;
        tmp_cost_crew.mariner_days = row.mariner_days;

        currentItem.cost_crews = [...currentItem.cost_crews, tmp_cost_crew];
      });
    }

    ShippingModel.put({ ...currentItem }).then(() => {
      forRefreshStore.update((n) => n + 1);
      if (currentItem.id == null) {
        toast.success("Successfully Created", {
          position: "top-right",
          theme: {
            "--toastColor": "white",
            "--toastBackground": "green",
            "--toastBarBackground": "darkgreen",
          },
          duration: 2000,
        });
      } else {
        toast.success("Successfully Updated", {
          position: "top-right",
          theme: {
            "--toastColor": "white",
            "--toastBackground": "green",
            "--toastBarBackground": "darkgreen",
          },
          duration: 2000,
        });
      }
    });
  }

  function onFinishClick() {
    currentItemStore.update((item) => ({
      id: 0,
      table: "shipping",
    }));

    goto("/shipping/");
  }
</script>

<Toaster />

<form
  id="shippingform"
  name="shippingform"
  on:submit|preventDefault={(e) => {
    onSaveClick();
  }}
>
  <div>
    <Card title="" hasPlus="false" onPlusClick="">
      <!-- Label Group & Edit Button -->
      <div class="d-flex mt-n3">
        <div class="w-50">
          <LabelGroup
            leftLabel={currentItem.main_snumber
              ? currentItem.main_snumber
              : "-"}
            rightLabel={currentItem.main_ship
              ? currentItem.main_ship.vesselName
              : "-"}
            hasLink="false"
            onLinkClick=""
          />
        </div>

        <div class="ml-auto my-auto">
          <button
            class="mr-2 btn-transition btn btn-outline-warning"
            type="button"
            on:click={(e) => {
              document
                .getElementById("shippingform")
                ?.querySelector(".body-tabs .nav-link:nth-child(1)")
                .click();

              setTimeout(() => {
                document.getElementById("hidden-submit-btn").click();
              }, 300);
            }}>Save</button
          >
          <button type="submit" id="hidden-submit-btn" hidden />
          <button
            type="button"
            class="mr-2 btn btn-warning"
            on:click={onFinishClick}>Finish</button
          >
        </div>
      </div>
    </Card>
  </div>

  <MainTab {tabAttrs}>
    <TabContent tabID={tabAttrs[0].tabHref} isActive="true">
      <div>
        <Card title={tabAttrs[0].tabName}>
          <ShippingMainTab bind:currentItem />
        </Card>
      </div>
    </TabContent>

    <TabContent tabID={tabAttrs[1].tabHref}>
      <div>
        <Card title={tabAttrs[1].tabName}>
          <DepartureTab bind:currentItem />
        </Card>
      </div></TabContent
    >

    <TabContent tabID={tabAttrs[2].tabHref}>
      <div>
        <Card title={tabAttrs[2].tabName}>
          <NavigationTab bind:currentItem />
        </Card>
      </div>
    </TabContent>

    <TabContent tabID={tabAttrs[3].tabHref}>
      <div>
        <Card title={tabAttrs[3].tabName}>
          <ArrivedTab bind:currentItem />
        </Card>
      </div>
    </TabContent>

    <TabContent tabID={tabAttrs[4].tabHref}>
      <div>
        <Card title={tabAttrs[4].tabName}>
          <CostTab bind:currentItem bind:mariners />
        </Card>
      </div>
    </TabContent>

    <TabContent tabID={tabAttrs[5].tabHref}>
      <div>
        <Card title={tabAttrs[5].tabName}>
          <FuelTab bind:currentItem />
        </Card>
      </div>
    </TabContent>
  </MainTab>
</form>

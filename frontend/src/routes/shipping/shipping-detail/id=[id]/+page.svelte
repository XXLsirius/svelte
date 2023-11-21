<script>
  import MainTab from "../../../components/tab/MainTab.svelte";
  import TabContent from "../../../components/tab/TabContent.svelte";
  import Card from "../../../components/card/Card.svelte";
  import LabelGroup from "../../../components/label-group/LabelGroup.svelte";
  import DataTable from "../../../components/table/DataTable.svelte";

  import CostTab from "./CostTab.svelte";
  import FuelTab from "./FuelTab.svelte";
  import NavigationTab from "./NavigationTab.svelte";

  import { goto } from "$app/navigation";
  import { page } from "$app/stores";

  import ShippingModel from "../../../../assets/js/models/ShippingModel";

  let mainTable = [];

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

    cost_shipping_fee: 0,
    cost_deposit: 0,
    cost_daily_wages: 0,
    cost_additional_fee: 0,

    cost_crews: [],
    cost_crew_note: "",

    cost_others: [],
    cost_other_note: "",

    fuel_ibd: 0,
    fuel_af: 0,
    fuel_cbd: 0,
    fuel_iwa: 0,
    fuel_note: "",
  };

  let tabAttrs = [
    {
      tabName: "Navigation",
      tabHref: "tab-content-navigation",
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

  function period_total_days(from, to) {
    // Convert the date strings to Date objects
    let startDate = new Date(from);
    let endDate = new Date(to);

    // Calculate the difference in milliseconds
    let timeDifference = Math.abs(endDate.getTime() - startDate.getTime());
    // Calculate the number of days
    let dayMilliSeconds = 1000 * 60 * 60 * 24;
    let totalDays = Math.floor(timeDifference / dayMilliSeconds);

    return isNaN(totalDays) ? 0 : totalDays;
  }

  if ($page.params.id) {
    ShippingModel.getAll({ filter: { id: $page.params.id } }).then((items) => {
      currentItem = items[0];
    });
  }

  $: getMainTabable(currentItem);

  function getMainTabable(item) {
    mainTable = [
      {
        id: 1,
        item: "BL",
        value: item.main_bl,
      },
      {
        id: 2,
        item: "Charterer",
        value: item.main_bl,
      },
      {
        id: 3,
        item: "Period",
        value: item.departure_date
          ? item.departure_date +
            "~" +
            (item.arrived_pass_date == null ? "-" : item.arrived_pass_date)
          : "",
      },
      {
        id: 4,
        item: "Sailling days",
        value:
          item.arrived_pass_date == null
            ? ""
            : period_total_days(item.departure_date, item.arrived_pass_date),
      },
    ];
  }

  function onEditClick() {
    goto(`/shipping/shipping-create/id=${$page.params.id}`);
  }
</script>

<div>
  <Card title="" hasPlus="false" onPlusClick="">
    <!-- Label Group & Edit Button -->
    <div class="d-flex mt-n3">
      <div class="w-50">
        <LabelGroup
          leftLabel={currentItem.main_snumber ? currentItem.main_snumber : "-"}
          rightLabel={currentItem.main_ship
            ? currentItem.main_ship.vesselName
            : "-"}
          hasLink="false"
          onLinkClick=""
        />
      </div>

      <div class="ml-auto my-auto">
        <button class="mr-2 btn btn-warning" on:click={onEditClick}>Edit</button
        >
      </div>
    </div>
  </Card>
</div>

<div class="row mt-3">
  <div class="col-md-6">
    <Card title="" hasPlus="false" onPlusClick="" hasHeader="false">
      <div class="mt">
        <DataTable bind:data={mainTable} hasPagination={false}>
          <tr slot="header">
            <th>Item</th>
            <th>Value</th>
          </tr>
          <tr slot="body" let:item={row} let:i>
            <td>{row.item ? row.item : ""}</td>
            <td>{row.value ? row.value : ""}</td>
          </tr>
        </DataTable>
      </div>
    </Card>
  </div>
  <div class="col-md-6">
    <div>{currentItem.main_note ? currentItem.main_note : ""}</div>
    <div
      style="background-image: url(/src/assets/images/port.png);	background-size: 101px 73px; background-position: 100% 70%; background-repeat: no-repeat; height: 100%; opacity: 0.3; min-height: 80px;"
    />
  </div>
</div>

<MainTab {tabAttrs}>
  <TabContent tabID={tabAttrs[0].tabHref} isActive="true">
    <Card title={tabAttrs[0].tabName}>
      <NavigationTab bind:currentItem />
    </Card>
  </TabContent>

  <TabContent tabID={tabAttrs[1].tabHref}>
    <Card title={tabAttrs[1].tabName}>
      <CostTab bind:currentItem />
    </Card>
  </TabContent>

  <TabContent tabID={tabAttrs[2].tabHref}>
    <Card title={tabAttrs[2].tabName}>
      <FuelTab bind:currentItem />
    </Card>
  </TabContent>
</MainTab>

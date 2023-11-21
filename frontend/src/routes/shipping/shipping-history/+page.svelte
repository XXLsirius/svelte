<script>
  import Card from "../../components/card/Card.svelte";
  import ShippingModel from "../../../assets/js/models/ShippingModel";
  import DataTable from "../../components/table/Table.svelte";
  import Select from "../../components/select/Select.svelte";
  import ShipModel from "../../../assets/js/models/ShipModel";
  import LabelGroup from "../../components/label-group/LabelGroup.svelte";
  import { onMount } from "svelte";
  import SearchInput from "../../components/search-input/SearchInput.svelte";
  import ChartererModel from "../../../assets/js/models/ChartererModel";

  export let title = "SHIPPING";
  export let formData = [];
  let searchOptions = {
    main_snumber: "",
    main_ship: {
      id: "",
    },
    main_bl: "",
    main_charterer: {
      id: "",
    },
    fromDate: "",
    toDate: "",
  };
  let sNumbers = [];
  let bls = [];
  let charterers = [];
  let ships = [];
  let pagination = {
    perPage: "10",
    page: 1,
    startPage: 1,
    totalPage: 0,
    totalCount: 0,
  };
  let isLoading;

  function initTable() {
    isLoading = true;
    ShippingModel.getAll({
      pagination,
      filter: {
        shipId: searchOptions.main_ship.id,
      },
      includeFilter: {
        company: searchOptions.main_charterer.id,
        main_bl: searchOptions.main_bl,
        main_snumber: searchOptions.main_snumber,
      },
    }).then((res) => {
      isLoading = false;

      formData = res.data;
      pagination.totalCount = res.count;
      let filtered = [];

      res.data.forEach((item) => {
        if (
          searchOptions.fromDate &&
          item.departure_date < searchOptions.fromDate
        ) {
          return;
        }

        if (
          searchOptions.toDate &&
          item.arrived_pass_date > searchOptions.toDate
        ) {
          return;
        }

        filtered.push(item);
      });

      formData = filtered;
    });
  }

  function initSelect() {
    ShipModel.getAll({}).then((res) => {
      ships = [
        {
          id: "",
          vesselName: "All",
        },
        ...res,
      ];
    });

    ShippingModel.getAll({}).then((res) => {
      sNumbers = [...new Set(res.map((item) => item.main_snumber))];
      bls = [...new Set(res.map((item) => item.main_bl))];
      charterers = [
        ...new Set(res.map((item) => item.main_charterer?.company)),
      ];
      charterers = charterers.filter((value) => value !== undefined);
    });
  }

  onMount(() => {
    initSelect();
    initTable();
  });

  function onEditClick({ shippingID }) {}
</script>

<Card {title} hasPlus="false">
  <div class="form-row">
    <div class="col-md-10">
      <div class="form-row">
        <div class="col-md-2">
          <div class="position-relative form-group">
            <label for="input-main_snumber">S-Number</label>
            <SearchInput
              id="main_snumber"
              data={sNumbers}
              bind:value={searchOptions.main_snumber}
            />
          </div>
        </div>
        <div class="col-md-2">
          <div class="position-relative form-group">
            <label for="select-ship">Ship</label>
            <Select
              data={ships}
              valueKey="id"
              titleKey="vesselName"
              bind:value={searchOptions.main_ship.id}
            />
          </div>
        </div>
        <div class="col-md-2">
          <div class="position-relative form-group">
            <label for="input-period-from">Period</label>
            <div class="d-flex">
              <input
                id="input-period-from"
                type="date"
                class="form-control mr-1"
                bind:value={searchOptions.fromDate}
              />
              <span class="my-auto">-</span>
            </div>
          </div>
        </div>

        <div class="col-md-2">
          <div class="position-relative form-group">
            <label for="input-period-to">&nbsp;</label>
            <input
              id="input-period-to"
              type="date"
              class="form-control"
              bind:value={searchOptions.toDate}
            />
          </div>
        </div>

        <div class="col-md-2">
          <div class="position-relative form-group">
            <label for="input-bl">B/L</label>
            <SearchInput
              id="input-bl"
              data={bls}
              bind:value={searchOptions.main_bl}
            />
          </div>
        </div>
        <div class="col-md-2">
          <div class="position-relative form-group">
            <label for="input-charterer">Charterer</label>
            <SearchInput
              id="input-charterer"
              data={charterers}
              bind:value={searchOptions.main_charterer.id}
            />
          </div>
        </div>
      </div>
    </div>
    <div class="col-md-2 d-flex align-items-end">
      <div class="d-flex">
        <button
          type="button"
          class="btn btn-primary mb-3 mr-3"
          style="width: 100px;"
          on:click={initTable}>Search</button
        >
      </div>
    </div>
  </div>
  <DataTable data={formData} {pagination} {initTable} {isLoading}>
    <tr slot="header">
      <th>#</th>
      <th>Shipment</th>
    </tr>
    <tr slot="body" let:item={row} let:i>
      <td>{i + 1}</td>
      <td>
        <div class="w-75">
          <LabelGroup
            leftLabel={row.main_snumber}
            rightLabel={row.main_ship ? row.main_ship.vesselName : ""}
            hasLink="true"
            fontSize="14px;"
            onLinkClick={() =>
              onEditClick({
                shippingID: row.id,
              })}
            linkTo="/shipping/shipping-detail/id={row.id}"
          />
        </div>
        <div class="d-flex mt-3">
          <img
            src="/src/assets/images/circle.svg"
            alt="big"
            style="width:17px; height: 17px;"
          />
          <div class="ml-2">
            {row.departure_date} ~ {row.arrived_pass_date}
          </div>
          <img
            src="/src/assets/images/document.svg"
            class="ml-5"
            alt="document"
            style="width:15px; height: 17px;"
          />
          <div class="ml-2">
            {row.main_bl}
          </div>
          <img
            src="/src/assets/images/abc.svg"
            class="ml-5"
            alt="company"
            style="width:17px; height: 17px;"
          />
          <div class="ml-2">
            {row.main_charterer?.company}
          </div>
        </div>
      </td>
    </tr>
  </DataTable>
</Card>

<script>
  import Card from "../../../components/card/Card.svelte";
  import { currentItemStore, forRefreshStore } from "../../../stores";
  import ShipModel from "../../../../assets/js/models/ShipModel";
  import { goto } from "$app/navigation";
  import DataTable from "../../../components/table/DataTable.svelte";
  import Carousel from "../../../components/carousel/Carousel.svelte";
  import { page } from "$app/stores";

  let currentItem = {
    images: [],
  };

  if ($page.params.id) {
    ShipModel.getAll({ filter: { id: $page.params.id } }).then((items) => {
      currentItem = items[0];
    });
  } else {
    currentItem = {
      images: [],
    };
  }
</script>

<Card hasHeader="false">
  <div class="form-row">
    <div class="col-md-8">
      <div class="card-title">
        {currentItem.vesselName ?? ""}
      </div>
    </div>
    <div class="col-md-4 d-flex align-items-end justify-content-end">
      <button
        type="button"
        class="btn btn-warning mb-3 mr-3"
        style="width: 100px;"
        on:click={() => goto(`/ship/ship-create/id=${currentItem.id}`)}
        >Edit</button
      >
      <a href="/ship"
        ><button
          type="button"
          class="btn-transition btn btn-outline-warning mb-3"
          style="width: 100px;">Back</button
        ></a
      >
    </div>
  </div>

  <h6>
    Registered: <span
      >{currentItem.registered ? currentItem.registered : ""}</span
    >
  </h6>
  <h6>
    Certificate: <span
      >{currentItem.certificates
        ? currentItem.certificates[0]?.issue?.id
        : ""}</span
    >
    (to
    <span
      >{currentItem.certificates
        ? currentItem.certificates[0]?.issue?.expire
        : ""}</span
    >)
  </h6>
  <h6>
    Removed: <span>{currentItem.removed ? currentItem.removed : ""}</span>
  </h6>

  <Carousel bind:images={currentItem.images} editable="false" />
</Card>

<div class="mb-4" />

<Card title="VESSEL PARTICULARS">
  <div class="row">
    <div class="col-6">
      <DataTable
        data={[
          {
            id: 1,
            key: "Ship type",
            value: currentItem.shipType ?? "",
          },
          {
            id: 2,
            key: "Year of Built",
            value: currentItem.yearOfBuild ?? "",
          },
          {
            id: 3,
            key: "Flag",
            value: currentItem.flag ?? "",
          },
          {
            id: 4,
            key: "Homeport",
            value: currentItem.homePort ?? "",
          },
          {
            id: 5,
            key: "Reg. Number",
            value: currentItem.regNumber ?? "",
          },
          {
            id: 6,
            key: "Callsign",
            value: currentItem.callsign ?? "",
          },
          {
            id: 7,
            key: "IMO Number",
            value: currentItem.imoNumber ?? "",
          },
          {
            id: 8,
            key: "Gross Tonnage (t)",
            value: currentItem.grossTonnage ?? "",
          },
          {
            id: 9,
            key: "Net Tonnage (t)",
            value: currentItem.netTonnage ?? "",
          },
          {
            id: 10,
            key: "Deadweight (t)",
            value: currentItem.deadWeight ?? "",
          },
          {
            id: 11,
            key: "Length (m)",
            value: currentItem.length ?? "",
          },
          {
            id: 12,
            key: "Beam (m)",
            value: currentItem.beam ?? "",
          },
          {
            id: 13,
            key: "Depth (m)",
            value: currentItem.depth ?? "",
          },
          {
            id: 14,
            key: "Draught (m)",
            value: currentItem.draught ?? "",
          },
        ]}
        hasPagination={false}
      >
        <tr slot="header">
          <th>Item</th>
          <th>Value</th>
        </tr>
        <tr slot="body" let:item={row}>
          <td>{row.key}</td>
          <td>{row.value}</td>
        </tr>
      </DataTable>
    </div>
    <div class="col-6">
      <div class="position-absolute pr-4">{currentItem.note ?? ""}</div>
      <div
        style="background-image: url(/src/assets/images/ships/ship2.png);
        background-size: 257px 193px;
        background-position-x: right;
        background-position-y: bottom;
        background-repeat: no-repeat;
        height: 100%;
        opacity: 0.3;"
      />
    </div>
  </div>
</Card>

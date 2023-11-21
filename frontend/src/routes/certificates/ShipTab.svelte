<script>
  import Card from "../components/card/Card.svelte";
  import DataTable from "../components/table/Table.svelte";
  import { currentItemStore, forRefreshStore } from "../../routes/stores";
  import Select from "../components/select/Select.svelte";
  import { onMount } from "svelte";
  import CertificateModel from "../../assets/js/models/CertificatesModel";
  import ShipModel from "../../assets/js/models/ShipModel";
  import DepartmentModel from "../../assets/js/models/DepartmentModel";
  import CertificateTypeModel from "../../assets/js/models/CertificateTypeModel";

  export let title = "SHIP CERTIFICATES";

  export let t_data = [];
  let ships = [];
  let departments = [];
  let certificateTypes = [];
  let searchOptions = {
    shipId: "",
    certificateTypeId: "",
    departmentId: "",
  };
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
    CertificateModel.getAll({
      pagination,
      filter: {
        type: "ship",
        "issue.departmentId": searchOptions.departmentId,
        certificateTypeId: searchOptions.certificateTypeId,
        shipId: searchOptions.shipId,
      },
    }).then((res) => {
      isLoading = false;
      t_data = res.data;
      pagination.totalCount = res.count;
    });
  }

  function initSelect() {
    DepartmentModel.getAll({}).then((res) => {
      departments = [
        {
          id: "",
          name: "All",
        },
        ...res,
      ];
    });

    ShipModel.getAll({}).then((res) => {
      ships = [
        {
          id: "",
          vesselName: "All",
        },
        ...res,
      ];
    });

    CertificateTypeModel.getAll({ filter: { type: "ship" } }).then((res) => {
      certificateTypes = [
        {
          id: "",
          name: "All",
        },
        ...res,
      ];
    });
  }

  forRefreshStore.subscribe((item) => {
    initTable();
  });

  function onPlusClick() {
    currentItemStore.update((item) => ({
      id: 0,
      table: "certificateShip",
    }));
  }

  // for unit test
  export let onEditClick = ({ id }) => {
    currentItemStore.update((item) => ({
      id,
      table: "certificateShip",
    }));
  };

  export let onDeleteClick = ({ id, title }) => {
    currentItemStore.update((item) => ({
      id,
      title,
      table: "certificateShip",
    }));
  };

  onMount(() => {
    initTable();
    initSelect();
  });
</script>

<Card {title} hasPlus="true" plusTarget="#cert-ship-modal" {onPlusClick}>
  <div class="form-row">
    <div class="col-md-9">
      <div class="form-row">
        <div class="col-md-3 col-6">
          <div class="position-relative form-group">
            <label for="selectDepartment">Department</label>
            <Select
              data={departments}
              valueKey="id"
              titleKey="name"
              bind:value={searchOptions.departmentId}
            />
          </div>
        </div>
        <div class="col-md-3 col-6">
          <div class="position-relative form-group">
            <label for="selectCertificate">Certificate</label>
            <Select
              data={certificateTypes}
              valueKey="id"
              titleKey="name"
              bind:value={searchOptions.certificateTypeId}
            />
          </div>
        </div>
        <div class="col-md-3 col-6">
          <div class="position-relative form-group">
            <label for="selectShip">Ship</label>
            <Select
              data={ships}
              valueKey="id"
              titleKey="vesselName"
              bind:value={searchOptions.shipId}
            />
          </div>
        </div>

        <div class="col-md-3 d-flex align-items-end">
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
    </div>
  </div>

  <DataTable data={t_data} {pagination} {initTable} {isLoading}>
    <tr slot="header">
      <th>#</th>
      <th>Department</th>
      <th>Certificate / ID</th>
      <th>Ship</th>
      <th>Issue / Expiration date</th>
      <th>Price / Reg.fee</th>
      <th>Account / Amount</th>
      <th />
    </tr>
    <tr slot="body" let:item={row} let:i>
      <td>{i + 1}</td>
      <td>{row.issue?.department ? row.issue?.department.name : "N/A"}</td>
      <td>
        <div>{row.certificateType ? row.certificateType.name : "N/A"}</div>
        <div class="mt-2">{row.issue?.id ? row.issue?.id : "N/A"}</div>
      </td>
      <td>{row.ship ? row.ship.vesselName : "N/A"}</td>
      <td>
        <div>{row.issue?.issue ? row.issue?.issue : "N/A"}</div>
        <div class="mt-2">{row.issue?.expire ? row.issue?.expire : "N/A"}</div>
      </td>
      <td>
        <div>{row.issue?.price ? row.issue?.price : "N/A"}</div>
        <div class="mt-2">
          {row.issue?.registrationFee ? row.issue?.registrationFee : "N/A"}
        </div>
      </td>
      <td>
        <div>{row.issue?.account ? row.issue?.account : "N/A"}</div>
        <div class="mt-2">{row.issue?.account ? "2000" : "N/A"}</div>
      </td>

      <td class="text-right">
        <button
          aria-label="editButton"
          class="mr-2 btn-icon btn-icon-only btn-square btn btn-primary btn-xs"
          on:click={() => onEditClick({ id: row.id })}
          data-toggle="modal"
          data-target="#cert-ship-modal"
          ><i class="lnr-pencil btn-icon-wrapper" /></button
        >
        <button
          aria-label="deleteButton"
          class="mr-2 btn-icon btn-icon-only btn-square btn btn-danger btn-xs"
          on:click={() =>
            onDeleteClick({
              id: row.id,
              title: `Certificate of "${row.ship ? row.ship.vesselName : ""}"`,
            })}
          data-toggle="modal"
          data-target="#delete-confirm-modal"
          ><i class="lnr-trash btn-icon-wrapper" /></button
        >
      </td>
    </tr>
  </DataTable>
</Card>

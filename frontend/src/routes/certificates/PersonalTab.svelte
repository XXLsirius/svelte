<script>
  import Card from "../components/card/Card.svelte";
  import DataTable from "../components/table/Table.svelte";
  import Select from "../components/select/Select.svelte";
  import { currentItemStore, forRefreshStore } from "../stores";
  import { onMount } from "svelte";
  import ShipModel from "../../assets/js/models/ShipModel";
  import MarinerModel from "../../assets/js/models/MarinerModel";
  import CertificateModel from "../../assets/js/models/CertificatesModel";
  import DepartmentModel from "../../assets/js/models/DepartmentModel";
  import CertificateTypeModel from "../../assets/js/models/CertificateTypeModel";
  import SearchInput from "../components/search-input/SearchInput.svelte";

  export let title = "PERSONAL ID CARDS";

  let data = [];
  let ships = [];
  let departments = [];
  let certificateTypes = [];
  let marinerNames = [];
  let searchOptions = {
    shipId: "",
    certificateTypeId: "",
    departmentId: "",
    person: "",
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
        type: "personal",
        shipId: searchOptions.shipId,
        "issue.departmentId": searchOptions.departmentId,
        certificateTypeId: searchOptions.certificateTypeId,
        person: searchOptions.person,
      },
    }).then((res) => {
      isLoading = false;
      data = res.data;
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

    CertificateTypeModel.getAll({ filter: { type: "personal" } }).then(
      (res) => {
        certificateTypes = [
          {
            id: "",
            name: "All",
          },
          ...res,
        ];
      }
    );

    MarinerModel.getAll({
      onlyNames: true,
    }).then((res) => {
      marinerNames = [...new Set(res.map((item) => item.name))];
    });
  }

  forRefreshStore.subscribe((item) => {
    initTable();
  });

  function onPlusClick() {
    currentItemStore.update((item) => ({
      id: 0,
      table: "certificatePersonal",
    }));
  }

  function onEditClick({ id }) {
    currentItemStore.update((item) => ({
      id,
      table: "certificatePersonal",
    }));
  }

  function onDeleteClick({ id, title }) {
    currentItemStore.update((item) => ({
      id,
      title,
      table: "certificatePersonal",
    }));
  }

  onMount(() => {
    initTable();
    initSelect();
  });
</script>

<Card {title} hasPlus="true" plusTarget="#cert-personal-modal" {onPlusClick}>
  <div class="form-row">
    <div class="col-md-8">
      <div class="form-row">
        <div class="col-md-4 col-6">
          <div class="position-relative form-group">
            <label for="selectDepartment" class="">Department</label>
            <Select
              data={departments}
              valueKey="id"
              titleKey="name"
              bind:value={searchOptions.departmentId}
            />
          </div>
        </div>
        <div class="col-md-4 col-6">
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
        <!-- <div class="col-md-3 col-6">
          <div class="position-relative form-group">
            <label for="selectPersonal">Ship</label>
            <Select
              data={ships}
              valueKey="id"
              titleKey="vesselName"
              bind:value={searchOptions.shipId}
            />
          </div>
        </div> -->
        <div class="col-md-4 col-6">
          <div class="position-relative form-group">
            <label for="selectPersonal">Person</label>
            <SearchInput
              id="inputMarinerName"
              data={marinerNames}
              bind:value={searchOptions.person}
            />
          </div>
        </div>
      </div>
    </div>
    <div class="col-md-4 d-flex align-items-end">
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
  <DataTable {data} {pagination} {initTable} {isLoading}>
    <tr slot="header">
      <th>#</th>
      <th>Department</th>
      <th>Certificate / ID</th>
      <th>Person</th>
      <th>Issue / Expiration date</th>
      <th>Price / Reg.fee</th>
      <th>Account / Amount</th>
      <th />
    </tr>
    <tr slot="body" let:item={row} let:i>
      <td>{i + 1}</td>
      <td>{row.issue.department?.name ?? ""}</td>
      <td>
        <div>{row.certificateType?.name}</div>
        <div class="mt-2">{row.issue.id}</div>
      </td>
      <td>
        <div>{row.person?.name}</div>
        <div class="mt-2">
          {row.person?.ship?.vesselName} / {row.person?.duty
            ? row.person?.duty.name
            : ""}
        </div>
      </td>
      <td>
        <div>{row.issue.issue}</div>
        <div class="mt-2">{row.issue.expire}</div>
      </td>
      <td>
        <div>{row.issue.price}</div>
        <div class="mt-2">{row.issue.registrationFee}</div>
      </td>
      <td>
        <div>{row.issue.account}</div>
        <div class="mt-2">{2000}</div>
      </td>

      <td class="text-right">
        <button
          class="mr-2 btn-icon btn-icon-only btn-square btn btn-primary btn-xs"
          on:click={() => onEditClick({ id: row.id })}
          data-toggle="modal"
          data-target="#cert-personal-modal"
          ><i class="lnr-pencil btn-icon-wrapper" /></button
        >
        <button
          class="mr-2 btn-icon btn-icon-only btn-square btn btn-danger btn-xs"
          on:click={() =>
            onDeleteClick({
              id: row.id,
              title: `Certificate of "${row.person.name}"`,
            })}
          data-toggle="modal"
          data-target="#delete-confirm-modal"
          ><i class="lnr-trash btn-icon-wrapper" /></button
        >
      </td>
    </tr>
  </DataTable>
</Card>

<script>
  import { currentItemStore, forRefreshStore } from "../../../stores";
  import LabelGroup from "../../../components/label-group/LabelGroup.svelte";
  import { onMount } from "svelte";
  import ModelFuncs from "../../../../assets/js/models/ModelMain";

  import CertificateTypeModel from "../../../../assets/js/models/CertificateTypeModel";
  import CertificateModel from "../../../../assets/js/models/CertificatesModel";
  import DepartmentModel from "../../../../assets/js/models/DepartmentModel";
  import ShipModel from "../../../../assets/js/models/ShipModel";
  import MarinerModel from "../../../../assets/js/models/MarinerModel";
  import Card from "../../../components/card/Card.svelte";
  import DataTable from "../../../components/table/DataTable.svelte";
  import Select from "../../../components/select/Select.svelte";
  import { goto } from "$app/navigation";
  import toast, { Toaster } from "svelte-french-toast";
  import { page } from "$app/stores";

  let currentItem = { issue: {}, ship: {}, person: {} };
  let departments = [];
  let tableCardVisible = false;
  let issueCardVisible = false;
  let issueDetailVisible = false;
  let issueBtnVisible = false;
  let putInBtnVisible = false;
  let completeBtnVisible = false;

  if ($page.params.id != "0") {
    init({
      ...$page.params,
    });
  } else {
    currentItem = {
      ...$page.params,
      issue: {
        putIn: ModelFuncs.formatDate(new Date()),
      },
    };
    delete currentItem.id;

    CertificateTypeModel.getAll({
      filter: {
        type: currentItem.type,
        id: currentItem.certificateTypeId,
      },
    }).then((items) => {
      currentItem.certificateType = items[0];

      ShipModel.getAll({
        filter: {
          id: currentItem.shipId,
        },
      }).then((items) => {
        currentItem.ship = items[0];

        MarinerModel.getAll({
          pagination: { page: 1, perPage: 1 },
          filter: {
            id: currentItem.personId,
          },
        }).then((res) => {
          currentItem.person = res.data[0];
        });
      });
    });

    issueCardVisible = true;
    putInBtnVisible = true;
  }

  function init(item) {
    CertificateModel.getAll({ filter: { type: item.type, id: item.id } }).then(
      (items) => {
        currentItem = items[0];

        if (currentItem.issue) {
          currentItem.issue.departmentId = parseInt(
            currentItem.issue.departmentId
          );
        }

        CertificateTypeModel.getAll({
          filter: {
            type: item.type,
            id: item.certificateTypeId ?? currentItem.certificateType.id,
          },
        }).then((items) => {
          currentItem.certificateTypeId = item.certificateTypeId;
          currentItem.certificateType = items[0];

          ShipModel.getAll({
            filter: {
              id: item.shipId ?? currentItem.ship.id,
            },
          }).then((items) => {
            currentItem.shipId = items[0].shipId;
            currentItem.ship = items[0];

            MarinerModel.getAll({
              pagination: { page: 1, perPage: 1 },
              filter: {
                id: item.personId ?? currentItem.person.id,
              },
            }).then((res) => {
              currentItem.personId = res.data[0].personId;
              currentItem.person = res.data[0];
            });
          });
        });

        tableCardVisible = true;
        issueBtnVisible = true;
        putInBtnVisible = true;
      }
    );
  }

  function onIssueClick() {
    issueBtnVisible = false;
    issueCardVisible = true;
  }

  function onPutInClick() {
    putInBtnVisible = false;
    completeBtnVisible = true;
    issueDetailVisible = true;
  }

  function onCompleteClick() {
    putInBtnVisible = true;
    completeBtnVisible = false;
    issueDetailVisible = false;
    issueCardVisible = false;
    tableCardVisible = true;
    issueBtnVisible = true;

    if (currentItem.type == "personal") {
      delete currentItem.ship;
      delete currentItem.shipId;
    } else {
      delete currentItem.person;
      delete currentItem.personId;
    }

    CertificateModel.put(currentItem).then((result) => {
      let id = currentItem.id
        ? result.result.data.updateCertificates.id
        : result.result.data.createCertificates.id;

      init({
        type: currentItem.type,
        id,
      });

      goto(
        `/certificates/certificate-edit/type=${currentItem.type}&id=${id}&certificateTypeId=${currentItem.certificateTypeId}&shipId=${currentItem.shipId}&personId=${currentItem.personId}`
      );

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

  function initSelect() {
    DepartmentModel.getAll({}).then((res) => {
      departments = res;
      if (!currentItem.id) {
        currentItem.issue.departmentId = departments[0].id;
      }
    });
  }

  onMount(() => {
    initSelect();
  });
</script>

<Toaster />
<Card hasHeader="false">
  <div class="d-flex certificate-title-card row">
    <div class="col-md-7 col-12 my-1">
      <LabelGroup
        leftLabel={currentItem.certificateType?.name}
        rightLabel={currentItem.type == "ship"
          ? currentItem.ship?.vesselName
          : currentItem.person?.name}
        isOrange={currentItem.type == "ship" ? "true" : "false"}
        fontSize="20px"
        onLinkClick=""
      />
    </div>
    <div class="col-md-5 col-12 text-right my-1">
      {#if issueBtnVisible}
        <button
          type="button"
          class="btn-transition btn btn-warning ml-5 mr-3"
          style="width: 100px; height: 40px;"
          on:click={onIssueClick}>Issue</button
        >
      {/if}
      <a href="/certificates">
        <button
          type="button"
          class="btn-transition btn btn-outline-warning"
          style="width: 100px; height: 40px;">Back</button
        ></a
      >
    </div>
  </div>
</Card>

<div class="row mt-4">
  {#if tableCardVisible}
    <div class="col-md-5 col-12 mb-3">
      <Card hasHeader="false">
        <DataTable
          data={[
            {
              id: 1,
              key: "Department",
              value: currentItem.issue?.department?.name,
            },
            {
              id: 2,
              key: "ID",
              value: currentItem.issue?.id ?? "N/A",
            },
            {
              id: 3,
              key: "Issue Date",
              value: currentItem.issue?.issue ?? "N/A",
            },
            {
              id: 4,
              key: "Expiration Date",
              value: currentItem.issue?.expire ?? "N/A",
            },
            {
              id: 5,
              key: "Account",
              value: currentItem.issue?.account ?? "N/A",
            },
            {
              id: 6,
              key: "Price",
              value: currentItem.issue?.price ?? "N/A",
            },
            {
              id: 7,
              key: "Registration fee",
              value: currentItem.issue?.registrationFee ?? "N/A",
            },
            {
              id: 8,
              key: "Amount",
              value: 200,
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
      </Card>
    </div>
  {/if}

  {#if issueCardVisible}
    <div class="col-md-7 col-12 mb-3">
      <Card title="ISSUE">
        <div class="form-row">
          <div class="col-4">
            <div class="position-relative form-group">
              <label for="put-in" class="">Put In</label>
              <input
                id="put-in"
                type="date"
                class="form-control"
                bind:value={currentItem.issue.putIn}
              />
            </div>
          </div>
          <div class="col-4">
            <label for="certificate-edit-department" class="">Department</label>
            <Select
              data={departments}
              id="certificate-edit-department"
              valueKey="id"
              titleKey="name"
              bind:value={currentItem.issue.departmentId}
            />
          </div>
          <div class="col-4 d-flex align-items-end">
            {#if putInBtnVisible}
              <button
                type="button"
                class="btn-transition btn btn-outline-primary mb-3"
                style="width: 100px;"
                on:click={onPutInClick}>Put In</button
              >
            {/if}
            {#if completeBtnVisible}
              <button
                type="button"
                class="btn-transition btn btn-primary mb-3"
                style="width: 100px;"
                on:click={onCompleteClick}>Completed</button
              >
            {/if}
          </div>
        </div>

        {#if issueDetailVisible}
          <hr />

          <div class="form-row">
            <div class="col-4">
              <div class="position-relative form-group">
                <label for="id" class="">ID</label>
                <input
                  id="id"
                  type="text"
                  class="form-control"
                  bind:value={currentItem.issue.id}
                />
              </div>
            </div>

            <div class="col-4">
              <div class="position-relative form-group">
                <label for="issue" class="">Issue</label>
                <input
                  id="issue"
                  type="date"
                  class="form-control"
                  bind:value={currentItem.issue.issue}
                />
              </div>
            </div>

            <div class="col-4">
              <div class="position-relative form-group">
                <label for="expire" class="">Expire</label>
                <input
                  id="expire"
                  type="date"
                  class="form-control"
                  bind:value={currentItem.issue.expire}
                />
              </div>
            </div>
          </div>
          <div class="form-row">
            <div class="col-4">
              <div class="position-relative form-group">
                <label for="account" class="">Account</label>
                <input
                  id="account"
                  type="text"
                  class="form-control"
                  bind:value={currentItem.issue.account}
                />
              </div>
            </div>

            <div class="col-4">
              <div class="position-relative form-group">
                <label for="price" class="">Price</label>
                <input
                  id="price"
                  type="number"
                  class="form-control"
                  bind:value={currentItem.issue.price}
                />
              </div>
            </div>

            <div class="col-4">
              <div class="position-relative form-group">
                <label for="registration-fee" class="">Registration Fee</label>
                <input
                  id="registration-fee"
                  type="number"
                  class="form-control"
                  bind:value={currentItem.issue.registrationFee}
                />
              </div>
            </div>
          </div>
        {/if}
      </Card>
    </div>
  {/if}
</div>

<style>
  :global(.row .card) {
    height: 100%;
  }
</style>

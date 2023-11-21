<script>
  import Card from "../../../components/card/Card.svelte";
  import Select from "../../../components/select/Select.svelte";
  import { currentItemStore, forRefreshStore } from "../../../stores";
  import { onMount } from "svelte";
  import { goto } from "$app/navigation";
  import ModelFuncs from "../../../../assets/js/models/ModelMain";
  import MarinerModel from "../../../../assets/js/models/MarinerModel";
  import ShipModel from "../../../../assets/js/models/ShipModel";
  import DutyModel from "../../../../assets/js/models/DutyModel";
  import JobModel from "../../../../assets/js/models/JobModel";
  import PlatoonModel from "../../../../assets/js/models/PlatoonModel";
  import CheckBoxAndInput from "../../../components/checkbox-and-input/CheckBoxAndInput.svelte";
  import toast, { Toaster } from "svelte-french-toast";
  import { page } from "$app/stores";

  let file = null;
  let fileInput;
  let currentItem = {
    graduated: {},
    ship: {},
    job: {},
    platoon: {},
    duty: {},
  };
  let ships = [];
  let duties = [];
  let jobs = [];
  let platoons = [];

  if ($page.params.id != "0") {
    MarinerModel.getAll({
      pagination: { page: 1, perPage: 1 },
      filter: { id: $page.params.id },
    }).then((res) => {
      currentItem = res.data[0];

      currentItem.ship = currentItem.ship ?? {};
      currentItem.duty = currentItem.duty ?? {};
      currentItem.job = currentItem.job ?? {};
      currentItem.platoon = currentItem.platoon ?? {};
      currentItem.isRemoved = currentItem.removed ? true : false;
    });
  } else {
    currentItem = {
      graduated: {},
      ship: {},
      job: {},
      platoon: {},
      duty: {},
    };
  }

  function onSave() {
    MarinerModel.put({
      ...currentItem,
      removed: currentItem.isRemoved ? currentItem.removed : "",
    }).then((result) => {
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
      goto("/mariner");
    });
  }

  function initTable() {
    ShipModel.getAll({}).then((res) => {
      ships = res;
    });
    DutyModel.getAll({}).then((res) => {
      duties = res;
    });
    JobModel.getAll({}).then((res) => {
      jobs = res;
    });
    PlatoonModel.getAll({}).then((res) => {
      platoons = res;
    });
  }

  function onImageChange() {
    file = event.target.files[0];
    const formData = new FormData();
    formData.append("file", file);

    fetch(`${ModelFuncs.getServerUrl()}/upload`, {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        currentItem.image = data.url;
      });
  }

  onMount(() => {
    initTable();
  });
</script>

<Toaster />
<form
  on:submit|preventDefault={() => {
    onSave();
  }}
>
  <Card hasHeader="false">
    <div class="form-row">
      <div class="col-md-4">
        <a
          href={undefined}
          on:click={() => {
            fileInput.click();
          }}
        >
          <img
            class="w-100 cursor-pointer"
            alt="mariner"
            src={currentItem.image
              ? `${ModelFuncs.getServerUrl()}/${currentItem.image}`
              : "/src/assets/images/mariners/placeholder.png"}
          />
        </a>
        <input
          class="d-none"
          type="file"
          bind:this={fileInput}
          on:change={onImageChange}
        />
      </div>

      <div class="col-md-5 px-3">
        <div class="position-relative form-group">
          <label for="mariner-name">Name</label>
          <input
            required
            id="mariner-name"
            type="text"
            class="form-control"
            bind:value={currentItem.name}
          />
        </div>

        <div class="position-relative form-group">
          <label for="selectMarnier">Ship</label>
          <Select
            data={ships}
            valueKey="id"
            titleKey="vesselName"
            required
            bind:value={currentItem.ship.id}
          />
        </div>
        <div class="position-relative form-group">
          <label for="birthday">Birthday</label>
          <input
            id="birthday"
            type="date"
            class="form-control"
            bind:value={currentItem.birthday}
          />
        </div>
        <div class="position-relative form-group">
          <label for="selectDuty">Duty</label>
          <Select
            data={duties}
            valueKey="id"
            titleKey="name"
            bind:value={currentItem.duty.id}
          />
        </div>
        <div class="row">
          <div class="col-md-6">
            <div class="position-relative form-group">
              <label for="registered">Registered</label>
              <input
                id="registered"
                type="date"
                class="form-control"
                bind:value={currentItem.registered}
              />
            </div>
          </div>
          <div class="col-md-6">
            <CheckBoxAndInput
              title="Retired"
              bind:value={currentItem.removed}
              bind:checked={currentItem.isRemoved}
            />
          </div>
        </div>
      </div>
      <div class="col-md-3 d-flex justify-content-end">
        <div class="d-flex">
          <button
            type="submit"
            class="btn btn-primary mb-3 mr-3"
            style="width: 100px;"
            data-dismiss="modal">Save</button
          >
          <a href="/mariner"
            ><button
              type="button"
              class="btn-transition btn btn-outline-primary mb-3"
              style="width: 100px;">Cancel</button
            ></a
          >
        </div>
      </div>
    </div>
  </Card>
  <div class="mb-4" />
  <Card title="MARINER PARTICULARS">
    <div class="form-row">
      <div class="col-md-4">
        <div class="position-relative form-group">
          <label for="selectDuty">Job</label>
          <Select
            data={jobs}
            valueKey="id"
            titleKey="name"
            bind:value={currentItem.job.id}
          />
        </div>
      </div>
      <div class="col-md-4">
        <div class="position-relative form-group">
          <label for="dailiyfee">Daily fee</label>
          <input
            id="dailyfee"
            type="number"
            class="form-control"
            bind:value={currentItem.dailyFee}
          />
        </div>
      </div>
    </div>
    <div class="form-row">
      <div class="col-md-4">
        <div class="position-relative form-group">
          <label for="selectPlatoon">P----</label>
          <Select
            data={platoons}
            valueKey="id"
            titleKey="name"
            bind:value={currentItem.platoon.id}
          />
        </div>
      </div>
      <div class="col-md-8">
        <div class="position-relative form-group">
          <label for="Previous-affiliation">Previous affiliation </label>
          <input
            id="Previous-affiliation"
            type="text"
            placeholder="ABC.corp"
            class="form-control"
            bind:value={currentItem.previousAffiliation}
          />
        </div>
      </div>
    </div>
    <div class="form-row">
      <div class="col-md-4">
        <div class="position-relative form-group">
          <label for="placeOfBorn">Place of Born</label>
          <input
            id="placeOfBorn"
            type="text"
            class="form-control"
            bind:value={currentItem.placeOfBorn}
          />
        </div>
      </div>
      <div class="col-md-4">
        <div class="position-relative form-group">
          <label for="placeOfResidence">Place of Residence</label>
          <input
            id="placeOfResidence"
            type="text"
            class="form-control"
            bind:value={currentItem.placeOfResidence}
          />
        </div>
      </div>
      <div class="col-md-4">
        <div class="position-relative form-group">
          <label for="code">Code</label>
          <input
            id="code"
            type="number"
            class="form-control"
            bind:value={currentItem.code}
          />
        </div>
      </div>
    </div>
    <div class="form-row">
      <div class="col-md-4">
        <div class="position-relative form-group">
          <label for="mobile-phone">Mobile Phone</label>
          <input
            id="mobile-phone"
            type="text"
            class="form-control"
            bind:value={currentItem.mobilePhone}
          />
        </div>
      </div>
      <div class="col-md-4">
        <div class="position-relative form-group">
          <label for="home-phone">Home Phone</label>
          <input
            id="home-phone"
            type="text"
            class="form-control"
            bind:value={currentItem.homePhone}
          />
        </div>
      </div>
    </div>
    <div class="form-row">
      <div class="col-md-8">
        <div class="position-relative form-group">
          <label for="graduated">Graduated</label>
          <input
            id="graduated"
            type="text"
            class="form-control"
            bind:value={currentItem.graduated.note}
          />
        </div>
      </div>
      <div class="col-md-4">
        <div class="position-relative form-group">
          <label for="graduated-date">&nbsp;</label>
          <input
            id="graduated-date"
            type="date"
            class="form-control"
            bind:value={currentItem.graduated.date}
          />
        </div>
      </div>
    </div>
    <div class="form-row">
      <div class="col-md-4">
        <div class="position-relative form-group">
          <label for="qualification-grade">Qualification Grade</label>
          <input
            id="qualification-grade"
            type="text"
            class="form-control"
            bind:value={currentItem.qualificationGrade}
          />
        </div>
      </div>
      <div class="col-md-4">
        <div class="position-relative form-group">
          <label for="boarded-years">Boarded Years</label>
          <input
            id="boarded-years"
            type="number"
            class="form-control"
            bind:value={currentItem.boardedYears}
          />
        </div>
      </div>
    </div>
    <div class="form-row">
      <div class="col-md-12">
        <div class="position-relative form-group">
          <label for="note">Note</label>
          <textarea
            id="note"
            type="text"
            class="form-control"
            bind:value={currentItem.note}
          />
        </div>
      </div>
    </div>
  </Card>
</form>

<script>
  import Card from "../../../components/card/Card.svelte";
  import { currentItemStore, forRefreshStore } from "../../../stores";
  import { goto } from "$app/navigation";
  import ShipModel from "../../../../assets/js/models/ShipModel";
  import CheckBoxAndInput from "../../../components/checkbox-and-input/CheckBoxAndInput.svelte";
  import Carousel from "../../../components/carousel/Carousel.svelte";
  import toast, { Toaster } from "svelte-french-toast";
  import { page } from "$app/stores";

  let currentItem = {
    images: [],
  };

  if ($page.params.id != "0") {
    ShipModel.getAll({ filter: { id: $page.params.id } }).then((items) => {
      currentItem = items[0];
      currentItem.isRemoved = items[0].removed ? true : false;
    });
  } else {
    currentItem = {
      images: [],
    };
  }

  function onSave() {
    ShipModel.put({
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
    });

    goto("/ship");
  }
</script>

<Toaster />
<Card hasHeader="false">
  <form
    on:submit|preventDefault={() => {
      onSave();
    }}
  >
    <div class="form-row">
      <div class="col-md-8">
        <div class="form-row">
          <div class="col-md-6">
            <div class="position-relative form-group">
              <label for="vessel-name" class="">Vessel name</label>
              <input
                id="vessel-name"
                type="text"
                class="form-control"
                bind:value={currentItem.vesselName}
                required
              />
            </div>
          </div>
          <div class="col-md-3">
            <div class="position-relative form-group">
              <label for="registered" class="">Registered</label>
              <input
                id="registered"
                type="date"
                class="form-control"
                bind:value={currentItem.registered}
              />
            </div>
          </div>
          <div class="col-md-3">
            <CheckBoxAndInput
              title="Removed"
              bind:value={currentItem.removed}
              bind:checked={currentItem.isRemoved}
            />
          </div>
        </div>
      </div>
      <div class="col-md-4 d-flex align-items-end justify-content-end">
        <div class="d-flex">
          <button
            type="submit"
            class="btn btn-primary mb-3 mr-3"
            style="width: 100px;"
            data-dismiss="modal">Save</button
          >
          <a href="/ship"
            ><button
              type="button"
              class="btn-transition btn btn-outline-primary mb-3"
              style="width: 100px;">Cancel</button
            ></a
          >
        </div>
      </div>
    </div>

    <label for="registered" class="">Photos</label>

    <Carousel bind:images={currentItem.images} editable="true" />
  </form>
</Card>

<div class="mb-4" />

<Card title="VESSEL PARTICULARS">
  <div class="form-row">
    <div class="col-md-4">
      <div class="position-relative form-group">
        <label for="ship-type" class="">Ship Type</label>
        <input
          id="ship-type"
          type="text"
          class="form-control"
          bind:value={currentItem.shipType}
        />
      </div>
    </div>
  </div>
  <div class="form-row">
    <div class="col-md-4">
      <div class="position-relative form-group">
        <label for="year-of-build" class="">Year of Build</label>
        <input
          id="year-of-build"
          type="number"
          class="form-control"
          bind:value={currentItem.yearOfBuild}
        />
      </div>
    </div>
    <div class="col-md-4">
      <div class="position-relative form-group">
        <label for="flag" class="">Flag</label>
        <input
          id="flag"
          type="text"
          class="form-control"
          bind:value={currentItem.flag}
        />
      </div>
    </div>
    <div class="col-md-4">
      <div class="position-relative form-group">
        <label for="homeport" class="">Homeport</label>
        <input
          id="homeport"
          type="text"
          class="form-control"
          bind:value={currentItem.homePort}
        />
      </div>
    </div>
  </div>
  <div class="form-row">
    <div class="col-md-4">
      <div class="position-relative form-group">
        <label for="reg-number" class="">Reg.Number</label>
        <input
          id="reg-number"
          type="text"
          class="form-control"
          bind:value={currentItem.regNumber}
        />
      </div>
    </div>
    <div class="col-md-4">
      <div class="position-relative form-group">
        <label for="callsign" class="">Callsign</label>
        <input
          id="callsign"
          type="text"
          class="form-control"
          bind:value={currentItem.callsign}
        />
      </div>
    </div>
    <div class="col-md-4">
      <div class="position-relative form-group">
        <label for="imo-number" class="">IMO Number</label>
        <input
          id="imo-number"
          type="text"
          class="form-control"
          bind:value={currentItem.imoNumber}
        />
      </div>
    </div>
  </div>
  <div class="form-row">
    <div class="col-md-4">
      <div class="position-relative form-group">
        <label for="gross-tonnage" class="">Gross Tonnage (t)</label>
        <input
          id="gross-tonnage"
          type="number"
          class="form-control"
          bind:value={currentItem.grossTonnage}
        />
      </div>
    </div>
    <div class="col-md-4">
      <div class="position-relative form-group">
        <label for="net-tonnage" class="">Net Tonnage (t)</label>
        <input
          id="net-tonnage"
          type="number"
          class="form-control"
          bind:value={currentItem.netTonnage}
        />
      </div>
    </div>
    <div class="col-md-4">
      <div class="position-relative form-group">
        <label for="dead-weight" class="">Deadweight (t)</label>
        <input
          id="dead-weight"
          type="number"
          class="form-control"
          bind:value={currentItem.deadWeight}
        />
      </div>
    </div>
  </div>
  <div class="form-row">
    <div class="col-md-4">
      <div class="position-relative form-group">
        <label for="length" class="">Length (m)</label>
        <input
          id="length"
          type="number"
          class="form-control"
          bind:value={currentItem.length}
        />
      </div>
    </div>
    <div class="col-md-4">
      <div class="position-relative form-group">
        <label for="beam" class="">Beam (m)</label>
        <input
          id="beam"
          type="number"
          class="form-control"
          bind:value={currentItem.beam}
        />
      </div>
    </div>
    <div class="col-md-4">
      <div class="position-relative form-group">
        <label for="depth" class="">Depth (m)</label>
        <input
          id="depth"
          type="number"
          class="form-control"
          bind:value={currentItem.depth}
        />
      </div>
    </div>
  </div>
  <div class="form-row">
    <div class="col-md-4">
      <div class="position-relative form-group">
        <label for="draught" class="">Draught (m)</label>
        <input
          id="draught"
          type="number"
          class="form-control"
          bind:value={currentItem.draught}
        />
      </div>
    </div>
  </div>
  <div class="form-row">
    <div class="col-md-12">
      <div class="position-relative form-group">
        <label for="note" class="">Note</label>
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

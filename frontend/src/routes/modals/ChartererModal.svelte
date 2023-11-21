<script>
  import Modal from "../components/modal/Modal.svelte";
  import { currentItemStore, forRefreshStore } from "../stores";
  import ChartererModel from "../../assets/js/models/ChartererModel";
  import ModelFuncs from "../../assets/js/models/ModelMain";
  import toast, { Toaster } from "svelte-french-toast";

  let modalTitle = "CHARTERER";
  let modalID = "charterer-modal";
  let currentItem = {
    id: "",
    company: "",
    nation: "",
    phone: "",
    email: "",
    note: "",
  };

  currentItemStore.subscribe((item) => {
    if (item.table != "charterer") {
      return;
    }

    if (item.id) {
      ChartererModel.getAll({ filter: { id: item.id } }).then((items) => {
        currentItem = items[0];
      });
    } else {
      currentItem = {
        id: "",
        company: "",
        nation: "",
        phone: "",
        email: "",
        note: "",
      };
    }
  });

  function onConfirmClick() {
    ModelFuncs.put("charterer", currentItem).then((result) => {
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
</script>

<Toaster />
<Modal {modalTitle} {modalID} {onConfirmClick}>
  <div class="form-row">
    <div class="col-md-6">
      <div class="position-relative form-group">
        <label for="charterer-modal-company">Company</label>
        <input
          id="charterer-modal-company"
          type="text"
          class="form-control"
          bind:value={currentItem.company}
          required
        />
      </div>
    </div>
    <div class="col-md-6">
      <div class="position-relative form-group">
        <label for="charterer-modal-nation">Nation</label>
        <input
          id="charterer-modal-nation"
          type="text"
          class="form-control"
          bind:value={currentItem.nation}
        />
      </div>
    </div>
  </div>
  <div class="form-row">
    <div class="col-md-6">
      <div class="position-relative form-group">
        <label for="charterer-modal-contact">Contact</label>
        <input
          id="charterer-modal-contact"
          type="text"
          class="form-control"
          placeholder="Phone"
          bind:value={currentItem.phone}
        />
      </div>
    </div>
    <div class="col-md-6">
      <div class="position-relative form-group">
        <label for="charterer-modal-email">&nbsp;</label>
        <input
          id="charterer-modal-email"
          type="email"
          class="form-control"
          placeholder="e-mail"
          bind:value={currentItem.email}
        />
      </div>
    </div>
  </div>
  <div class="form-row">
    <div class="col-md-12">
      <div class="position-relative form-group">
        <label for="charterer-modal-note">Note</label>
        <textarea
          id="charterer-modal-note"
          class="form-control"
          bind:value={currentItem.note}
        />
      </div>
    </div>
  </div>
</Modal>

<script>
  import Modal from "../components/modal/Modal.svelte";
  import { currentItemStore, forRefreshStore } from "../stores";
  import WaterAreaModel from "../../assets/js/models/WaterAreaModel";
  import ModelFuncs from "../../assets/js/models/ModelMain";
  import toast, { Toaster } from "svelte-french-toast";

  let modalTitle = "WATER AREA";
  let modalID = "waterarea-modal";
  let currentItem = {
    id: "",
    name: "",
    note: "",
  };

  currentItemStore.subscribe((item) => {
    if (item.table != "waterarea") {
      return;
    }

    if (item.id) {
      WaterAreaModel.getAll({ filter: { id: item.id } }).then((items) => {
        currentItem = items[0];
      });
    } else {
      currentItem = {
        id: "",
        name: "",
        note: "",
      };
    }
  });

  function onConfirmClick() {
    ModelFuncs.put("waterarea", currentItem).then((result) => {
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
  <div class="position-relative form-group">
    <label for="waterarea-modal-name">Name</label>
    <input
      id="waterarea-modal-name"
      class="form-control"
      bind:value={currentItem.name}
      required
    />
  </div>
  <div class="position-relative form-group">
    <label for="waterarea-modal-note">Note</label>
    <textarea
      id="waterarea-modal-note"
      class="form-control"
      bind:value={currentItem.note}
    />
  </div>
</Modal>

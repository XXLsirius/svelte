<script>
  import Modal from "../components/modal/Modal.svelte";
  import { currentItemStore, forRefreshStore } from "../stores";
  import CertificateTypeModel from "../../assets/js/models/CertificateTypeModel";
  import ModelFuncs from "../../assets/js/models/ModelMain";
  import toast, { Toaster } from "svelte-french-toast";

  let modalTitle = "TYPE OF CERTIFICATE";
  let modalID = "toc-ship-modal";
  let currentItem = {
    id: "",
    name: "",
    issuingAgency: "",
    note: "",
    type: "ship",
  };

  currentItemStore.subscribe((item) => {
    if (item.table != "certificateTypeShip") {
      return;
    }

    if (item.id) {
      CertificateTypeModel.getAll({
        filter: { type: "ship", id: item.id },
      }).then((items) => {
        if (items.length) {
          currentItem = items[0];
        } else {
          currentItem = {
            id: "",
            name: "",
            issuingAgency: "",
            note: "",
            type: "ship",
          };
        }
      });
    } else {
      currentItem = {
        id: "",
        name: "",
        issuingAgency: "",
        note: "",
        type: "ship",
      };
    }
  });

  function onConfirmClick() {
    ModelFuncs.put("certificatetype", {
      type: "ship",
      ...currentItem,
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
  }
</script>

<Toaster />
<Modal {modalTitle} {modalID} {onConfirmClick}>
  <div class="position-relative form-group">
    <label for="toc-ship-modal-name">Name</label>
    <input
      id="toc-ship-modal-name"
      class="form-control"
      bind:value={currentItem.name}
      required
    />
  </div>
  <div class="position-relative form-group">
    <label for="toc-ship-modal-issuing-agency">Issuing Agency</label>
    <input
      id="toc-ship-modal-issuing-agency"
      class="form-control"
      bind:value={currentItem.issuingAgency}
    />
  </div>
  <div class="position-relative form-group">
    <label for="toc-ship-modal-note">Note</label>
    <textarea
      id="toc-ship-modal-note"
      class="form-control"
      bind:value={currentItem.note}
    />
  </div>
</Modal>

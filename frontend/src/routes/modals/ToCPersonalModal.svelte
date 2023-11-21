<script>
  import Modal from "../components/modal/Modal.svelte";
  import { currentItemStore, forRefreshStore } from "../stores";
  import CertificateTypeModel from "../../assets/js/models/CertificateTypeModel";
  import ModelFuncs from "../../assets/js/models/ModelMain";
  import toast, { Toaster } from "svelte-french-toast";

  let modalTitle = "TYPE OF CERTIFICATE";
  let modalID = "toc-personal-modal";
  let currentItem = {
    id: "",
    name: "",
    issuingAgency: "",
    note: "",
    type: "personal",
  };

  currentItemStore.subscribe((item) => {
    if (item.table != "certificateTypePersonal") {
      return;
    }

    if (item.id) {
      CertificateTypeModel.getAll({
        filter: { type: "personal", id: item.id },
      }).then((items) => {
        currentItem = items[0];
      });
    } else {
      currentItem = {
        id: "",
        name: "",
        issuingAgency: "",
        note: "",
        type: "personal",
      };
    }
  });

  function onConfirmClick() {
    ModelFuncs.put("certificatetype", {
      type: "personal",
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
    <label for="toc-personal-modal-name">Name</label>
    <input
      id="toc-personal-modal-name"
      class="form-control"
      bind:value={currentItem.name}
      required
    />
  </div>
  <div class="position-relative form-group">
    <label for="toc-personal-modal-issuing-agency">Issuing Agency</label>
    <input
      id="toc-personal-modal-issuing-agency"
      class="form-control"
      bind:value={currentItem.issuingAgency}
    />
  </div>
  <div class="position-relative form-group">
    <label for="toc-personal-modal-note">Note</label>
    <textarea
      id="toc-personal-modal-note"
      class="form-control"
      bind:value={currentItem.note}
    />
  </div>
</Modal>

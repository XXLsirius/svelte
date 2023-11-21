<script>
  import Modal from "../components/modal/Modal.svelte";
  import Select from "../components/select/Select.svelte";
  import { currentItemStore, forRefreshStore } from "../stores";
  import { onMount } from "svelte";
  import { goto } from "$app/navigation";
  import CertificateModel from "../../assets/js/models/CertificatesModel";
  import CertificateTypeModel from "../../assets/js/models/CertificateTypeModel";
  import ShipModel from "../../assets/js/models/ShipModel";
  import MarinerModel from "../../assets/js/models/MarinerModel";

  let modalTitle = "NEW CERTIFICATE";
  let modalID = "cert-personal-modal";
  let currentItem = {};
  let ships = [];
  let certificateTypes = [];
  let mariners = [];

  currentItemStore.subscribe((item) => {
    if (item.table != "certificatePersonal") {
      return;
    }

    if (item.id) {
      CertificateModel.getAll({
        pagination: { page: 1, perPage: 1 },
        filter: { type: "personal", id: item.id },
      }).then((res) => {
        let data = res.data[0];
        currentItem = {
          id: data.id,
          certificateTypeId: data.certificateTypeId,
          shipId: data.person.ship.id,
          personId: data.personId,
        };
      });
    } else {
      currentItem = {};
    }
  });

  function onConfirmClick() {
    goto(
      `/certificates/certificate-edit/type=personal&id=${
        currentItem.id ?? "0"
      }&certificateTypeId=${currentItem.certificateTypeId}&shipId=0&personId=${
        currentItem.personId
      }`
    );
  }

  function init() {
    ShipModel.getAll({}).then((res) => {
      ships = res;
    });

    CertificateTypeModel.getAll({ filter: { type: "personal" } }).then(
      (res) => {
        certificateTypes = res;
      }
    );

    MarinerModel.getAll({
      filter: {
        "ship.id": currentItem.shipId,
      },
      onlyNames: true,
    }).then((res) => {
      mariners = res;
    });
  }

  $: currentItem.shipId, init();

  onMount(() => {
    init();
  });
</script>

<Modal {modalTitle} {modalID} {onConfirmClick}>
  <div class="position-relative form-group">
    <label for="select-certificate">Certificate</label>
    <Select
      data={certificateTypes}
      valueKey="id"
      titleKey="name"
      required={true}
      bind:value={currentItem.certificateTypeId}
    />
  </div>
  <div class="position-relative form-group">
    <label for="select-ship">Ship</label>
    <Select
      data={ships}
      valueKey="id"
      titleKey="vesselName"
      bind:value={currentItem.shipId}
    />
  </div>
  <div class="position-relative form-group">
    <label for="select-person">Person</label>
    <Select
      data={mariners}
      valueKey="id"
      titleKey="name"
      required={true}
      bind:value={currentItem.personId}
    />
  </div>
</Modal>

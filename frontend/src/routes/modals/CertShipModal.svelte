<script>
	import Modal from "../components/modal/Modal.svelte";
	import { currentItemStore, forRefreshStore } from "../stores";
	import CertificateModel from "../../assets/js/models/CertificatesModel";
	import CertificateTypeModel from "../../assets/js/models/CertificateTypeModel";
	import ShipModel from "../../assets/js/models/ShipModel";
	import Select from "../components/select/Select.svelte";
	import { onMount } from "svelte";
	import { goto } from "$app/navigation";

	let modalTitle = "NEW CERTIFICATE";
	let modalID = "cert-ship-modal";
	let currentItem = {};
	let ships = [];
	let certificateTypes = [];

	currentItemStore.subscribe((item) => {
		if (item.table != "certificateShip") {
			return;
		}

		if (item.id) {
			CertificateModel.getAll({
				pagination: { page: 1, perPage: 1 },
				filter: { type: "ship", id: item.id },
			}).then((res) => {
				let data = res.data[0];
				currentItem = {
					id: data.id,
					shipId: data.shipId,
					certificateTypeId: data.certificateTypeId,
				};
			});
		} else {
			currentItem = {};
		}
	});

	function onConfirmClick() {
		goto(
			`/certificates/certificate-edit/type=ship&id=${
				currentItem.id ?? "0"
			}&certificateTypeId=${currentItem.certificateTypeId}&shipId=${
				currentItem.shipId
			}&personId=0`
		);
	}

	function init() {
		ShipModel.getAll({}).then((res) => {
			ships = res;
		});

		CertificateTypeModel.getAll({ filter: { type: "ship" } }).then((res) => {
			certificateTypes = res;
		});
	}

	onMount(() => {
		init();
	});
</script>

<Modal {modalTitle} {modalID} {onConfirmClick}>
	<div class="position-relative form-group">
		<label for="cert-ship-modal-certificate-name">Certificate</label>
		<Select
			data={certificateTypes}
			valueKey="id"
			titleKey="name"
			required={true}
			bind:value={currentItem.certificateTypeId}
		/>
	</div>
	<div class="position-relative form-group">
		<label for="cert-ship-modal-ship-name">Ship</label>
		<Select
			data={ships}
			valueKey="id"
			titleKey="vesselName"
			required={true}
			bind:value={currentItem.shipId}
		/>
	</div>
</Modal>

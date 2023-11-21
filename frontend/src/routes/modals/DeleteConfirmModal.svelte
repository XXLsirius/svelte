<script>
	import Modal from "../components/modal/Modal.svelte";
	import { currentItemStore, forRefreshStore } from "../stores";
	import ModelFuncs from "../../assets/js/models/ModelMain";
	import CertificateModel from "../../assets/js/models/CertificatesModel";
	import ShipModel from "../../assets/js/models/ShipModel";
	import MarinerModel from "../../assets/js/models/MarinerModel";
	import toast, { Toaster } from "svelte-french-toast";

	let modalTitle = "Delete";
	let modalID = "delete-confirm-modal";
	let currentItem = {};

	currentItemStore.subscribe((item) => {
		currentItem = item;
	});

	function onConfirmClick() {
		switch (currentItem.table) {
			case "certificateTypeShip":
			case "certificateTypePersonal":
				ModelFuncs.delete("certificatetype", currentItem.id).then(
					(result) => {
						forRefreshStore.update((n) => n + 1);
						toast.success("Successfully Deleted", {
							position: "top-right",
							theme: {
								"--toastColor": "white",
								"--toastBackground": "green",
								"--toastBarBackground": "darkgreen",
							},
							duration: 2000,
						});
					}
				);
				break;

			case "certificateShip":
			case "certificatePersonal":
				CertificateModel.delete(currentItem.id).then((result) => {
					forRefreshStore.update((n) => n + 1);
					toast.success("Successfully Deleted", {
						position: "top-right",
						theme: {
							"--toastColor": "white",
							"--toastBackground": "green",
							"--toastBarBackground": "darkgreen",
						},
						duration: 2000,
					});
				});
				break;

			case "waterarea":
				ModelFuncs.delete("waterarea", currentItem.id).then(
					(result) => {
						forRefreshStore.update((n) => n + 1);
						toast.success("Successfully Deleted", {
							position: "top-right",
							theme: {
								"--toastColor": "white",
								"--toastBackground": "green",
								"--toastBarBackground": "darkgreen",
							},
							duration: 2000,
						});
					}
				);
				break;

			case "charterer":
				ModelFuncs.delete("charterer", currentItem.id).then(
					(result) => {
						forRefreshStore.update((n) => n + 1);
						toast.success("Successfully Deleted", {
							position: "top-right",
							theme: {
								"--toastColor": "white",
								"--toastBackground": "green",
								"--toastBarBackground": "darkgreen",
							},
							duration: 2000,
						});
					}
				);
				break;

			case "ship":
				ShipModel.delete(currentItem.id).then((result) => {
					forRefreshStore.update((n) => n + 1);
					toast.success("Successfully Deleted", {
						position: "top-right",
						theme: {
							"--toastColor": "white",
							"--toastBackground": "green",
							"--toastBarBackground": "darkgreen",
						},
						duration: 2000,
					});
				});
				break;

			case "mariner":
				MarinerModel.delete(currentItem.id).then((result) => {
					forRefreshStore.update((n) => n + 1);
					toast.success("Successfully Deleted", {
						position: "top-right",
						theme: {
							"--toastColor": "white",
							"--toastBackground": "green",
							"--toastBarBackground": "darkgreen",
						},
						duration: 2000,
					});
				});
				break;

			default:
				break;
		}
	}
</script>

<Toaster />

<Modal {modalTitle} {modalID} {onConfirmClick}>
	<div class="position-relative form-group text-center">
		<h5>{currentItem.title ? currentItem.title : ""}</h5>
		<p>Are you sure you want to delete this item?</p>
	</div>
</Modal>

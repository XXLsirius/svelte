<script>
	import Modal from "../components/modal/Modal.svelte";
	let modalTitle = "Basic Modal Title";
	let modalID = "basicModal1";
	let modalWidth = "500px";

	function onConfirmClick() {
		alert("Button Clicked!");
	}
</script>

<Modal {modalTitle} {modalID} {onConfirmClick} {modalWidth}>
	<div class="position-relative form-group">
		<label for="exampleEmail11" class="">Email</label>
		<input
			name="email"
			id="exampleEmail11"
			placeholder="with a placeholder"
			type="email"
			class="form-control"
		/>
	</div>
	<div class="position-relative form-group">
		<label for="examplePassword11" class="">Password</label>
		<input
			name="password"
			id="examplePassword11"
			placeholder="password placeholder"
			type="password"
			class="form-control"
		/>
	</div>
	<div class="position-relative form-group">
		<label for="exampleAddress" class="">Address</label>
		<input
			name="address"
			id="exampleAddress"
			placeholder="1234 Main St"
			type="text"
			class="form-control"
		/>
	</div>
</Modal>

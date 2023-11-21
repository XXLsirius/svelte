<script>
	/**
	 * @type {any}
	 */
	export let modalTitle;
	/**
	 * @type {any}
	 */
	export let modalID;
	/**
	 * @type {any}
	 */
	export let onConfirmClick;
	export let modalWidth = "500px";
</script>

<div class="modal fade" id={modalID} tabindex="-1" aria-hidden="true">
	<div
		class="modal-dialog"
		role="document"
		style="position:fixed; top: 40%; left: 50%; transform: translate(-50%, -50%); width:{modalWidth};"
	>
		<div class="modal-content">
			<div class="modal-header">
				<h5 class="modal-title">{modalTitle}</h5>
				<button
					type="button"
					class="close"
					data-dismiss="modal"
					aria-label="Close"
				>
					<span aria-hidden="true">×</span>
				</button>
			</div>
			<form
				on:submit|preventDefault={() => {
					onConfirmClick();
					document
						.getElementById(modalID)
						?.querySelector('[data-dismiss="modal"]')
						?.click();
				}}
			>
				<div class="modal-body">
					<slot />
				</div>
				<div class="modal-footer">
					<button
						type="submit"
						class="btn btn-primary"
						style="width: 100px;">OK</button
					>
					<button
						type="button"
						class="btn-transition btn btn-outline-primary"
						style="width: 100px;"
						data-dismiss="modal">Close</button
					>
				</div>
			</form>
		</div>
	</div>
</div>

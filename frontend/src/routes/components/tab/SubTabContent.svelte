<script>
	export let isActive = "false";
	export let subTabID = "sub-tab-content-1";
</script>

<div
	class="tab-pane {isActive == 'true' ? 'active' : ''}"
	id={subTabID}
	role="tabpanel"
>
	<slot />
</div>

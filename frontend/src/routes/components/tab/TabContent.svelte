<script>
	export let isActive = "false";
	export let tabID = "tab-content";
</script>

<div
	class="tab-pane tabs-animation fade {isActive == 'true'
		? 'active show'
		: ''}"
	id={tabID}
	role="tabpanel"
>
	<slot />
</div>

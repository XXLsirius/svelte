<script>
	import LabelGroup from "./LabelGroup.svelte";

	function onLinkClick() {
		alert("Link Button of Label-Group Clicked");
	}
</script>

<LabelGroup
	leftLabel="S-Number"
	rightLabel="Ship name"
	hasLink="true"
	fontSize="14px;"
	{onLinkClick}
/>

<LabelGroup leftLabel="S-Number" rightLabel="Ship name" onLinkClick="" />

<LabelGroup
	leftLabel="S-Number"
	rightLabel="Ship name"
	isOrange="true"
	onLinkClick=""
/>

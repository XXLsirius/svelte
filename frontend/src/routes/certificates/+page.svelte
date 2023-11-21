<script>
	import MainTab from "../components/tab/MainTab.svelte";
	import TabContent from "../components/tab/TabContent.svelte";
	import ShipTab from "./ShipTab.svelte";
	import PersonalTab from "./PersonalTab.svelte";

	let tabAttrs = [
		{
			tabName: "Ship",
			tabHref: "tab-content-ship",
		},
		{
			tabName: "Personal",
			tabHref: "tab-content-personal",
		},
	];
</script>

<MainTab {tabAttrs}>
	<TabContent tabID={tabAttrs[0].tabHref} isActive="true">
		<ShipTab title={tabAttrs[0].tabName} />
	</TabContent>

	<TabContent tabID={tabAttrs[1].tabHref}>
		<PersonalTab title={tabAttrs[1].tabName} />
	</TabContent>
</MainTab>

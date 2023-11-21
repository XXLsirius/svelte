<script>
	import MainTab from "./MainTab.svelte";
	import TabContent from "./TabContent.svelte";
	import Card from "../card/Card.svelte";
	import SubTab from "./SubTab.svelte";
	import SubTabContent from "./SubTabContent.svelte";

	let tabAttrs = [
		{
			tabName: "Departure",
			tabHref: "tab-content-departure",
		},
		{
			tabName: "Navigation",
			tabHref: "tab-content-navigation",
		},
		{
			tabName: "Arrived",
			tabHref: "tab-content-arrived",
		},
	];

	let subTabAttrs = [
		{
			tabName: "Area 01",
			tabHref: "tab-content-area01",
		},
		{
			tabName: "Area 02",
			tabHref: "tab-content-area02",
		},
	];

	function onPlusClick() {
		alert("Button Clicked!");
	}
</script>

<MainTab {tabAttrs}>
	<TabContent tabID={tabAttrs[0].tabHref} isActive="true">
		<Card title={tabAttrs[0].tabName}>
			<SubTab {subTabAttrs} hasPlus="true" {onPlusClick}>
				<SubTabContent
					subTabID={subTabAttrs[0].tabHref}
					isActive="true"
				>
					<p>{subTabAttrs[0].tabName}</p>
				</SubTabContent>

				<SubTabContent subTabID={subTabAttrs[1].tabHref}>
					<p>{subTabAttrs[1].tabName}</p>
				</SubTabContent>
			</SubTab>
		</Card>
	</TabContent>

	<TabContent tabID={tabAttrs[1].tabHref}>
		<Card title={tabAttrs[1].tabName}>
			<p>{tabAttrs[1].tabName}</p>
		</Card>
	</TabContent>

	<TabContent tabID={tabAttrs[2].tabHref}>
		<Card title={tabAttrs[2].tabName}>
			<p>{tabAttrs[2].tabName}</p>
		</Card>
	</TabContent>
</MainTab>

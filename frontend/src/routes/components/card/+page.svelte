<script>
	import Card from "./Card.svelte";

	function onPlusClick() {
		alert("Button Clicked!");
	}
</script>

<Card title="Card Example" hasPlus="true" {onPlusClick}>
	<p>
		Lorem ipsum dolor sit amet, conse ctetuer adipiscing elit. Aenean commodo
		ligula eget dolor. Aenean massa.
	</p>
</Card>

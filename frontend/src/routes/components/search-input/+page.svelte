<script>
	import SearchInput from "./SearchInput.svelte";

	let data = [
		"Apple",
		"Banana",
		"Lemon",
		"Pineapple",
		"Strawberry",
		"Berry",
		"Watermelon",
		"Melon",
		"Grapes",
		"Papaya",
		"Guava",
		"Mango",
		"Pear",
		"Peach",
		"Pomegranate",
	];

	let value = "";
</script>

<p>Input Fruit Name.</p>

<SearchInput {data} bind:value />

<div class="mt-3">Selected Value: {value}.</div>

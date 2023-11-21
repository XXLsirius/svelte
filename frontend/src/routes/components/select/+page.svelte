<script>
	import Select from "./Select.svelte";

	let data = [
		{
			id: 1,
			name: "Apple",
		},
		{
			id: 2,
			name: "Banana",
		},
		{
			id: 3,
			name: "Lemon",
		},
	];

	let value;
</script>

<Select {data} valueKey="id" titleKey="name" bind:value />

<div class="mt-3 text-center">Selected Value: {value}.</div>

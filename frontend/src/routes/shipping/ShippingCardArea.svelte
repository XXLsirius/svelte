<script>
	import WaterAreaModel from "../../assets/js/models/WaterAreaModel";
	import { onMount } from "svelte";

	export let shipping;

	let areas = [];
	let area_names = [];
	let water_areas = [];

	function initWaterAreaTable() {
		WaterAreaModel.getAll({}).then((res) => {
			water_areas = res;

			if (shipping.departure_areas != null) {
				areas = shipping.departure_areas.concat(
					shipping.navigation_areas,
					shipping.arrived_areas
				);
			}

			let tmp_area_names = [];

			if (areas.length > 0) {
				areas.forEach((area, i) => {
					tmp_area_names.push(
						water_areas.find(
							(water_area) => water_area.id == area.area_id
						)?.name
					);
				});
			}

			area_names = tmp_area_names;
		});
	}

	onMount(() => {
		initWaterAreaTable();
	});
</script>

{#each area_names as area_name, i}
	<div class="mt-3 d-flex fa-pull-left">
		<div style="width:30px;">
			{#if i == area_names.length - 1}
				<img src="/src/assets/images/yellow.svg" alt="area" />
			{:else}
				<img src="/src/assets/images/area.svg" alt="area" />
			{/if}
			<div
				style="width:max-content; transform:translateX(calc(14px - 50%))"
			>
				{area_name ?? ""}
			</div>
		</div>
		{#if i != area_names.length - 1}
			<div
				style="width:150px; border-top:1px solid #c7cbce; margin-top:15px; margin-left:-7px;"
			/>
		{/if}
	</div>
{/each}

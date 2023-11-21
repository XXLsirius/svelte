<script>
	import ModelFuncs from "../../../assets/js/models/ModelMain";

	export let images;
	export let editable = "true";
	let fileInput;
	let shipImg1;
	let shipImg2;
	let imageChanging = false;

	function onImageChange(image) {
		if (imageChanging) {
			return;
		}

		shipImg2.src = `${ModelFuncs.getServerUrl()}/${image}`;
		imageChanging = true;
		setTimeout(() => {
			imageChanging = false;
			shipImg1.src = `${ModelFuncs.getServerUrl()}/${image}`;
		}, 500);
	}

	function onPlusImage() {
		const file = event.target.files[0];
		const formData = new FormData();
		formData.append("file", file);
		fetch(`${ModelFuncs.getServerUrl()}/upload`, {
			method: "POST",
			body: formData,
		})
			.then((response) => response.json())
			.then((data) => {
				let tmpImages = images ? [...images] : [];
				tmpImages.push(data.url);
				images = tmpImages;
			});
	}
</script>

<div class="form-row mb-5">
	<div class="col-md-8">
		<div
			style="height: 400px; overflow:hidden; box-shadow: 0px 0px 5px rgb(0,0,0,0.3);  background:#ccc;"
		>
			<img
				bind:this={shipImg1}
				alt="ship"
				class="carousel-image carousel-image-1"
				class:changing={imageChanging}
				src={images.length
					? `${ModelFuncs.getServerUrl()}/${images[0]}`
					: "/src/assets/images/ships/placeholder.png"}
				width="100%"
			/>
			<img
				bind:this={shipImg2}
				alt="ship"
				class="carousel-image carousel-image-2"
				class:changing={imageChanging}
				src={images.length
					? `${ModelFuncs.getServerUrl()}/${images[0]}`
					: "/src/assets/images/ships/placeholder.png"}
				width="100%"
			/>
		</div>
	</div>
	<div class="col-md-4">
		<div class="form-row">
			{#each images ? images : [] as image}
				<div class="col-md-4 mb-2">
					<div class="image-wrapper">
						<a href={undefined} on:click={() => onImageChange(image)}
							><img
								alt="ship"
								src={`${ModelFuncs.getServerUrl()}/${image}`}
								width="100"
								height="57"
							/></a
						>
					</div>
				</div>
			{/each}

			{#if editable == "true"}
				<div class="col-md-4">
					<div class="image-wrapper">
						<a
							href={undefined}
							on:click={() => {
								fileInput.click();
							}}
							><img
								alt="plus"
								src="/src/assets/images/ships/ship-plus.png"
								class="cursor-pointer"
								width="100"
								height="57"
							/></a
						>
						<input
							class="d-none"
							type="file"
							bind:this={fileInput}
							on:change={onPlusImage}
						/>
					</div>
				</div>
			{/if}
		</div>
	</div>
</div>

<style>
	.carousel-image {
		height: 400px;
		width: auto;
		background: white;
		position: relative;
		left: 50%;
		top: 0;
		transform: translate(-50%, calc(200px - 50%));
		transition: left 0.5s ease-in-out, transform 0.5s ease-in-out;
	}

	.carousel-image-2 {
		opacity: 0;
		transform: translate(0%, calc(200px - 150%));
		left: 100%;
		transition: left 0.5s ease-in-out, transform 0.5s ease-in-out;
	}

	.carousel-image-2.changing {
		opacity: 1;
		left: 50%;
		transform: translate(-50%, calc(200px - 150%));
	}
</style>

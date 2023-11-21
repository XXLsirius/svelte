<script>
	/**
	 * @type {any}
	 */
	export let tabAttrs = [
		{
			tabName: "Departure",
			tabHref: "tab-content-departure",
		},
	];
</script>

<ul class="body-tabs body-tabs-layout tabs-animated body-tabs-animated nav">
	{#each tabAttrs as tab, i}
		<li class="nav-item">
			<a
				role="tab"
				class="nav-link {i == 0 ? 'active' : ''}"
				data-toggle="tab"
				href="#{tab.tabHref}"
				aria-selected="true"
			>
				<span>{tab.tabName}</span>
			</a>
		</li>
	{/each}
</ul>

<div class="tab-content">
	<slot />
</div>

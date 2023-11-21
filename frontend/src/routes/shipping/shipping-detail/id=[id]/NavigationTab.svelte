<script>
    import InfoNavStep from "./InfoNavStep.svelte";

    export let currentItem;
</script>

<InfoNavStep
    title="Departure"
    bind:enterDate={currentItem.departure_date}
    bind:enterTime={currentItem.departure_time}
    bind:passDate={currentItem.departure_pass_date}
    bind:passTime={currentItem.departure_pass_time}
    bind:areas={currentItem.departure_areas}
/>

<InfoNavStep title="Navigation" bind:areas={currentItem.navigation_areas} />

<InfoNavStep
    title="Arrived"
    bind:enterDate={currentItem.arrived_date}
    bind:enterTime={currentItem.arrived_time}
    bind:passDate={currentItem.arrived_pass_date}
    bind:passTime={currentItem.arrived_pass_time}
    bind:areas={currentItem.arrived_areas}
/>

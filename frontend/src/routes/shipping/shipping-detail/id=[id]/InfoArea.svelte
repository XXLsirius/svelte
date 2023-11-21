<script>
    import InfoLoad from "./InfoLoad.svelte";
    import InfoUnload from "./InfoUnload.svelte";

    export let areas;

    function period_total_days(from, to) {
        // Convert the date strings to Date objects
        let startDate = new Date(from);
        let endDate = new Date(to);

        // Calculate the difference in milliseconds
        let timeDifference = Math.abs(endDate.getTime() - startDate.getTime());
        // Calculate the number of days
        let dayMilliSeconds = 1000 * 60 * 60 * 24;
        let totalDays = Math.floor(timeDifference / dayMilliSeconds);

        return isNaN(totalDays) ? 0 : totalDays;
    }
</script>

{#if typeof areas !== "undefined" && areas.length != 0}
    {#each areas as area, i}
        {#if area.area}
            <div class={i === 0 ? "pt-3" : ""}>
                <div class="d-flex">
                    <div
                        style="width: 32px; height: 32px; border: 1px solid #797979; border-radius: 50%;"
                    >
                        <img
                            src="/src/assets/images/departure.svg"
                            style="width: 16px; height: 15px; margin-top: 8px; margin-left: 8px"
                            alt="AreaImage"
                        />
                    </div>
                    <div class="ml-2 my-auto font-weight-bold fsize-2">
                        {area.area.name}
                    </div>
                </div>

                <div class="ml-3 border-left">
                    <div class="ml-4 pb-3">
                        <div class="pt-3">
                            {#if area.area_in_date}
                                {area.area_in_date}
                                {area.area_in_time} ~ {area.area_out_date ?? ""}
                                {area.area_out_time ?? ""}
                                {period_total_days(
                                    area.area_in_date,
                                    area.area_out_date
                                )} days
                            {:else}
                                -
                            {/if}
                        </div>
                        <div class="mt-3">
                            {area.area_note ? area.area_note : ""}
                        </div>

                        <InfoLoad bind:loads={area.loads} />
                        <InfoUnload bind:unloads={area.unloads} />
                    </div>
                </div>
            </div>
        {/if}
    {/each}
{/if}

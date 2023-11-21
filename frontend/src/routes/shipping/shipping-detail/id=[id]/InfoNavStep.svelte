<script>
    import InfoArea from "./InfoArea.svelte";

    export let title = "";
    export let enterDate = "2000-01-01";
    export let enterTime = "00:00";
    export let passDate = "2000-01-01";
    export let passTime = "00:00";
    export let areas = [];
</script>

<div>
    <div class="d-flex">
        <div
            style="width: 32px; height: 32px; border: 1px solid #797979; border-radius: 50%;"
        >
            {#if title != "Navigation"}
                <img
                    src="/src/assets/images/departure.svg"
                    style="width: 20px; height: 17px; margin-top: 6px; margin-left: 6px"
                    alt="StepImage"
                />
            {:else}
                <img
                    src="/src/assets/images/navigation.svg"
                    style="width: 20px; height: 6px; margin-top: 8px; margin-left: 5px"
                    alt="StepImage"
                />
            {/if}
        </div>
        <div class="ml-2 my-auto font-weight-bold fsize-2">
            {title}
        </div>
    </div>

    <div class="ml-3 border-left">
        <div class="ml-4 pb-3">
            {#if title != "Navigation"}
                <div class="pt-3">
                    {#if enterDate != null}
                        {title}: {enterDate}
                        {enterTime}
                    {:else}
                        {title}: -
                    {/if}
                </div>
                <div class="mt-1">
                    {#if passDate != null}
                        Pass: {passDate}
                        {passTime}
                    {:else}
                        Pass: -
                    {/if}
                </div>
            {/if}

            <InfoArea bind:areas />
        </div>
    </div>
</div>

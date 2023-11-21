<script>
    export let currentItem;
</script>

<div class="ml-3 mr-3">
    <div class="mb-4">
        Total: <span
            >{Number(currentItem.fuel_ibd) +
                Number(currentItem.fuel_af) -
                currentItem.fuel_cbd -
                currentItem.fuel_iwa}</span
        > kg
    </div>
    <div class="mb-4">
        {currentItem.fuel_note ? currentItem.fuel_note : ""}
    </div>
    <div>
        <div class="mb-1">
            Inventory before departure: <span
                >{currentItem.fuel_ibd ? currentItem.fuel_ibd : "0"}</span
            > kg
        </div>
        <div class="mb-1">
            Added fuel: <span
                >{currentItem.fuel_af ? currentItem.fuel_af : "0"}</span
            > kg
        </div>
        <div class="mb-1">
            Consumption before departure: <span
                >{currentItem.fuel_cbd ? currentItem.fuel_cbd : "0"}</span
            > kg
        </div>
        <div class="mb-1">
            Inventory when arrived: <span
                >{currentItem.fuel_iwa ? currentItem.fuel_iwa : "0"}</span
            > kg
        </div>
    </div>
</div>

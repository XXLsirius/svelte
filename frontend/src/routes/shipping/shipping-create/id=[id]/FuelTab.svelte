<script>
    export let currentItem;
</script>

<div class="pl-2 pr-2 mt-2">
    <div class="position-relative form-group mb-4">
        <div class="col-md-4 pl-0">
            <div class="d-flex">
                <label for="fuel-total" class="my-auto mr-2">Total</label>
                <input
                    id="fuel-total"
                    type="text"
                    class="form-control"
                    value={Number(currentItem.fuel_ibd) +
                        Number(currentItem.fuel_af) -
                        currentItem.fuel_cbd -
                        currentItem.fuel_iwa}
                    disabled
                />
                <label for="fuel-total" class="my-auto ml-2">kg</label>
            </div>
        </div>
    </div>
    <!-- Fuel Values-->
    <div class="form-row mb-2">
        <div class="col-md-3">
            <div class="position-relative form-group">
                <label for="fuel-ibd">Inventory before<br />departure</label>
                <div class="d-flex">
                    <input
                        id="fuel-ibd"
                        type="text"
                        class="form-control mr-2"
                        bind:value={currentItem.fuel_ibd}
                    />
                    <img
                        src="/src/assets/images/edit_shipping/u735.svg"
                        alt="plus"
                        class="my-auto"
                    />
                </div>
            </div>
        </div>
        <div class="col-md-3">
            <div class="position-relative form-group">
                <label for="fuel-af">&nbsp;<br />Added fuel</label>
                <div class="d-flex">
                    <input
                        id="fuel-af"
                        type="text"
                        class="form-control mr-2"
                        bind:value={currentItem.fuel_af}
                    />
                    <img
                        src="/src/assets/images/edit_shipping/u736.svg"
                        alt="minus"
                        class="my-auto"
                    />
                </div>
            </div>
        </div>
        <div class="col-md-3">
            <div class="position-relative form-group">
                <label for="fuel-cbd">Consumption before<br />departure</label>
                <div class="d-flex">
                    <input
                        id="fuel-cbd"
                        type="text"
                        class="form-control mr-2"
                        bind:value={currentItem.fuel_cbd}
                    />
                    <img
                        src="/src/assets/images/edit_shipping/u736.svg"
                        alt="minus"
                        class="my-auto"
                    />
                </div>
            </div>
        </div>
        <div class="col-md-3">
            <div class="position-relative form-group">
                <label for="fuel-iwa">Inventory when<br />arrived</label>
                <div class="d-flex">
                    <input
                        id="fuel-iwa"
                        type="text"
                        class="form-control mr-2"
                        bind:value={currentItem.fuel_iwa}
                    />
                    <img
                        src="/src/assets/images/edit_shipping/u735.svg"
                        alt="plus"
                        class="my-auto fade"
                    />
                </div>
            </div>
        </div>
    </div>

    <!-- [Note] -->
    <div class="position-relative form-group">
        <label for="fuel-note">Note</label>
        <textarea
            cols="10"
            class="form-control"
            bind:value={currentItem.fuel_note}
        />
    </div>
</div>

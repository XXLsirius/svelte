// import AreaTab from "./AreaTab.svelte";
import NavigationTab from "./NavigationTab.svelte";
import { describe, test, expect, vi } from "vitest";
import { render, screen, fireEvent, getByRole } from "@testing-library/svelte";
describe("NavigationTab Unitest", () => {
    test("addbutton test", async () => {
        const currentItem = {
            main_snumber: "",
            main_ship: {
                id: "",
            },
            main_charterer: {
                id: "",
            },
            main_bl: "",
            main_attachments: [],
            main_load_unload_port: "",
            main_cargo: "",
            main_note: "",

            departure_date: null,
            departure_time: null,
            departure_pass_date: null,
            departure_pass_time: null,
            departure_areas: [],

            navigation_areas: [],

            arrived_date: null,
            arrived_time: null,
            arrived_pass_date: null,
            arrived_pass_time: null,
            arrived_areas: [],

            cost_shipping_fee: "",
            cost_deposit: "",
            cost_daily_wages: "",
            cost_additional_fee: "",

            cost_crews: [],
            cost_crew_note: "",

            cost_others: [],
            cost_other_note: "",

            fuel_ibd: "",
            fuel_af: "",
            fuel_cbd: "",
            fuel_iwa: "",
            fuel_note: "",
        };

        const onEditClickSpy = vi.fn();
        render(NavigationTab, { onPlusClick: onEditClickSpy, currentItem: currentItem })
        const editButton = screen.getByRole('link', { name: "shippingSubTab" });
        fireEvent.click(editButton);
        expect(onEditClickSpy).toHaveBeenCalled();
    });
});


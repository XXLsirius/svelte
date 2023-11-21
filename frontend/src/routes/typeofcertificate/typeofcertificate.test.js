import Shiptab from "./ShipTab.svelte";
import Personaltab from "./PersonalTab.svelte"
import { describe, test, expect, vi } from "vitest";
import { render, screen, fireEvent, getByRole } from "@testing-library/svelte";
describe("Shiptab Unitest", () => {
    test("Shiptab editbutton test and deletebutton test", async () => {
        const mockData = [
            {
                "id": 1,
                "name": "Fletcher",
                "note": "McVanamy"
            }
        ]
        const onEditClickSpy = vi.fn();
        const onDeleteClickSpy = vi.fn();
        render(Shiptab, { t_data: mockData, onEditClick: onEditClickSpy, onDeleteClick: onDeleteClickSpy })
        const editButton = screen.getByRole('button', { name: "editButton" });
        const deleteButton = screen.getByRole('button', { name: "deleteButton" });
        fireEvent.click(editButton);
        fireEvent.click(deleteButton);
        expect(onEditClickSpy).toHaveBeenCalled();
        expect(onDeleteClickSpy).toHaveBeenCalled();
    });

    test("Personaltab editbutton test and deletebutton test", async () => {
        const mockData = [
            {
                "id": 1,
                "name": "Fletcher",
                "note": "McVanamy"
            }
        ]
        const onEditClickSpy = vi.fn();
        const onDeleteClickSpy = vi.fn();
        render(Personaltab, { t_data: mockData, onEditClick: onEditClickSpy, onDeleteClick: onDeleteClickSpy })
        const editButton = screen.getByRole('button', { name: "editButton" });
        const deleteButton = screen.getByRole('button', { name: "deleteButton" });
        fireEvent.click(editButton);
        fireEvent.click(deleteButton);
        expect(onEditClickSpy).toHaveBeenCalled();
        expect(onDeleteClickSpy).toHaveBeenCalled();
    });
});


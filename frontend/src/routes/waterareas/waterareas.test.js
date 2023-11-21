import Waterarea from "./+page.svelte";
import { describe, test, expect, vi } from "vitest";
import { render, screen, fireEvent, getByRole } from "@testing-library/svelte";
describe("Waterarea Unitest", () => {
    test("editbutton test and deletebutton test", async () => {
        const mockData = [
            {
                "id": 1,
                "name": "Fletcher",
                "note": "McVanamy"
            }
        ]
        const onEditClickSpy = vi.fn();
        const onDeleteClickSpy = vi.fn();
        render(Waterarea, { formData: mockData, onEditClick: onEditClickSpy, onDeleteClick: onDeleteClickSpy })
        const editButton = screen.getByRole('button', { name: "editButton" });
        const deleteButton = screen.getByRole('button', { name: "deleteButton" });
        fireEvent.click(editButton);
        fireEvent.click(deleteButton);
        expect(onEditClickSpy).toHaveBeenCalled();
        expect(onDeleteClickSpy).toHaveBeenCalled();
    });
});


import Card from "./Card.svelte";
import { describe, test, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/svelte";
describe("Verify Card Title", () => {
  test("should render the component", () => {
    const addButtonClickTest = vi.fn();
    render(Card, { props: { title: "unitest", hasPlus: "true", onPlusClick: addButtonClickTest } });

    const firstTabNode = screen.getByText("unitest").closest(".card-title");

    const plusButton = screen.getByText("");

    fireEvent.click(plusButton);

    expect(addButtonClickTest).toHaveBeenCalled();

    expect(firstTabNode).toBeTruthy();
  });
});

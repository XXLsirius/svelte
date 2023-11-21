import { describe, test, expect, it } from "vitest";
import { render, screen } from "@testing-library/svelte";
import PageTitle from "./PageTitle.svelte";

describe("PageTitle Component", () => {
  test("Renders PageTitle component with provided props", () => {
    const icon = "some-icon";
    const title = "Test Title";
    const content = "Test Content";

    render(PageTitle, { props: { icon, title, content } });

    const titleElement = screen.getByText(title);
    const contentElement = screen.getByText(content);

    expect(titleElement.innerHTML).toContain(title);
    expect(contentElement.innerHTML).toContain(content);
  });
});

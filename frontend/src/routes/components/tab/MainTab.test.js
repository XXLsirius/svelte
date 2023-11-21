import MainTab from "./MainTab.svelte";
import { fireEvent, render, screen } from '@testing-library/svelte';

describe("MainTab Component", () => {
    let tabAttrs = [
		{
			tabName: "Departure",
			tabHref: "tab-content-departure",
		},
		{
			tabName: "Navigation",
			tabHref: "tab-content-navigation",
		},
		{
			tabName: "Arrived",
			tabHref: "tab-content-arrived",
		},
	];

    test("should render the MainTab component", () => {

        render(MainTab, { tabAttrs });

        const firstTabNode = screen.getByText(/Departure/i)

        expect(firstTabNode).toBeTruthy()
    });

    test("should switch second tabs", async () => {
        render(MainTab, { tabAttrs });
    
        const secondTabElement = screen.getByText(/Navigation/i);
    
        fireEvent.click(secondTabElement)
    
        await screen.findByText(/Navigation/i);
    })

    test("should switch third tabs", async () => {
        render(MainTab, { tabAttrs });
    
        const thirdTabElement = screen.getByText(/Arrived/i);
    
        fireEvent.click(thirdTabElement)
    
        await screen.findByText(/Arrived/i);
    })
})


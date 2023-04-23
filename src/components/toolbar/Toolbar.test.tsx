import React from "react";
import { render, screen } from "@testing-library/react";
import { Toolbar } from "./Toolbar";

it("has a title", () => {
	render(<Toolbar />);
	const linkElement = screen.getByText(/table viewer/i);
	expect(linkElement).toBeInTheDocument();
});

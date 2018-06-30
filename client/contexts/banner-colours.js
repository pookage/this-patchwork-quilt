import React, { createContext } from "react";
import { colours } from "Data/colours.js";

export const colourOptions = colours;
export const defaultColourSelection = {
	base: {
		type: "base",
		defaultColor: colourOptions["e0d264"].colour,
		...colourOptions["e0d264"]
	},
	highlight: {
		type: "highlight",
		defaultColor: colourOptions["7f2727"].colour,
		...colourOptions["7f2727"]
	},
	accent: {
		type: "accent",
		defaultColor: colourOptions["252e59"].colour,
		...colourOptions["252e59"]
	}
};
export const BannerContext = React.createContext({
	colours: defaultColourSelection,
	overlayVisible: false,
	setColours: () => {},
	toggleOverlay: () => {}
});
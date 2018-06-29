import React, { createContext } from "react";

export const colourOptions = {
	snow: {
		colour: "FFFFFF",
		name: "Endless Winter"
	},
	blood: {
		colour: "8A0707",
		name: "Blood of Our Fallen"
	},
	ocean: {
		colour: "03104F",
		name: "Stormy Sea"
	}
};

export const defaultColourSelection = {
	base: {
		type: "base",
		defaultColor: colourOptions.snow.colour,
		...colourOptions.snow
	},
	highlight: {
		type: "highlight",
		defaultColor: colourOptions.blood.colour,
		...colourOptions.blood
	},
	accent: {
		type: "accent",
		defaultColor: colourOptions.ocean.colour,
		...colourOptions.ocean
	}
};
export const BannerContext = React.createContext({
	colours: defaultColourSelection,
	setColours: () => {}
});
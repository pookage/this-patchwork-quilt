import React, { createContext } from "react";

export const colourOptions = {
	"FFFFFF": {
		colour: "FFFFFF",
		name: "Endless Winter"
	},
	"8A0707": {
		colour: "8A0707",
		name: "Blood of Our Fallen"
	},
	"03104F": {
		colour: "03104F",
		name: "Stormy Sea"
	}, 
	"EAD94E": {
		colour: "EAD94E",
		name: "Wheat Harvest"
	}
};

export const defaultColourSelection = {
	base: {
		type: "base",
		defaultColor: colourOptions["FFFFFF"].colour,
		...colourOptions["FFFFFF"]
	},
	highlight: {
		type: "highlight",
		defaultColor: colourOptions["8A0707"].colour,
		...colourOptions["8A0707"]
	},
	accent: {
		type: "accent",
		defaultColor: colourOptions["03104F"].colour,
		...colourOptions["03104F"]
	}
};
export const BannerContext = React.createContext({
	colours: defaultColourSelection,
	setColours: () => {}
});
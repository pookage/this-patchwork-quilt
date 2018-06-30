import React, { createContext } from "react";

export const colourOptions = {
	"F0F0F0": {
		colour: "F0F0F0",
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
	},
	"228B22": {
		colour: "228B22",
		name: "Ancient Forest"
	}
};

export const defaultColourSelection = {
	base: {
		type: "base",
		defaultColor: colourOptions["EAD94E"].colour,
		...colourOptions["EAD94E"]
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
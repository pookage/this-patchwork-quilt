import React, { createContext } from "react";

export const colourOptions = {
	"e5e5e5": {
		colour: "e5e5e5",
		name: "Endless Winter",
		mantra: "this endless winter"
	},
	"8A0707": {
		colour: "8A0707",
		name: "Blood of Our Fallen",
		mantra: "the blood of our fallen"
	},
	"03104F": {
		colour: "03104F",
		name: "Stormy Sea",
		mantra: "this stormy sea"
	}, 
	"EAD94E": {
		colour: "EAD94E",
		name: "Wheat Harvest",
		mantra: "the bountiful harvest"
	},
	"228B22": {
		colour: "228B22",
		name: "Ancient Forest",
		mantra: "the ancient forest"
	}, 
	"ed6471": {
		colour: "ed6471",
		name: "Slapped Cheeks",
		mantra: "these slapped cheeks"
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
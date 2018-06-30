import React, { createContext } from "react";

export const colourOptions = {
	"e5e5e5": {
		colour: "e5e5e5",
		name: "Endless Winter",
		mantra: "this endless winter",
		description: "There is comfort in the cold; strength in the ice; relief from the hearth. We prevail."
	},
	"8A0707": {
		colour: "8A0707",
		name: "Blood of Our Fallen",
		mantra: "the blood of our fallen",
		description: "Our glorious dead are gone but never forgotten; we honour them and their deeds. We fight on."
	},
	"03104F": {
		colour: "03104F",
		name: "Stormy Sea",
		mantra: "this stormy sea",
		description: "The Sea roars; it breaks the unworthy and provides for those able enough to sail it. We ride it like a steed."
	}, 
	"EAD94E": {
		colour: "EAD94E",
		name: "Wheat Harvest",
		mantra: "the bountiful harvest",
		description: "These lands are our lands, and their fruits provide for us. We work, we toil, we feast."
	},
	"228B22": {
		colour: "228B22",
		name: "Ancient Forest",
		mantra: "the ancient forest",
		description: "The shade of the Great Oak gives reprieve from the sun, berries from the bush hunger, and water from the stream thirst. The forest provides - as do we."
	}, 
	"ed6471": {
		colour: "ed6471",
		name: "Slapped Cheeks",
		mantra: "these slapped cheeks",
		description: "God. Fucking. Dammit, Sho."
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
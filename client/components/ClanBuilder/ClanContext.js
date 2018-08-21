import React, { createContext } from "react";

export const ClanContext = React.createContext({
	name: "",
	colours: {
		base: "",
		highlight: "",
		accent: ""
	},
	setColour: (role, code) => {},
	setName: (name) => {}
});
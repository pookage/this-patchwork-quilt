import React, { createContext } from "react";

export const BannerContext = React.createContext({
	colours: {
		primary: "#000",
		highlight: "#555",
		accent: "#999"
	},
	setColours: (primary, highlight, accent) => {}
});
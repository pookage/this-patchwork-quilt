import React, { createContext } from "react";

export const BannerContext = React.createContext({
	colours: [
		"000",
		"555",
		"999"
	],
	setColours: ([primary, highlight, accent]) => {}
});
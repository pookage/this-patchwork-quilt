import React, { createContext } from "react";

export const BannerContext = React.createContext({
	colours: {},
	monkey: {},
	setColours: () => {}
});
import React, { createContext } from "react";

export const UIContext = React.createContext({
	openOverlay: (element) => {},
	closeOverlay: () => {}
});
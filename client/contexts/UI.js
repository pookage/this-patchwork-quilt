import React, { createContext } from "react";

export const UIContext = React.createContext({
	overlayVisible: false,
	toggleOverlay: () => {}
});
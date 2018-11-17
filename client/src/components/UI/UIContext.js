import React, { createContext } from "react";

export const UIContext = React.createContext({
	reportError: () => {},
	addEvent: () => {},
	errors: [],
	events: []
});


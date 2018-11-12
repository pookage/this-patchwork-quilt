import React, { createContext } from "react";

export const GameContext = React.createContext({
	mode: "EXPLORATION",
	speed: 1,
	debug: false,
	setMode: () => {},
	setSpeed: () => {},
	addTasksToClick: () => {},
	removeTasksFromClick: () => {}
});


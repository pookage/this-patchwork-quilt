import React, { createContext } from "react";

export const GameContext = React.createContext({
	mode: "EXPLORATION",
	speed: 1,
	debug: true,
	setMode: () => {},
	setSpeed: () => {},
	addTasksToClick: () => {},
	removeTasksFromClick: () => {}
});


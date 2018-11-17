import React, { createContext } from "react";

export const GameContext = React.createContext({
	mode: "EXPLORATION",
	speed: 0,
	debug: true,
	setMode: () => {},
	setSpeed: () => {},
	addTasksToClick: () => {},
	removeTasksFromClick: () => {}
});


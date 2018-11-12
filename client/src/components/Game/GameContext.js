import React, { createContext } from "react";

export const GameContext = React.createContext({
	mode: "EXPLORATION",
	speed: 1,
	setMode: () => {},
	setSpeed: () => {},
	addTasksToClick: () => {},
	removeTasksFromClick: () => {}
});


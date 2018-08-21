import React, { createContext } from "react";

export const AudioContext = React.createContext({
	playSound: (name) => {}
});
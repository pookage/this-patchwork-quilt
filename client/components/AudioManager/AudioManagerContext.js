import React, { createContext } from "react";

export const AudioManagerContext = React.createContext({
	playSound: (name) => {}
});
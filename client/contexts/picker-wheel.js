import React, { createContext } from "react";

export const PickerContext = React.createContext({
	visible: false,
	toggleVisiblity: () => {}
})
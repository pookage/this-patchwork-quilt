import React, { createContext } from "react";

export const ResourceContext = React.createContext({
	morale: 50,
	supplies: 50,
	followers: 5,
	updateResource: (key, difference) => {}
});


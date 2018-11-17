import React, { createContext } from "react";

export const ResourceContext = React.createContext({
	morale: 50,
	supplies: 50,
	companions: 5,
	storage: 100,
	charisma: 10,
	updateResource: (key, difference) => {}
});


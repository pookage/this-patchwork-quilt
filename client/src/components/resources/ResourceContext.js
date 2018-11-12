import React, { createContext } from "react";

export const ResourceContext = React.createContext({
	exhaustion: 0,
	supplies: 0,
	followers: 0,
	updateResource: (key, difference) => {}
});


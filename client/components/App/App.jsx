import React, { Component } from "react";
import fonts from "Assets/fonts/fonts.css";
import reset from "Utils/reset.css";
import ClanBuilder from "Components/ClanBuilder/ClanBuilder.jsx";

export default class App extends Component {
	render() {
		return (
        	<div>
	        	<ClanBuilder />
        	</div>
		);
	}
}
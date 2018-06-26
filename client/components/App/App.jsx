import React, { Component } from "react";
import reset from "Utils/reset.css";
import BannerBuilder from "Components/BannerBuilder/BannerBuilder.jsx";

export default class App extends Component {
	render() {
		return (
        	<div>
	        	<BannerBuilder />
        	</div>
		);
	}
}
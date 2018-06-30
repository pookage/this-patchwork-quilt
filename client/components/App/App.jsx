import React, { Component } from "react";
import { UIContext } from "Contexts/UI.js";
import fonts from "Assets/fonts/fonts.css";
import reset from "Utils/reset.css";
import ClanBuilder from "Components/ClanBuilder/ClanBuilder.jsx";

export default class App extends Component {

	//LIFECYCLE JAZZ
	//------------------------------
	constructor(...args){
		super(...args);

		//scope binding
		this.toggleOverlay = this.toggleOverlay.bind(this);

		this.state = {
			overlayVisible: false
		};
	}//constructor


	//EVENT HANDLING
	//------------------------------
	toggleOverlay(visible, event){

		console.log(visible, event);

		if(event && event.preventDefault) event.preventDefault();
		const nextOverlayVisible = visible !== undefined ? visible : !this.state.overlayVisible;
		this.setState({
			overlayVisible: nextOverlayVisible
		});	
	}//toggleOverlay

	//RENDER METHODS
	//------------------------------
	render() {

		const {
			overlayVisible
		} = this.state;

		const context = {
			overlayVisible,
			toggleOverlay: this.toggleOverlay
		};

		return (
        	<div>
        		<UIContext.Provider value={context}>
	        		<ClanBuilder />
	        	</UIContext.Provider>
        	</div>
		);
	}//render
}
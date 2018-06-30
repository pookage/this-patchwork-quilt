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

		//state initialisation
		this.state = {
			overlayVisible: false // (boolean) whether or not an overlay has been enabled somewhere
		};
	}//constructor


	//EVENT HANDLING
	//------------------------------
	toggleOverlay(overlayVisible, event){
		event.preventDefault();
		this.setState({
			overlayVisible
		});	
	}//toggleOverlay


	//RENDER METHODS
	//------------------------------
	render() {

		const {
			overlayVisible = false // (boolean) whether or not an overlay has been enabled somewhere
		} = this.state;

		// package together a state to give to the UIContext.Provider
		const UI = {
			overlayVisible,
			toggleOverlay: this.toggleOverlay
		};

		return (
        	<UIContext.Provider value={UI}>
        		<ClanBuilder />
        	</UIContext.Provider>
		);
	}//render
}
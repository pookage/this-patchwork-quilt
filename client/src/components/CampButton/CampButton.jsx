import React, { Component } from "react";
import { UIContext } from "Components/UI/UIContext.js";
import { GameContext } from "Components/Game/GameContext.js";
import { getUserLocation } from "Utils/geolocation.js";
import { storeNewLocation } from "Utils/server.js";

export default class Explore extends Component {

	constructor(...args){
		super(...args);

		//scope binding
		this.handleAction  = this.handleAction.bind(this);
		this.saveLocation  = this.saveLocation.bind(this);
		this.parseResponse = this.parseResponse.bind(this);

		//create namespaces for each context we'll be using functions from
		this.UI   = {};
		this.GAME = {};
	}//constructor



	//EVENT HANDLING
	//--------------------------------
	handleAction(event){
		event.preventDefault();

		new Promise(getUserLocation)
			.then(this.saveLocation)
			.then(this.parseResponse)
			.catch(this.UI.reportError);
	}//handleAction
	saveLocation(location){
		const {
			latitude,
			longitude
		} = location;

		return storeNewLocation(latitude, longitude);
	}//saveLocation
	parseResponse(response){
		switch(response.code){
			case 201:
				this.GAME.setMode("CAMP");
				break;
			default:
				throw response.message;
		}
	}//parseResponse


	//RENDER FUNCTIONS
	//--------------------------------
	render(){

		return[
			<button 
				onClick={this.handleAction}
				key="camp_button__camp_button">
				Make Camp
			</button>,
			<UIContext.Consumer key="camp_button__ui_consumer">
				{UI => { this.UI.reportError = UI.reportError }}
			</UIContext.Consumer>,
			<GameContext.Consumer key="camp_button__game_consumer">
				{GAME => { this.GAME.setMode = GAME.setMode }}
			</GameContext.Consumer>
		];
	}//render
}

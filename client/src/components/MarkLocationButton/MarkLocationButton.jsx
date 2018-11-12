import React, { Component } from "react";
import { UIContext } from "Components/UI/UIContext.js";
import { GameContext } from "Components/Game/GameContext.js";
import { getUserLocation } from "Utils/geolocation.js";
import { storeNewLocation } from "Utils/server.js";

export default class MarkLocationButton extends Component {

	constructor(...args){
		super(...args);

		//scope binding
		this.handleAction  = this.handleAction.bind(this);
		this.saveLocation  = this.saveLocation.bind(this);
		this.parseResponse = this.parseResponse.bind(this);

		//create namespaces for each context we'll be using functions from
		this.UI   = {};
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


	//UTILS
	//------------------------------------
	saveLocation(location){
		const {
			latitude,
			longitude
		} = location;

		return storeNewLocation(latitude, longitude);
	}//saveLocation
	parseResponse(response){

		const {
			onClick = () => {}
		} = this.props;

		switch(response.code){
			case 201:
				onClick();
				break;
			default:
				throw response.message;
		}
	}//parseResponse


	//RENDER FUNCTIONS
	//--------------------------------
	render(){

		const {
			children: label,
			onClick,
			...attributes
		} = this.props;

		return[
			<button 
				onClick={this.handleAction}
				key="camp_button__button__make_camp"
				{...attributes}>
				{label}
			</button>,
			<UIContext.Consumer key="camp_button__consumer__ui">
				{UI => { this.UI.reportError = UI.reportError }}
			</UIContext.Consumer>,
		];
	}//render
}

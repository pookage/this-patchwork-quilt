import React, { Component } from "react";
import { UIContext } from "Components/UI/UIContext.js";
import s from "Components/Explore/Explore.css";

export default class Explore extends Component {

	constructor(...args){
		super(...args);

		//scope binding
		this.handleAction       = this.handleAction.bind(this);
		this.updateUserLocation = this.updateUserLocation.bind(this);
		this.getUserLocation    = this.getUserLocation.bind(this);

		//create namespaces for each context we'll be using functions from
		this.UI = {};

		//setup any non-context scoped variables
		this.options = {
			geolocation: {
				enableHighAccuracy: true,
				timeout: 5000
			}
		};

		//initialise state
		this.state = {
			lat: 0,
			lng: 0
		};
	}//constructor


	//UTILS
	//------------------------------
	getUserLocation(resolve, reject){
		window.navigator.geolocation.getCurrentPosition(
			position => resolve(position.coords),
			error => reject(error),
			this.options.geolocation
		);
	}//getUserLocation
	updateUserLocation(coordinates){
		const {
			latitude,
			longitude
		} = coordinates;

		this.setState({
			latitude,
			longitude
		});
	}//updateUserLocation


	//EVENT HANDLING
	//--------------------------------
	handleAction(event){
		event.preventDefault();

		new Promise(this.getUserLocation)
			.then(this.updateUserLocation)
			.catch(this.UI.reportError);
	}//handleAction


	//RENDER FUNCTIONS
	//--------------------------------
	render(){

		const {
			latitude,
			longitude
		} = this.state;

		return[
			<UIContext.Consumer key="explore__ui_consumer">
				{UI => { this.UI.reportError = UI.reportError }}
			</UIContext.Consumer>,

			
			<form onSubmit={this.handleAction} key="explore__content">
				<input 
					type="submit"
					value="Get Location"
				/>
				{latitude && longitude && (
					<output className={s.location}>
						{latitude}, {longitude}
					</output>
				)}
			</form>
		];
	}//render
}
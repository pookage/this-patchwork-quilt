import React, { Component } from "react";
import { ResourceContext } from "Components/resources/ResourceContext.js";
import { UIContext } from "Components/UI/UIContext.js";
import ResourceMeter from "Components/resources/ResourceMeter/ResourceMeter.jsx";

export default class ResourceManager extends Component {

	constructor(...args){
		super(...args);

		console.log( );

		//scope binding
		this.updateResource = this.updateResource.bind(this);
		this.setResource    = this.setResource.bind(this);

		//local variables for scoping context
		this.UI = {};

		//grab defaults from the context
		const {
			morale, supplies, followers
		} = ResourceContext._currentValue;

		//initialise the state
		this.state = {
			morale, supplies, followers
		};
	}//constructor


	//UTILS
	//-----------------------------
	updateResource(key, difference){
		switch(key){
			//only allow the following resources to be updated
			case "morale":
			case "supplies":
			case "followers":
				const currentValue = this.state[key];
				const newValue     = currentValue + difference;
				this.setResource(key, newValue);
				break;

			default:
				this.UI.reportError(`Attempted to change an invalid resource : ${key}`);
		}
	}//updateResource
	setResource(key, value){
		const newState = {};
		newState[key]  = value;	
		this.setState(newState);
	}//setResource


	//RENDER FUNCTIONS
	//------------------------------
	render(){
		const {
			children
		} = this.props;

		const {
			morale,
			supplies,
			followers
		} = this.state;

		const data = {
			morale,
			supplies,
			followers,
			updateResource: this.updateResource
		};

		return [
			<fieldset key="resources__meters">
				<legend>
					Resources
				</legend>
				<ResourceMeter name="morale" value={morale} />
				<ResourceMeter name="supplies" value={supplies} />
				<ResourceMeter name="followers" value={followers} />
			</fieldset>,
			<ResourceContext.Provider value={data} key="resources__provider">
				{children}
			</ResourceContext.Provider>,
			<UIContext.Consumer key="resources__ui_consumer">
				{UI => { this.UI.reportError = UI.reportError }}
			</UIContext.Consumer>
		];
	}

}
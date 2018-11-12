import React, { Component } from "react";
import { ResourceContext } from "Components/resources/ResourceContext.js";
import { UIContext } from "Components/UI/UIContext.js";
import ResourceMeter from "Components/resources/ResourceMeter/ResourceMeter.jsx";

export default class ResourceManager extends Component {

	constructor(...args){
		super(...args);

		//scope binding
		this.updateResource = this.updateResource.bind(this);
		this.setResource    = this.setResource.bind(this);

		//local variables for scoping context
		this.UI = {};

		//initialise the state
		this.state = {
			exhaustion: 0,
			supplies: 50,
			followers: 5
		};
	}//constructor


	//UTILS
	//-----------------------------
	updateResource(key, difference){
		switch(key){
			//only allow the following resources to be updated
			case "exhaustion":
			case "supplies":
			case "followers":
				const currentValue = this.state[key];
				const newValue     = currentValue + difference;
				this.setResource(key, newValue);
				break;

			default:
				this.UI.reportError("Attempted to change an invalid resource");
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
			exhaustion,
			supplies,
			followers
		} = this.state;

		const data = {
			exhaustion,
			supplies,
			followers,
			updateResource: this.updateResource
		};

		return [
			<fieldset key="resources__meters">
				<legend>
					Resources
				</legend>
				<ResourceMeter name="exhaustion" value={exhaustion} />
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
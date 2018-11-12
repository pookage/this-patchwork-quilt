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
		this.UI               = {};
		this.moraleMultiplier = 10;

		//grab defaults from the context
		const {
			morale, supplies, followers, storage, charisma
		} = ResourceContext._currentValue;

		//initialise the state
		this.state = {
			morale, supplies, followers, storage, charisma
		};
	}//constructor


	//UTILS
	//-----------------------------
	updateResource(key, difference){

		try {
			switch(key){
				//only allow the following resources to be updated
				case "morale":
				case "supplies":
				case "followers":

					//only update if the new value isn't negative...
					const currentValue = this.state[key];
					let newValue       = currentValue + difference;
					if(newValue >= 0){

						const {
							storage, charisma, followers
						} = this.state;

						let cap;
						switch(key){
							case "supplies":
								cap = storage;
								break;
							case "morale":
								cap = followers * charisma;
								break;
							case "followers":
								cap = charisma;
								break;
						}

						//...or will exceed the current resource's max value
						if(newValue > cap) newValue = cap;
					} else newValue = 0;

					this.setResource(key, newValue)
					break;

				default:
					throw `Attempted to change an invalid resource : ${key}`;
			}
		} catch(error){
			this.UI.reportError(error)
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
			morale, supplies, followers,
			storage, charisma
		} = this.state;

		const data = {
			morale, supplies, followers,
			charisma,
			updateResource: this.updateResource
		};

		const maxMorale = followers * charisma;
		return [
			<fieldset key="resources__meters">
				<legend>
					Resources
				</legend>
				<ResourceMeter name="morale"    value={morale}    max={maxMorale} />
				<ResourceMeter name="supplies"  value={supplies}  max={storage}   />
				<ResourceMeter name="followers" value={followers} max={charisma}  />
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
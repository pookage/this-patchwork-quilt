import React, { Component } from "react";
import { ResourceContext } from "Components/resources/ResourceContext.js";
import { UIContext } from "Components/UI/UIContext.js";
import { GameContext } from "Components/Game/GameContext.js";
import ResourceMeter from "Components/resources/ResourceMeter/ResourceMeter.jsx";

export default class ResourceManager extends Component {

	constructor(...args){
		super(...args);

		const [
			props
		] = args;

		//scope binding
		this.updateResource          = this.updateResource.bind(this);
		this.setResource             = this.setResource.bind(this);
		this.lowMoraleRepercussion   = this.lowMoraleRepercussion.bind(this);
		this.lowSuppliesRepercussion = this.lowSuppliesRepercussion.bind(this);
		this.exportState             = this.exportState.bind(this);

		//local variables for scoping context
		this.UI               = {};
		this.GAME             = {};
		this.moraleMultiplier = 10;

		//grab defaults from the context
		const {
			morale, supplies, companions, storage, charisma
		} = props || ResourceContext._currentValue;

		//initialise the state
		this.state = {
			morale, supplies, companions, storage, charisma
		};
	}//constructor
	componentDidUpdate(prevProps, prevState){
		const {
			supplies: prevSupplies,
			morale: prevMorale
		} = prevState;
		const {
			morale,
			supplies,
			storage
		} = this.state;
		

		//add/remove repurcussions if morale hits/rises from 0
		const moraleUpdated   = morale != prevMorale;
		if(moraleUpdated){
			if(morale == 0){
				this.GAME.addTasksToTick([ this.lowMoraleRepercussion ]);
				this.UI.addEvent({
					time: new Date(),
					text: "Morale is low, we should find a way to raise spirits..."
				});
			}
			if(prevMorale == 0) this.GAME.removeTasksFromTick([ this.lowMoraleRepercussion ]);
		}

		//add/remove repurcissions if supplies hits/rise from 0
		const suppliesUpdated = supplies != prevSupplies;
		if(suppliesUpdated){
			if(supplies == storage){
				this.UI.addEvent({
					time: new Date(),
					text: "Our stores are full; we can't collect anymore supplies..."
				});
			} else if(supplies == 0){
			    this.GAME.addTasksToTick([ this.lowSuppliesRepercussion ]);
		    	this.UI.addEvent({
					time: new Date(),
					text: "Supplies are low; we should get out and find some more..."
				});
			}
			if(prevSupplies == 0) this.GAME.removeTasksFromTick([ this.lowSuppliesRepercussion ]);
		}


		if(this.GAME.debug){
			window.setResource = this.setResource;
		} else {
			window.setResource = null;
		}
	}//componentDidUpdate


	//UTILS
	//-----------------------------
	updateResource(key, difference){

		try {
			switch(key){
				//only allow the following resources to be updated
				case "morale":
				case "supplies":
				case "companions":

					//only update if the new value isn't negative...
					const currentValue = this.state[key];
					let newValue       = currentValue + difference;
					if(newValue >= 0){

						const {
							storage, charisma, companions
						} = this.state;

						let cap;
						switch(key){
							case "supplies":
								cap = storage;
								break;
							case "morale":
								cap = (companions || 1) * charisma;
								break;
							case "companions":
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
	lowMoraleRepercussion(){

		const dice   = Math.random();
		const chance = 0.075;
		if(dice < chance){
			this.updateResource("companions", -1);
			this.UI.addEvent({
				time: new Date(),
				text: "A companion has left the camp due to low morale."
			});
		} 
	}//lowMorale
	lowSuppliesRepercussion(){
		const dice   = Math.random();
		const chance = 0.075;

		if(dice < chance){
			this.updateResource("companions", -1);
			this.UI.addEvent({
				time: new Date(),
				text: "A companion has died from starvation."
			});
		}
	}//lowSupplies
	exportState(){
		return this.state;
	}//exportState


	//RENDER FUNCTIONS
	//------------------------------
	render(){
		const {
			children
		} = this.props;

		const {
			morale, supplies, companions,
			storage, charisma
		} = this.state;

		const data = {
			morale, supplies, companions,
			charisma, storage,
			updateResource: this.updateResource
		};

		const maxMorale = companions * charisma;
		return [
			<fieldset key="resources__meters">
				<legend>
					Resources
				</legend>
				<ResourceMeter name="morale"    value={morale}    max={maxMorale} />
				<ResourceMeter name="supplies"  value={supplies}  max={storage}   />
				<ResourceMeter name="companions" value={companions} max={charisma}  />
			</fieldset>,
			<ResourceContext.Provider value={data} key="resources__provider">
				{children}
			</ResourceContext.Provider>,
			<UIContext.Consumer key="resources__consumer__ui">
				{UI => { 
					this.UI.reportError = UI.reportError;
					this.UI.addEvent    = UI.addEvent;
				}}
			</UIContext.Consumer>,
			<GameContext.Consumer key="resources__consumer__game">
				{GAME => {
					this.GAME.addTasksToTick      = GAME.addTasksToTick;
					this.GAME.removeTasksFromTick = GAME.removeTasksFromTick;
					this.GAME.debug               = GAME.debug;
				}}
			</GameContext.Consumer>
		];
	}

}
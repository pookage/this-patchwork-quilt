import React, { Component } from "react";
import { GameContext } from "Components/Game/GameContext.js";
import { ResourceContext } from "Components/resources/ResourceContext.js";
import { UIContext } from "Components/UI/UIContext.js";
import MarkLocationButton from "Components/MarkLocationButton/MarkLocationButton.jsx";
import s from "Modes/Exploration/Exploration.css";

export default class Exploration extends Component {

	//LIFECYCLE JAZZ
	//---------------------------
	constructor(...args){
		super(...args);

		//scope binding
		this.explore  = this.explore.bind(this);
		this.makeCamp = this.makeCamp.bind(this);

		//contexts to be used 
		this.GAME      = {};
		this.RESOURCES = {};
		this.UI        = {};

	}//constructor
	componentDidMount(){
		this.GAME.addTasksToTick([this.explore]);
	}//componentDidMount
	componentWillUnmount(){
		this.GAME.removeTasksFromTick([this.explore]);
	}//componentWillUnmount
	
	

	//EVENT HANDLING
	//--------------------------------
	makeCamp(){

		const {
			companions
		} = this.RESOURCES;

		const foodEaten = 1 * companions;

		//set-up camp...
		this.GAME.setMode("CAMP");
		this.UI.addEvent({
			time: new Date(),
			text: "Let's pause here for some rest..."
		});

		//...and have a hearty meal
		this.RESOURCES.updateResource("supplies", -foodEaten);
		this.UI.addEvent({
			time: new Date(),
			text: "Everyone sits down for a hearty meal"
		});
	}//makeCamp	

	//UTILS
	//--------------------------------
	explore(){

		const dice               = Math.random();
		const threshold_MORALE   = 0;
		const threshold_SUPPLIES = 0.90;

		const {
			companions, supplies, storage
		} = this.RESOURCES;

		if(dice > threshold_MORALE) this.RESOURCES.updateResource("morale", -1);

		if(supplies < storage){
			let follower, roll;
			for(follower = 0; follower < companions; follower++){
				roll = Math.random();
				if(roll > threshold_SUPPLIES){
					this.RESOURCES.updateResource("supplies", 1);
					this.UI.addEvent({
						time: new Date(),
						text: "A follower has found some supplies"
					});
				}
			}
		}
	}//explore


	//RENDER FUNCTIONS
	//--------------------------------
	render(){

		return [
			<div key="exploration__wrapper">
				<p>
					Your companions are gathering supplies
				</p>
				<MarkLocationButton
					onClick={this.makeCamp}>
					Make Camp
				</MarkLocationButton>
			</div>,
			<ResourceContext.Consumer key="exploration__consumer__resource">
				{RESOURCES => { 
					this.RESOURCES.updateResource = RESOURCES.updateResource; 
					this.RESOURCES.companions     = RESOURCES.companions;
					this.RESOURCES.supplies       = RESOURCES.supplies;
					this.RESOURCES.storage        = RESOURCES.storage;
				}}
			</ResourceContext.Consumer>,
			<GameContext.Consumer key="exploration__consumer__game">
				{GAME => {
					this.GAME.addTasksToTick      = GAME.addTasksToTick;
					this.GAME.removeTasksFromTick = GAME.removeTasksFromTick;
					this.GAME.setMode             = GAME.setMode
				}}
			</GameContext.Consumer>,
			<UIContext.Consumer key="exploration__consumer__ui">
				{UI => {
					this.UI.addEvent = UI.addEvent;
				}}
			</UIContext.Consumer>
		];
	}//render
}
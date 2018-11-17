import React, { Component } from "react";
import { GameContext } from "Components/Game/GameContext.js";
import { ResourceContext } from "Components/resources/ResourceContext.js";
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

		//set-up camp and have a hearty meal
		this.GAME.setMode("CAMP");
		this.RESOURCES.updateResource("supplies", -foodEaten);
	}//makeCamp	

	//UTILS
	//--------------------------------
	explore(){

		const dice               = Math.random();
		const threshold_MORALE   = 0;
		const threshold_SUPPLIES = 0.90;

		if(dice > threshold_MORALE) this.RESOURCES.updateResource("morale", -1);

		let follower, roll;
		for(follower = 0; follower < this.RESOURCES.companions; follower++){
			roll = Math.random();
			if(roll > threshold_SUPPLIES) this.RESOURCES.updateResource("supplies", 1);
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
					this.RESOURCES.companions      = RESOURCES.companions;
				}}
			</ResourceContext.Consumer>,
			<GameContext.Consumer key="exploration__consumer__game">
				{GAME => {
					this.GAME.addTasksToTick      = GAME.addTasksToTick;
					this.GAME.removeTasksFromTick = GAME.removeTasksFromTick;
					this.GAME.setMode             = GAME.setMode
				}}
			</GameContext.Consumer>
		];
	}//render
}
import React, { Component } from "react";
import { GameContext } from "Components/Game/GameContext.js";
import { ResourceContext } from "Components/resources/ResourceContext.js";
import CampButton from "Components/CampButton/CampButton.jsx";
import s from "Modes/Exploration/Exploration.css";

export default class Exploration extends Component {

	//LIFECYCLE JAZZ
	//---------------------------
	constructor(...args){
		super(...args);

		//scope binding
		this.explore = this.explore.bind(this);

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
	

	//UTILS
	//--------------------------------
	explore(){
		const dice      = Math.random();
		const threshold = 0.8;

		if(dice > threshold) this.RESOURCES.updateResource("morale", -1);
	}//explore


	//RENDER FUNCTIONS
	//--------------------------------
	render(){

		return [
			<CampButton key="exploration__button__camp"/>,
			<ResourceContext.Consumer key="exploration__consumer__resource">
				{RESOURCES => { this.RESOURCES.updateResource = RESOURCES.updateResource; }}
			</ResourceContext.Consumer>,
			<GameContext.Consumer key="exploration__consumer__game">
				{GAME => {
					this.GAME.addTasksToTick      = GAME.addTasksToTick;
					this.GAME.removeTasksFromTick = GAME.removeTasksFromTick;
				}}
			</GameContext.Consumer>
		];
	}//render
}
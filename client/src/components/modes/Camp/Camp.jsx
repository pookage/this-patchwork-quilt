import React, { Component } from "react";
import { GameContext } from "Components/Game/GameContext.js";
import { ResourceContext } from "Components/resources/ResourceContext.js";

export default class Camp extends Component {

	//LIFECYCLE JAZZ
	//----------------------------------
	constructor(...args){
		super(...args);

		//scope binding
		this.rest      = this.rest.bind(this);
		this.breakCamp = this.breakCamp.bind(this);

		//local storage of contexts
		this.RESOURCES = {};
		this.GAME      = {};
	}//constructor
	componentDidMount(){
		this.GAME.addTasksToTick([ this.rest ]);
	}//componentDidMount
	componentWillUnmount(){
		this.GAME.removeTasksFromTick([ this.rest ]);
	}//componentWillUnmount


	//EVENT HANDLING
	//--------------------------------
	breakCamp(){
		this.GAME.setMode("EXPLORATION");
	}//breakCamp


	//UTILS
	//---------------------------------
	rest(){
		const dice                 = Math.random();
		const threshold_EXHAUSTION = 0.5;
		const threshold_SUPPLIES   = 0.9;

		if(dice > threshold_EXHAUSTION) this.RESOURCES.updateResource("morale", 1);
		if(dice > threshold_SUPPLIES)   this.RESOURCES.updateResource("supplies", -1);
	}//rest


	//RENDER FUNCTIONS
	//---------------------------------
	render(){
		return[
			<button 
				key="camp__button__break_camp"
				onClick={this.breakCamp}>
				Break Camp
			</button>,
			<ResourceContext.Consumer key="camp__consumer__resource">
				{RESOURCES => { this.RESOURCES.updateResource = RESOURCES.updateResource; }}
			</ResourceContext.Consumer>,
			<GameContext.Consumer key="camp__consumer__game">
				{GAME => {
					this.GAME.addTasksToTick      = GAME.addTasksToTick;
					this.GAME.removeTasksFromTick = GAME.removeTasksFromTick;
				}}
			</GameContext.Consumer>
		];
	}//render

}
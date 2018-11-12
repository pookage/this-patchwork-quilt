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
		const threshold_MORALE     = 0.85;
		const threshold_SUPPLIES   = 0.95;

		const {
			charisma, followers,
			updateResource
		} = this.RESOURCES;


		let increment;
		if(dice > threshold_MORALE){
			increment = (charisma / followers);
			updateResource("morale", increment);
		}
		if(dice > threshold_SUPPLIES){
			increment = 1 * followers;
			updateResource("supplies", -increment);
		}
	}//rest


	//RENDER FUNCTIONS
	//---------------------------------
	render(){
		return[
			<div key="camp__wrapper">
				<p>
					You sit and rest with your followers by the campfire
				</p>
				<button 
					onClick={this.breakCamp}>
					Break Camp
				</button>
			</div>,
			<ResourceContext.Consumer key="camp__consumer__resource">
				{RESOURCES => { 
					this.RESOURCES.updateResource = RESOURCES.updateResource; 
					this.RESOURCES.charisma       = RESOURCES.charisma;
					this.RESOURCES.followers      = RESOURCES.followers;
				}}
			</ResourceContext.Consumer>,
			<GameContext.Consumer key="camp__consumer__game">
				{GAME => {
					this.GAME.addTasksToTick      = GAME.addTasksToTick;
					this.GAME.removeTasksFromTick = GAME.removeTasksFromTick;
					this.GAME.setMode             = GAME.setMode;
				}}
			</GameContext.Consumer>
		];
	}//render

}
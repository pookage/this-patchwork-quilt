import React, { Component } from "react";
import { GameContext } from "Components/Game/GameContext.js";
import CampButton from "Components/CampButton/CampButton.jsx";
import s from "Modes/Exploration/Exploration.css";

export default class Exploration extends Component {

	//LIFECYCLE JAZZ
	//---------------------------
	constructor(...args){
		super(...args);

		this.GAME = {}
		
	}//constructor
	componentDidMount(){
		this.GAME.addTasksToTick([this.explore, this.wahey]);
	}//componentDidMount
	componentWillUnmount(){
		this.GAME.removeTasksFromTick([this.wahey]);
	}
	explore(){
		console.log("explore...")
	}
	wahey(){
		console.log("wahey");
	}


	//RENDER FUNCTIONS
	//--------------------------------
	render(){

		return[
			<CampButton key="exploration__camp_button"/>,
			<GameContext.Consumer key="exploration__game_consumer">
				{GAME => {
					this.GAME = {
						addTasksToTick: GAME.addTasksToTick,
						removeTasksFromTick: GAME.removeTasksFromTick
					}
				}}
			</GameContext.Consumer>
		];
	}//render
}
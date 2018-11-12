import React, { Component } from "react";
import { GameContext } from "Components/Game/GameContext.js";
import Exploration from "Modes/Exploration/Exploration.jsx";
import Camp from "Modes/Camp/Camp.jsx";
import ResourceManager from "Components/resources/ResourceManager.jsx";

export default class GameManager extends Component {

	constructor(...args){
		super(...args);

		this.setMode = this.setMode.bind(this);

		this.state = {
			mode: "EXPLORE"
		};
	}//constructor


	//UTILS
	//-------------------------
	setMode(mode){
		this.setState({ mode });
	}//setMode


	//RENDER FUNCTIONS
	//-------------------------
	render(){
		const {
			mode
		} = this.state;



		let ModeComp;
		switch(mode){
			case "CAMP":
				ModeComp = <Camp />
				break;
			case "EXPLORATION":
			default:
				ModeComp = <Exploration />
				break;
		}

		const data = {
			mode,
			setMode: this.setMode
		};

		return(
			<GameContext.Provider value={data}>
				<ResourceManager>
					{ModeComp}
				</ResourceManager>
			</GameContext.Provider>
		);
	}//render

}
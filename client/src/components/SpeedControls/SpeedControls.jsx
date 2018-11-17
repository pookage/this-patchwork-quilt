import React, { Component } from "react";
import { GameContext } from "Components/Game/GameContext.js";
import s from "Components/SpeedControls/SpeedControls.css";

export default class SpeedControls extends Component {

	//LIFECYCLE JAZZ
	//------------------------------
	constructor(...args){
		super(...args);

		this.renderButton = this.renderButton.bind(this);
		this.setSpeed     = this.setSpeed.bind(this);

		this.buttonLabels = [
			"Pause",
			"Normal",
			"Fast",
			"Super-Fast"
		];

		this.GAME = {};
	}//constructor


	//EVENT HANDLING
	//-----------------------------
	setSpeed(speed){
		this.GAME.setSpeed(speed);
	}//setSpeed


	//RENDER FUNCTIONS
	//-------------------------------
	renderButton(GAME, label, index){

		const {
			speed     // (number) current speed setting of the game
		} = GAME;

		const active   = speed == index;
		const cssLabel = label.toLowerCase();

		return(
			<button
				className={`${s.button} ${s[cssLabel]} ${active ? s.active : s.inactive}`}
				onClick={this.setSpeed.bind(true, index)}
				key={`speed_controls__${cssLabel}`}
				disabled={active}>
				{label}
			</button>
		);
	}//renderButton
	render(){
		return (
			<GameContext.Consumer>
				{GAME => {
					this.GAME.setSpeed = GAME.setSpeed; 
					const buttons = this.buttonLabels.map(this.renderButton.bind(true, GAME));
					return (
						<fieldset>
							<legend>
								Game Speed
							</legend>
							{buttons}
						</fieldset>
					);
				}}
			</GameContext.Consumer>
		);
	}//render

}
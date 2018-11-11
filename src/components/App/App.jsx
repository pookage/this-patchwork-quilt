import React, { Component } from "react";
import UIManager from "Components/UI/UIManager.jsx";
import Game from "Components/Game/Game.jsx";

export default class App extends Component {

	//RENDER FUNCTIONS
	//---------------------------
	render(){

		return(
			<UIManager>
				<Game />
			</UIManager>
		);
	}//render

}
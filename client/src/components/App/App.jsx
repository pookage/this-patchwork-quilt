import React, { Component } from "react";
import UIManager from "Components/UI/UIManager.jsx";
import GameManager from "Components/Game/GameManager.jsx";

export default class App extends Component {

	//RENDER FUNCTIONS
	//---------------------------
	render(){
		return(
			<UIManager>
				<GameManager />
			</UIManager>
		);
	}//render

}
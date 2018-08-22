import React, { Component } from "react";
import fonts from "Assets/fonts/fonts.css";
import reset from "Utils/reset.css";
import UIManager from "Components/UIManager/UIManager.jsx";
import AudioManager from "Components/AudioManager/AudioManager.jsx";
import ClanBuilder from "Components/ClanBuilder/ClanBuilder.jsx";

export default class App extends Component {

	//RENDER METHODS
	//------------------------------
	render() {

		return (
        	<UIManager>
        		<AudioManager>
        			<ClanBuilder />
        		</AudioManager>
        	</UIManager>
		);
	}//render
}
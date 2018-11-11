import React, { Component } from "react";
import Explore from "Components/Explore/Explore.jsx";

export default class Game extends Component {

	constructor(...args){
		super(...args);

		this.state = {
			mode: "explore"
		};
	}//constructor

	render(){
		const {
			mode
		} = this.state;

		switch(mode){
			case "explore":
			default:
				return <Explore />
		}
	}//render

}
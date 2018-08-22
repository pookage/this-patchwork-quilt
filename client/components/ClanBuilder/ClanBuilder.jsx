import React, { Component } from "react";
import { colours } from "Data/colours.js";
import { ClanContext } from "Components/ClanBuilder/ClanContext.js";
import BannerBuilder from "Components/BannerBuilder/BannerBuilder.jsx";
import MottoBuilder from "Components/MottoBuilder/MottoBuilder.jsx";
import s from "Components/ClanBuilder/ClanBuilder.css";

export default class ClanBuilder extends Component {

	constructor(...args){
		super(...args);

		//scope binding
		this.setColour = this.setColour.bind(this);

		//state initialisation
		this.state = {
			name: "Stark",
			colours: {
				base:      colours["e0d264"],
				highlight: colours["7f2727"],
				accent:    colours["252e59"]
			}
		};
	}//constructor

	//UTILS
	//--------------------------------
	setColour(role, hexcode){

		const colourState = { ...this.state.colours };
		const colourKey   = hexcode ? hexcode.split("#")[1] : "empty";
		colourState[role] = colours[colourKey];

		this.setState({
			colours: colourState
		});
	}//setColour
	setName(name){
		this.setState({ name });
	}//setNamn


	//RENDER FUNCTIONS
	//--------------------------------
	render(){

		const {
			name, colours
		} = this.state;

		const context = {
			setColour: this.setColour,
			name, colours
		};

		return(
			<div className={s.wrapper}>
				<ClanContext.Provider value={context}>
					<BannerBuilder className={s.banner} />
					<MottoBuilder className={s.motto}/>
				</ClanContext.Provider>
			</div>
		);
	}//render

}
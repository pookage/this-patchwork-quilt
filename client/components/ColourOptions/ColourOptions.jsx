import React, { Component } from "react";
import { colours } from "Data/colours.js";
import GemSocket from "Components/GemSocket/GemSocket.jsx";
import GemStone from "Components/GemStone/GemStone.jsx";
import s from "Components/ColourOptions/ColourOptions.css"

export default class ColourOptions extends Component {

	renderColourOption(colour, index){
		const {
			hexcode,
			hidden
		} = colour;

		if(!hidden){
			return(
				<GemSocket 
					source 
					className={s.item}
					HTMLTag="li"
					key={`colour_option_${hexcode}`}>
					<GemStone colour={hexcode} />
				</GemSocket>
			);
		}
	}//renderColourOption
	render(){

		const {
			className = "" // (string) any classes to apply to the wrapper element
		} = this.props;

		const colourSources = Object.values(colours).map(this.renderColourOption);
		return(
			<nav className={`${s.wrapper} ${className}`}>
				<ul className={s.list}>
					{colourSources}
				</ul>
			</nav>
		)
	}//render

}
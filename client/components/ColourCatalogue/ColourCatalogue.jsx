import React, { Component } from "react";
import { BannerContext } from "Contexts/banner-colours.js";
import ColourPicker from "Components/ColourPicker/ColourPicker.jsx";
import s from "Components/ColourCatalogue/ColourCatalogue.css";

export default class ColourCatalogue extends Component {
	
	//LIFECYCLE JAZZ
	//-------------------------------
	constructor(...args){
		super(...args);

		//scope binding
		this.renderColourPicker = this.renderColourPicker.bind(this);
	}//constructor


	//RENDER FUNCTIONS
	//--------------------------------
	renderColourPicker(data){
		const {
			colour,       // (string) hexadecimal value representing chosen colour (no # prepended)
			defaultColor, // (string) hex colour to fall-back to if no colour has been chosen
			name,         // (string) unique name for what the selected colour represents
			type,         // (string)[base, highlight, accent] what role the colour fills
		} = data;

		return(
			<ColourPicker 
				colour={colour}
				default={defaultColor}
				name={name}
				label={type}
				key={`${type}`}
			/>
		);
	}//renderColourPicker
	render(){

		return(
			<BannerContext.Consumer>
				{(context) => {

					const {
						colours = {} // (object) containing the currently selected colours
					} = context;

					//render out a colour picker for each of the colour roles
					const colourPickers = Object.values(colours).map(this.renderColourPicker);

					return(
						<div className={s.wrapper}>
							{colourPickers}
						</div>
					);
				}}
			</BannerContext.Consumer>
		)

	}

}
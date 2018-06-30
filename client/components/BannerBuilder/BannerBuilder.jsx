import React, { Component } from "react";
import { BannerContext, colourOptions, defaultColourSelection } from "Contexts/banner-colours.js";
import ColourCatalogue from "Components/ColourCatalogue/ColourCatalogue.jsx";
import BannerCanvas from "Components/BannerCanvas/BannerCanvas.jsx";
import s from "Components/BannerBuilder/BannerBuilder.css";

export default class BannerBuilder extends Component {
	
	constructor(...args){
		super(...args);

		//scope binding
		this.saveColour = this.saveColour.bind(this);

		//state initialisation
		this.state = {
			colours: defaultColourSelection
		};

	}//constructor

	saveColour(data){

		const {
			colour = "", // (string) hexcode for the colour to save
			name   = "", // (string) unique name for what the colour represents
			type   = ""  // (string)[base, highlight, accent] which role that the colour fulfills
		} = data;

		const colours        = { ...this.state.colours };
		colours[type].colour = colour;
		colours[type].name   = name;
		this.setState({
			colours
		});
	}//saveColour

	//RENDER METHODS
	//-----------------------------
	render(){

		const {} = this.props;

		const {
			colours = {} // (object) containing all of the currently selected colours
		} = this.state;

		const context = {
			colours,                    // (object) containing details about each currently selected colour
			colourOptions,              // (object) containing all the available colours to choose from
			saveColour: this.saveColour // (function) callback used to update the Provider's internal colour storage
		};

		return(
			<article class={s.wrapper}>
				<h1 class={s.title}>
					Banner Builder
				</h1>
				<form class={s.form}>
					<BannerContext.Provider value={context}>
						<ColourCatalogue />
						<output>
							<BannerCanvas />
						</output>
					</BannerContext.Provider>
				</form>
			</article>
		);
	}//render

}
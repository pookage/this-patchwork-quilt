import React, { Component } from "react";
import { BannerContext, colourOptions, defaultColourSelection } from "Contexts/banner-colours.js";
import Mantra from "Components/Mantra/Mantra.jsx";
import ColourCatalogue from "Components/ColourCatalogue/ColourCatalogue.jsx";
import BannerCanvas from "Components/BannerCanvas/BannerCanvas.jsx";
import s from "Components/ClanBuilder/ClanBuilder.css";

export default class ClanBuilder extends Component {
	
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
			type   = "", // (string)[base, highlight, accent] which role that the colour fulfills
			mantra = "no-one"
		} = data;

		const colours        = { ...this.state.colours };
		colours[type].colour = colour;
		colours[type].name   = name;
		colours[type].mantra = mantra;
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
			<article className={s.wrapper}>
				<form className={s.form}>
					<BannerContext.Provider value={context}>
						<header className={s.summary}>
							<h1 className={s.name}>
								<span className={s.prefix}>
									House
								</span>
								<input
									className={s.input} 
									type="text" 
									placeholder="Lancaster" 
								/>
							</h1>
							<Mantra />
						</header>
						<div className={s.banner}>
							<ColourCatalogue />
							<output>
								<BannerCanvas />
							</output>
						</div>
					</BannerContext.Provider>
				</form>
			</article>
		);
	}//render

}
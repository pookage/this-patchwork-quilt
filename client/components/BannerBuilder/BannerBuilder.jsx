import React, { Component } from "react";
import { BannerContext } from "Contexts/banner-colours.js";
import ColourCatalogue from "Components/ColourCatalogue/ColourCatalogue.jsx";


export default class BannerBuilder extends Component {
	
	constructor(...args){
		super(...args);

		this.saveColour    = this.saveColour.bind(this);

		this.state = {
			colours: {
				base: {
					colour: "FFF",
					defaultColor: "FFF",
					name: "",
					type: "base"
				},
				highlight: {
					colour: "DDD",
					defaultColor: "DDD",
					name: "",
					type: "highlight"
				}
			}
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
		this.setState({
			colours
		});
	}//saveColour

	//RENDER METHODS
	//-----------------------------
	render(){

		const {
			...remainingProps // (array) of every prop we haven't used
		} = this.props;

		const {
			colours = {} // (object) containing all of the currently selected colours
		} = this.state;

		const context = {
			colours,                    // (object) containing details about each currently selected colour
			saveColour: this.saveColour // (function) callback used to update the Provider's internal colour storage
		};

		return(
			<article>
				<h1>
					Banner Builder
				</h1>
				<form>
					<BannerContext.Provider value={context}>
						<ColourCatalogue />
						<output>
							<canvas 
								ref={(ref) => this.$canvas = ref} 
								{...remainingProps}
							/>
						</output>
					</BannerContext.Provider>
				</form>
			</article>
		);
	}//render

}
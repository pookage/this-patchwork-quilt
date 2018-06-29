import React, { Component } from "react";
import { BannerContext } from "Contexts/banner-colours.js";
import ColourPicker from "Components/ColourPicker/ColourPicker.jsx";

export default class BannerBuilder extends Component {
	
	constructor(...args){
		super(...args);

		this.saveColour    = this.saveColour.bind(this);
		this.renderPickers = this.renderPickers.bind(this);
		this.renderPicker  = this.renderPicker.bind(this);

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
			colour,
			type
		} = data;

		const colours        = { ...this.state.colours };
		colours[type].colour = colour;
		this.setState({
			colours
		});
	}//saveColour

	//RENDER METHODS
	//-----------------------------
	renderPicker(data){
		const {
			colour,
			defaultColor,
			name,
			type,
		} = data;

		return(
			<ColourPicker 
				colour={colour}
				default={defaultColor}
				name={name}
				label={type}
				key={`${type}_${name}`}
			/>
		);
	}//renderPicker
	renderPickers(data){

		const {
			colours = {}
		} = data;

		return Object.values(colours).map(this.renderPicker)
	}//renderPickers
	render(){

		const {
			...remainingProps
		} = this.props;

		const {
			colours = {}
		} = this.state;

		const context = {
			colours,
			saveColour: this.saveColour
		};

		return(
			<article>
				<h1>
					Banner Builder
				</h1>
				<BannerContext.Provider value={context}>
					<form>
						<BannerContext.Consumer>
							{this.renderPickers}
						</BannerContext.Consumer>
						<output>
							<canvas 
								ref={(ref) => this.$canvas = ref} 
								{...remainingProps}
							/>
						</output>
					</form>
				</BannerContext.Provider>
			</article>
		);
	}//render

}
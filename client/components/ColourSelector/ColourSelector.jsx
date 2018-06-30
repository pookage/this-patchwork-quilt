import React, { Component } from "react";
import { BannerContext } from "Contexts/banner-colours.js";
import s from "Components/ColourSelector/ColourSelector.css";

export default class ColourSelector extends Component {

	//LIFECYCLE JAZZ
	//---------------------------------
	constructor(...args){
		super(...args);

		//scope binding
		this.renderOption = this.renderOption.bind(this);
		this.updateColour = this.updateColour.bind(this);
	}//constructor


	//EVENT HANDLING
	//--------------------------------
	updateColour(context, event){

		const {
			label
		} = this.props;

		const {
			colourOptions = {},
			saveColour    = () => {}
		} = context;

		const {
			value: selectedColour = "" // (HTMLElement) the select elemnt that has been changed
		} = event.target;

		const newColour = colourOptions[selectedColour];
	
		//update the Provider!
		saveColour({
			...newColour,
			type: label
		});

	}//updateColour


	//RENDER METHODS
	//---------------------------------
	renderOption(data){

		const {
			id    = ""
		} = this.props;

		const {
			name   = "",
			colour = ""
		} = data;

		return(
			<option 
				value={colour} 
				key={`${id}_${colour}`}
				className={s.option}>
				{name}
			</option>
		)
	}//renderOption
	render(){

		const {
			id    = "",
			label = "",
			default: defaultOption = ""
		} = this.props;

		return(
			<BannerContext.Consumer>
				{context => {
					const {
						colourOptions = {},
						saveColour    = () => {}
					} = context;

					const options      = Object.values(colourOptions).map(this.renderOption);
					const defaultValue = colourOptions[defaultOption].colour;

					return (
						<select 
							id={id}
							defaultValue={defaultValue} 
							onChange={this.updateColour.bind(true, context)}>
							{options}
						</select>
					);
				}}
			</BannerContext.Consumer>
		);
	}//render

}
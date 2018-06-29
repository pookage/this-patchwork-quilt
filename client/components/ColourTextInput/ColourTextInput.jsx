import React, { Component } from "react";
import { BannerContext } from "Contexts/banner-colours.js";
import s from "Components/ColourTextInput/ColourTextInput.css";

export default class ColourTextInput extends Component {

	//LIFECYCLE JAZZ
	//-------------------------------
	constructor(...args){
		super(...args);

		//scope binding
		this.updateColour = this.updateColour.bind(this);
	}//constructor


	//EVENT HANDLING
	//--------------------------------
	updateColour(saveColour, event){

		const {
			key: keyPressed = "", // (string) the last letter that was pressed
			target,               // (HTMLElement) the input element triggering the event
		} = event;

		const {
			value: colour = "", // (string) value of text input intended to contain a colour hexcode
		} = target;

		const letter         = keyPressed.toUpperCase(); // force key to uppercase
		const isAlphanumeric = /^[A-Z0-9]/.test(letter); // confirm it's alphanumeric
		const validHexDigit  = letter < "G";             // confirm it's 0-F

		//if the key pressed is a valid hexademical colour digit, accept the input
		if(keyPressed && isAlphanumeric && validHexDigit){

			//only update the colour if it's a valid colour length
			const validLength = colour.length % 3 == 0;
			if(validLength){

				const {
					default: defaultColour, // (string) hexcode for the fallback colour to default to when no colour is selected
					label                   // (string)[base, highlight, accent] role that the colour represents (used as storage and label ID)
				} = this.props;

				//if we have a valid colour - that's the new one; otherwise use the default
				const newColour = colour || defaultColour;
				const name      = newColour; // we'll come up with a fancy way to name this later

				//update the Provider!
				saveColour({
					colour: newColour,
					name,
					type: label
				});
			}
		} 

		//...otherwise get sanitising...
		else {
			let newValue       = colour.slice(0, -1);         //remove their last keypress
			newValue           = newValue.replace(/\W/g, ""); //remove all non-alphanumeric characters
			event.target.value = newValue;                    //and replace input's value with new safe input
		}
	}//updateColour

	//RENDER METHODS
	//---------------------------
	render(){

		const {
			default: defaultColour = "", // (string) hexcode for the colour to revert to when the input is empty
			label                  = "", // (string)[base, highlight, accent] which role the colour fulfills
			id                     = ""  // (string) a converted version of the label safe to be used as an ID (used by label to point at input)
		} = this.props;

		return(
			<BannerContext.Consumer>
				{(context) => {

					const {
						saveColour = () => {} // (function) callback used to update the BannerContext.Provider's internal colour storage
					} = context;

					return(
						<input
							id={id}
							className={s.input}
							type="text" 
							placeholder={defaultColour}
							maxLength="6"
							onKeyUp={this.updateColour.bind(true, saveColour)}
						/>
					);
				}}
			</BannerContext.Consumer>
		);
	}//render

}
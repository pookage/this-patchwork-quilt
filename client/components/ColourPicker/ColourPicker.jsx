import React, { Component } from "react";
import { BannerContext } from "Contexts/banner-colours.js";
import s from "Components/ColourPicker/ColourPicker.css";

export default class ColourPicker extends Component {

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
			value: colour = "", // (string) value of text input
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
					default: defaultColour,
					label
				} = this.props;


				const newColour = colour || defaultColour;
				saveColour({
					colour: newColour,
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
	//---------------------------------
	render(props = this.props, state = this.state){

		const {
			colour = "",
			default: defaultColour = "",
			name   = "",
			label  = "", // (string) to apply to the picker's <label> element, also used to generate an ID for the <label> element
			...remainingProps
		} = props;

		//use the label to create an all lowercase and hyphenated id
		const type = label ? label.replace(/\s+/g, "-").toLowerCase() : "";

		return(
			<BannerContext.Consumer>
				{({saveColour}) => {
					return(
						<fieldset
							className={s.wrapper} 
							{...remainingProps}>
							{label && (
								<legend>
									<label htmlFor={type}>
										{label}
									</label>
								</legend>
							)}
							<div className={s.container}>
								<output 
									className={s.sample}
									style={{backgroundColor: `#${colour}`}}
								/>
								<input
									id={type}
									className={s.input}
									type="text" 
									placeholder={defaultColour}
									maxLength="6"
									ref={(ref) => this.$input = ref}
									onKeyUp={this.updateColour.bind(true, saveColour)}
								/>
							</div>
						</fieldset>
					);
				}}
			</BannerContext.Consumer>
		);
	}//render
}
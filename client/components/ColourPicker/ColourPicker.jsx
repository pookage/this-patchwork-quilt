import React, { Component } from "react";
import s from "Components/ColourPicker/ColourPicker.css";

export default class ColourPicker extends Component {

	//LIFECYCLE JAZZ
	//-------------------------------
	constructor(...args){
		super(...args);

		//scope binding
		this.updateColour = this.updateColour.bind(this);

		//state initialisation
		this.defaultState = {
			colour: "FFF" // (string) default colour value to apply to the picker
		};
		this.state = { ...this.defaultState };
	}//constructor
	componentDidMount(){
		this.$input.addEventListener("keyup", this.updateColour);
	}//componentDidMount
	componentWillUnmount(){
		this.$input.removeEventListener("keyup", this.updateColour);
	}//componentWillUnmount


	//EVENT HANDLING
	//--------------------------------
	updateColour(event){

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
				const newColour = colour || this.defaultState.colour;
				this.setState({
					colour: newColour
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
			label = "", // (string) to apply to the picker's <label> element, also used to generate an ID for the <label> element
			...remainingProps
		} = props;

		const {
			colour = "FFF" // (string) hexadecimal colour code to apply to the sample output
		} = state;

		//use the label to create an all lowercase and hyphenated id
		const pickerId = label ? label.replace(/\s+/g, "-").toLowerCase() : "";

		return(
			<figroup
				className={s.wrapper} 
				{...remainingProps}>
				{label && (
					<legend>
						<label htmlFor={pickerId}>
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
						id={pickerId}
						className={s.input}
						type="text" 
						placeholder="FFF"
						maxLength="6"
						ref={(ref) => this.$input = ref}
					/>
				</div>
			</figroup>
		);
	}//render
}
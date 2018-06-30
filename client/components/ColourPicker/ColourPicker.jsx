import React, { Component } from "react";
import { PickerContext } from "Contexts/picker-wheel.js";
import ColourTextInput from "Components/ColourTextInput/ColourTextInput.jsx"; // input version #1
import ColourSelector from "Components/ColourSelector/ColourSelector.jsx";    // input version #2
import ColourWheel from "Components/ColourWheel/ColourWheel.jsx";             // input version #3
import s from "Components/ColourPicker/ColourPicker.css";

export default class ColourPicker extends Component {

	//LIFECYCLE JAZZ
	//----------------------------------
	constructor(...args){
		super(...args);

		//scope binding
		this.toggleVisiblity = this.toggleVisiblity.bind(this);

		//state initialisation
		this.state = {
			visible: true // (boolean) whether or not to display the colour wheel for the picker
		};
	}//constructor


	//EVENT HANDLING
	//--------------------------------
	toggleVisiblity(event){
		if(event) event.preventDefault();
		this.setState({
			visible: !this.state.visible
		});
	}//toggleVisiblity


	//RENDER METHODS
	//---------------------------------
	render(){

		const {
			colour                 = "",   // (string) hexcode for the currently selected colour
			default: defaultColour = "",   // (string) hexcode for the fallback colour to default to when no colour is selected
			name                   = "",   // (string) unique name for the selected colour
			label                  = "",   // (string)[base, highlight, accent] role that the colour represents (used as storage and label ID)
			debug                  = false // (boolean) used to toggle power-user controls
		} = this.props;

		const {
			visible = false // (boolean) whether or not to display the colour wheel for the picker
		} = this.state;

		//use the label to create an all lowercase and hyphenated id
		const type       = label ? label.replace(/\s+/g, "-").toLowerCase() : "";

		//context to pass down to the colour wheel so that we can open and close it
		const context = {
			visible,
			toggleVisiblity: this.toggleVisiblity
		};

		//it's the same for all of the different inputs, so let's just enforce that by declaring here.
		const inputProps = { 
			id: type, 
			default: defaultColour,
			label
		};

		return(
			<fieldset
				className={s.wrapper}>
				<div className={s.container}>
					<output 
						className={s.sample}
						style={{backgroundColor: `#${colour}`}}
						onClick={context.toggleVisiblity}
					/>
					<PickerContext.Provider value={context}>
						<ColourWheel
							{ ...inputProps } 
						/>
					</PickerContext.Provider>
				</div>
			</fieldset>
		);
	}//render
}
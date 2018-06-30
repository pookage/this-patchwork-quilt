import React, { Component } from "react";
import { PickerContext } from "Contexts/picker-wheel.js";
import { UIContext } from "Contexts/UI.js";
import ColourWheel from "Components/ColourWheel/ColourWheel.jsx";
import common from "Utils/common.css";
import s from "Components/ColourPicker/ColourPicker.css";

export default class ColourPicker extends Component {

	//LIFECYCLE JAZZ
	//----------------------------------
	constructor(...args){
		super(...args);

		//scope binding
		this.toggleVisiblity = this.toggleVisiblity.bind(this);
		this.openPicker      = this.openPicker.bind(this);

		//state initialisation
		this.state = {
			visible: false // (boolean) whether or not to display the colour wheel for the picker
		};
	}//constructor


	//EVENT HANDLING
	//--------------------------------
	openPicker(contexts, event){

		const {
			Picker, // (object) containing state from the PickerContext.Provider
			UI      // (object) containing state from the UIContext.Provider
		} = contexts;

		Picker.toggleVisiblity(true, event);
		UI.toggleOverlay(true, event);
	}//openPicker
	toggleVisiblity(visible, event){
		event.preventDefault();
		this.setState({
			visible
		});
	}//toggleVisiblity


	//RENDER METHODS
	//---------------------------------
	render(){

		const {
			colour                 = "", // (string) hexcode for the currently selected colour
			default: defaultColour = "", // (string) hexcode for the fallback colour to default to when no colour is selected
			name                   = "", // (string) unique name for the selected colour
			type                   = "", // (string)[base, highlight, accent] role that the colour represents (used as storage and label ID)
		} = this.props;

		const {
			visible = false // (boolean) whether or not to display the colour wheel for the picker
		} = this.state;

		// package together a state to give to the PickerContext.Provider
		const Picker = {
			visible,
			toggleVisiblity: this.toggleVisiblity
		};

		return(
			<fieldset
				className={s.wrapper}>
				<div className={s.container}>
					<UIContext.Consumer>
						{UI => (
							<output 
								className={`${s.sample} ${UI.overlayVisible ? common.blur : ""}`}
								style={{backgroundColor: `#${colour}`}}
								onClick={this.openPicker.bind(true, { Picker, UI })}
							/>
						)}
					</UIContext.Consumer>
					<PickerContext.Provider value={Picker}>
						<ColourWheel
							default={defaultColour}
							type={type}
						/>
					</PickerContext.Provider>
				</div>
			</fieldset>
		);
	}//render
}
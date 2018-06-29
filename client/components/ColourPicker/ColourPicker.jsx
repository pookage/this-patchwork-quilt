import React, { Component } from "react";
import ColourTextInput from "Components/ColourTextInput/ColourTextInput.jsx";
import ColourSelector from "Components/ColourSelector/ColourSelector.jsx";
import s from "Components/ColourPicker/ColourPicker.css";

export default class ColourPicker extends Component {

	//RENDER METHODS
	//---------------------------------
	render(props = this.props, state = this.state){

		const {
			colour                 = "",   // (string) hexcode for the currently selected colour
			default: defaultColour = "",   // (string) hexcode for the fallback colour to default to when no colour is selected
			name                   = "",   // (string) unique name for the selected colour
			label                  = "",   // (string)[base, highlight, accent] role that the colour represents (used as storage and label ID)
			debug                  = false // (boolean) used to toggle power-user controls
		} = props;

		//use the label to create an all lowercase and hyphenated id
		const type = label ? label.replace(/\s+/g, "-").toLowerCase() : "";

		return(
			<fieldset
				className={s.wrapper}>
				<legend>
					<label htmlFor={type}>
						{`${label} : ${name}`}
					</label>
				</legend>
				<div className={s.container}>
					<output 
						className={s.sample}
						style={{backgroundColor: `#${colour}`}}
					/>
					{debug ? (
						<ColourTextInput 
							id={type}
							label={label}
							default={defaultColour}
						/>
					) : (
						<ColourSelector 
							id={type}
							label={label}
							default={defaultColour}
						/>
					)}
				</div>
			</fieldset>
		);
	}//render
}
import React, { Component } from "react";
import { PickerContext } from "Contexts/picker-wheel.js";
import { BannerContext } from "Contexts/banner-colours.js";
import s from "Components/ColourWheel/ColourWheel.css";

export default class ColourWheel extends Component {

	//LIFECYCLE JAZZ 
	//-----------------------------------
	constructor(...args){
		super(...args);

		//scope binding
		this.renderColour = this.renderColour.bind(this);

		this.colourData = []; // (array) containing all of the colours from the BannerContext.Provider
	}//constructor



	//RENDER METHODS
	//---------------------------------
	renderColour(colourCount, data, index){

		const {
			colour,
			name,
			mantra
		} = data;

		const colourRef = `wheel_picker_${colour}`;
		// const share     = 360 / colourCount;
		// const rotation  = index * share;


		//this should maybe be moved out so that we can do getComputedStyle
		const {
			outerHeight: windowHeight                    // (needs to actually be getComputedStyle(wrapper).width)
		} = window;
		const colourDiameter    = 50;                    //(needs to actually be getComputedStyle(colourRef).width)
		const colourMargin      = colourDiameter * 0.25; // needs to actually be getComputedStyle(colourRef).top

		const colourSpacing     = colourDiameter * 0.25;
		const wheelRadius       = (1 * windowHeight) / 2;
		const wheelCircumfrence = (Math.PI * 2) * (wheelRadius - colourDiameter);
		const share             = 360 * ((colourDiameter + colourSpacing) / wheelCircumfrence);
		const rotation          = index * share;

		return(
			<div 
				className={s.colourWrapper}
				key={colourRef}
				style={{transform: `rotate(${rotation}deg)`}}>
				<div 
					className={s.colour}
					style={{ backgroundColor: `#${colour}`}}
				/>
			</div>
		);
	}//renderColour
	render(){

		return(

			<PickerContext.Consumer>
				{pickerContext => {
					const {
						visible         = false,   // (boolean) whether or not to display the colour-wheel
						toggleVisiblity = () => {} // (function) callback used to toggle the visible state
					} = pickerContext;

					return(
						<BannerContext.Consumer>
							{bannerContext => {

								const {
									colourOptions = {},      // (object) containing all of the available colours
									saveColour    = () => {} // (function) callback used to save a colour from the available colourOptions
								} = bannerContext;

								const colourData = this.colourData = Object.values(colourOptions);
								const colours    = colourData.map(this.renderColour.bind(true, colourData.length));


								return(
									<div className={`${s.wrapper} ${visible ? s.visible : s.hidden}`}>
										<div 
											className={s.wheel}
											ref={(ref) => this.$wheel = ref}>
											<div className={s.colours}>
												{colours}
											</div>
											<button
												className={s.closeButton} 
												onClick={toggleVisiblity}>
												Close
											</button>
										</div>
									</div>
								);
							}}
						</BannerContext.Consumer>
					);
				}}
			</PickerContext.Consumer>
		);
	}

}
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
		this.renderColour      = this.renderColour.bind(this);
		this.layoutColours     = this.layoutColours.bind(this);

		this.colourData = [];    // (array) containing all of the colours from the BannerContext.Provider
		this.visible    = false; // (boolean) containing whether or not we 
	}//constructor
	componentDidMount(){
		const windowReadyCheck = setInterval(() => {
			if(window.innerHeight){
				clearInterval(windowReadyCheck);
				this.layoutColours(this.colourData);
				console.log("still intervalling")
			}
		}, 500);
	}//componentDidUpdate


	//UTILS
	//---------------------------------
	layoutColours(colours){

		const {
			innerHeight
		} = window;

		const wheelWidth    = this.$wheel.getBoundingClientRect().width;
		const wheelRadius   = wheelWidth / 2;
		const startRotation = 90;

		for(let index in colours){

			const {
				colour = ""
			} = colours[index];

			const ref            = `$wheel_picker_${colour}`;
			const swatchRef      = `${ref}_colour`;
			const element        = this[ref];
			const swatch         = this[swatchRef];

			const {
				width: colourWidth,
				top: colourMargin
			} = getComputedStyle(swatch);

			const colourDiameter    = parseInt(colourWidth);
			const distanceFromEdge  = colourDiameter + parseInt(colourMargin);
			const colourSpacing     = colourDiameter * 0.25;
			const wheelCircumfrence = (Math.PI * 2) * (wheelRadius - distanceFromEdge);
			const share             = 360 * ((colourDiameter + colourSpacing) / wheelCircumfrence);
			const rotation          = startRotation + (index * share);
			const transformStyle    = `rotate(${rotation}deg)`;

			element.style.transform = transformStyle;
		}
	}//layoutColours


	//RENDER METHODS
	//---------------------------------
	renderColour(colourCount, data, index){

		const {
			colour,
			name,
			mantra
		} = data;

		const key      = `wheel_picker_${colour}`;
		const refKey   = `$${key}`;
		const share    = 360 / colourCount;
		const rotation = share * index; 

		return(
			<div 
				className={s.colourWrapper}
				key={key}
				ref={(ref) => this[refKey] = ref}
				style={{transform: `rotate(${rotation}deg)`}}>
				<div 
					className={s.colour}
					ref={(ref) => this[`${refKey}_colour`] = ref}
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
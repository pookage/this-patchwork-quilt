import React, { Component } from "react";
import { PickerContext } from "Contexts/picker-wheel.js";
import { BannerContext } from "Contexts/banner-colours.js";
import { UIContext } from "Contexts/UI.js";
import s from "Components/ColourWheel/ColourWheel.css";

export default class ColourWheel extends Component {

	//LIFECYCLE JAZZ 
	//-----------------------------------
	constructor(...args){
		super(...args);

		//scope binding
		this.renderColour      = this.renderColour.bind(this);
		this.layoutColours     = this.layoutColours.bind(this);
		this.updateColour      = this.updateColour.bind(this);
		this.updatePreview     = this.updatePreview.bind(this);

		this.colourData = [];    // (array) containing all of the colours from the BannerContext.Provider

		this.defaultState = {
			preview: "" // (string) hexcode of the description for the currently active colour
		}
		this.state = { ...this.defaultState };
	}//constructor
	componentDidMount(){
		const windowReadyCheck = setInterval(() => {
			if(window.innerHeight){
				clearInterval(windowReadyCheck);
				this.layoutColours(this.colourData);
			}
		}, 500);
	}//componentDidUpdate


	//EVENT HANDLING
	//---------------------------------
	updatePreview(event){
		const {
			value
		} = event.target;

		this.setState({
			preview: value
		});
	}//updatePreview
	updateColour(pickerContext, bannerContext, event){

		const {
			label
		} = this.props;

		const {
			colourOptions = {},
			saveColour    = () => {}
		} = bannerContext;

		const {
			toggleVisiblity = () => {}
		} = pickerContext;

		const {
			value: selectedColour = "" // (HTMLElement) the select elemnt that has been changed
		} = event.target;

		const newColour = colourOptions[selectedColour];
	
		//update the Provider!
		saveColour({
			...newColour,
			type: label
		});

		//close the wheel
		toggleVisiblity();
	}//updateColour


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
			const colourSpacing     = colourDiameter * 0.10;
			const wheelCircumfrence = (Math.PI * 2) * (wheelRadius - distanceFromEdge);
			const share             = 360 * ((colourDiameter + colourSpacing) / wheelCircumfrence);
			const rotation          = (startRotation + (index * share) + (share / 2));
			const transformStyle    = `rotate(${rotation}deg)`;

			element.style.transform = transformStyle;
		}
	}//layoutColours


	//RENDER METHODS
	//---------------------------------
	renderColour(colourCount, pickerContext, bannerContext, data, index){

		const {
			colour,
			name,
			mantra
		} = data;

		const key      = `wheel_picker_${colour}`;
		const refKey   = `$${key}`;
		const share    = 360 / colourCount;
		const rotation = share * index; 

		const selected = this.props.default == colour;



		return(
			<div 
				className={s.colourWrapper}
				key={key}
				ref={(ref) => this[refKey] = ref}
				style={{transform: `rotate(${rotation}deg)`}}>
				<input 
					type="radio" 
					className={`${s.colour} ${selected ? s.selected : ""}`}
					ref={(ref) => this[`${refKey}_colour`] = ref}
					style={{ backgroundColor: `#${colour}`}}
					onClick={this.updateColour.bind(true, pickerContext, bannerContext)}
					onMouseOver={this.updatePreview}
					value={colour}
				/>
			</div>
		);
	}//renderColour
	render(){

		const {
			id    = "",
			label = "",
			default: defaultOption = ""
		} = this.props;

		const {
			preview = ""
		} = this.state;

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
									colourOptions = {},       // (object) containing all of the available colours
									saveColour    = () => {}, // (function) callback used to save a colour from the available colourOptions
								} = bannerContext;

								const colourData = this.colourData = Object.values(colourOptions);
								const colours    = colourData.map(this.renderColour.bind(true, colourData.length, pickerContext, bannerContext));
								
								const {
									name        = "", // (string) unique name of the current colour
									description = ""  // (string) a description of the colour and what it means
								} = colourOptions[preview || defaultOption];

								return(
									<div className={`${s.wrapper} ${visible ? s.visible : s.hidden}`}>
										<div 
											className={s.wheel}
											ref={(ref) => this.$wheel = ref}>
											<div className={s.info}>
												<h1 className={s.name}>
													{name}
												</h1>
												<p className={s.description}>
													{description}
												</p>
											</div>
											<div className={s.spinner}>
												<div className={s.colours}>
													{colours}
												</div>
												<UIContext.Consumer>
													{UI => {
														const {
															toggleOverlay = () => {}  // (function) callback to alert the provider that an overlay status has changed
														} = UI;

														return(
															<button
																className={s.closeButton} 
																onClick={(event) => {
																	toggleVisiblity(event);
																	toggleOverlay(false, event);
																	this.setState({ ...this.defaultState });
																}}>
																Close
															</button>
														);
													}}
												</UIContext.Consumer>
											</div>
										</div>
									</div>
								);
							}}
						</BannerContext.Consumer>
					);
				}}
			</PickerContext.Consumer>
		);
	}//render

}
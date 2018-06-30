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
		this.initialiseLayout  = this.initialiseLayout.bind(this);
		this.layoutColours     = this.layoutColours.bind(this);
		this.updateColour      = this.updateColour.bind(this);
		this.updatePreview     = this.updatePreview.bind(this);
		this.reset             = this.reset.bind(this);

		this.colourData = [];    // (array) containing all of the colours from the BannerContext.Provider

		this.defaultState = {
			preview: "" // (string) hexcode of the description for the currently active colour
		}
		this.state = { ...this.defaultState };
	}//constructor
	componentDidMount(){

		this.initialiseLayout();
	}//componentDidUpdate


	//EVENT HANDLING
	//---------------------------------
	updatePreview(event){
		const {
			value: preview // (string) hexcode of the colour currently being hovered
		} = event.target;

		this.setState({
			preview
		});
	}//updatePreview
	updateColour(contexts, event){

		const {
			type = "" // (string)[base, highlight, accent] which role the colour will be performing
		} = this.props;

		const {
			Banner, // (object) containing state from the BannerContext.Provider
			Picker, // (object) containing state from the PickerContext.Provider
			UI      // (object) containing state from the UIContext.Provider
		} = contexts;

		const {
			value: selectedColour = "" // (HTMLElement) the select elemnt that has been changed
		} = event.target;

		//look up all of the details for the selected colour
		const newColour = Banner.colourOptions[selectedColour];
	
		//update the Provider!
		Banner.saveColour({
			...newColour,
			type
		});

		//close the wheel and alert the UIContext.Provider that the overlay has gone
		Picker.toggleVisiblity(false, event);
		UI.toggleOverlay(false, event);
	}//updateColour
	reset(contexts, event){

		const { 
			Picker, // (object) containing state from the PickerContext.Provider
			UI      // (object) containing state from the UIContext.Provider
		} = contexts;

		Picker.toggleVisiblity(false, event);
		UI.toggleOverlay(false, event);
		this.setState({ ...this.defaultState });
	}//reset


	//UTILS
	//---------------------------------
	initialiseLayout(){
		//only calculate the layout for the colours once the window's ready
		const windowReadyCheck = setInterval(() => {
			if(window.innerHeight){
				clearInterval(windowReadyCheck);
				this.layoutColours(this.colourData);
			}
		}, 500);
	}//initialiseLayout
	layoutColours(colours){

		//figure out how big the wheel is as a starting point for the calculations.
		const wheelWidth    = this.$wheel.getBoundingClientRect().width;
		const wheelRadius   = wheelWidth / 2;

		//what angle should the first colour be at
		const startRotation = 90;

		for(let index in colours){

			const {
				colour = "" // (string) hexcode of the current colour
			} = colours[index];

			//grab references to the colour input and its wrapper
			const ref            = `$wheel_picker_${colour}`;
			const swatchRef      = `${ref}_colour`;
			const element        = this[ref];
			const swatch         = this[swatchRef];

			const {
				width: colourWidth, // (string) current css value of width (includes units)
				top: colourMargin   // (string) current css value of the top attribute (includes units)
			} = getComputedStyle(swatch);

			//calculate the radius of the implied circle around the center of all of the colours
			const colourDiameter    = parseInt(colourWidth);
			const distanceFromEdge  = colourDiameter + parseInt(colourMargin);
			const wheelCircumfrence = (Math.PI * 2) * (wheelRadius - distanceFromEdge);

			//determine how much of the circumfrence each colour needs to not overlap but still have some space
			const colourSpacing     = colourDiameter * 0.10;
			const share             = 360 * ((colourDiameter + colourSpacing) / wheelCircumfrence);

			//apply all all the calculations and rotate the fuckers!
			const rotation          = (startRotation + (index * share) + (share / 2));
			const transformStyle    = `rotate(${rotation}deg)`;
			element.style.transform = transformStyle;
		}
	}//layoutColours


	//RENDER METHODS
	//---------------------------------
	renderColour(colourCount, contexts, data, index){

		const {
			colour = "" // (string) hexcode of the colour to render out
		} = data;

		//create reference keys for the layoutColours function to use
		const key    = `wheel_picker_${colour}`;
		const refKey = `$${key}`;

		//create an initial rotation in-case we can't call layoutColours for whatever reason
		const share           = 360 / colourCount;
		const rotation        = share * index; 
		const defaultRotation = { transform: `rotate(${rotation}deg)` };

		//set the colour of the input to match the colour it represents
		const swatchColour    = { backgroundColor: `#${colour}` };

		//determine if this is the colour currently being used
		const selected = this.props.default == colour;

		return(
			<div
				className={s.colourWrapper}
				ref={(ref) => this[refKey] = ref} 
				style={defaultRotation}
				key={key}>
				<input
					className={`${s.colour} ${selected ? s.selected : ""}`} 
					ref={(ref) => this[`${refKey}_colour`] = ref}
					style={swatchColour}
					onClick={this.updateColour.bind(true, contexts)}
					onMouseOver={this.updatePreview}
					type="radio" 
					value={colour}
					checked={selected}
				/>
			</div>
		);
	}//renderColour
	render(){

		const {
			type                   = "", // (string)[base, highlight, accent] 
			default: defaultOption = ""  // (string) hexcode of the default colour for this type
		} = this.props;

		const {
			preview = "" // (string) hex colour reference of the colour who's description etc to preview
		} = this.state;

		return(
			<PickerContext.Consumer>
				{Picker => (
					<UIContext.Consumer>
						{UI => (
							<BannerContext.Consumer>
								{Banner => {

									//bundle up the contexts into a single variable to pass around as needed
									const contexts = {
										Banner, Picker, UI
									};

									//extract out only the values from the available colour options
									const colourData = this.colourData = Object.values(Banner.colourOptions);
									//then render them out as radio buttons
									const colours    = colourData.map(this.renderColour.bind(true, colourData.length, contexts));
									
									//extract the story data from the currently selected / hovered colour
									const {
										name        = "", // (string) unique name of the current colour
										description = ""  // (string) a description of the colour and what it means
									} = Banner.colourOptions[preview || defaultOption];

									return(
										<div className={`${s.wrapper} ${Picker.visible ? s.visible : s.hidden}`}>
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
													<button
														className={s.closeButton} 
														onClick={this.reset.bind(true, contexts)}>
														Close
													</button>
												</div>
											</div>
										</div>
									);
								}}
							</BannerContext.Consumer>
						)}
					</UIContext.Consumer>
				)}
			</PickerContext.Consumer>
		);
	}//render

}
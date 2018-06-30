import React, { Component } from "react";
import { PickerContext } from "Contexts/picker-wheel.js";
import { BannerContext } from "Contexts/banner-colours.js";
import s from "Components/ColourWheel/ColourWheel.css";

export default class ColourWheel extends Component {

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

								return(
									<div className={`${s.wrapper} ${visible ? s.visible : s.hidden}`}>
										<div className={s.wheel}>
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
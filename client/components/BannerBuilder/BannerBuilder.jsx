import React, { Component } from "react";
import { BannerContext } from "Contexts/banner-colours.js";
import ColourPicker from "Components/ColourPicker/ColourPicker.jsx";

export default class BannerBuilder extends Component {
	
	constructor(...args){
		super(...args);

		this.state = {};
	}//constructor

	renderUsedColours(props, state, context){

		/*
			NOTE : so, we're getting these values from the context. now we just need to figure out how to change them
		*/

		const {
			colours
		} = context;

		return(
			<footer>
				Colours used :
				<ol>
					<li>
						{colours.primary}
					</li>
					<li>
						{colours.highlight}
					</li>
					<li>
						{colours.accent}
					</li>
				</ol>
			</footer>
		);	
	}//renderUsedColours
	render(props = this.props, state = this.state){

		const {
			...remainingProps
		} = props;

		return(
			<article>
				<h1>
					Banner Builder
				</h1>
				<form>
					<ColourPicker label="Base Colour" />
					<ColourPicker label="Highlight Colour" />
					<ColourPicker label="AccentColour" />
					<output>
						<canvas 
							ref={(ref) => this.$canvas = ref} 
							{...remainingProps}
						/>
					</output>
					<BannerContext.Consumer>
						{this.renderUsedColours.bind(true, props, state)}
					</BannerContext.Consumer>
				</form>
			</article>
		);
	}//render

}
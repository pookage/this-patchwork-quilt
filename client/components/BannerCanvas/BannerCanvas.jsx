import React, { Component } from "react";
import { BannerContext } from "Contexts/banner-colours.js";
import s from "Components/BannerCanvas/BannerCanvas.css";

export default class BannerCanvas extends Component {

	//LIFECYCLE JAZZ
	//---------------------------------
	constructor(...args){
		super(...args);

		//scope binding
		this.drawColours = this.drawColours.bind(this);

		//non-rendering variables
		this.colours = {
			base: {},
			highlight: {},
			accent: {}
		};
	}//constructor
	componentDidMount(){

		this.drawColours(this.colours);
	}//componentDidMount
	componentDidUpdate(){

		this.drawColours(this.colours);
	}//componentDidUpdate


	//UTILS
	//--------------------------------
	drawColours(colours){

		const {
			base      = {},
			highlight = {},
			accent    = {}
		} = colours;

		const canvas  = this.$canvas;
		const context = canvas.getContext("2d");

		//grab height and width from CSS rather than inline
		const {
			height: heightPX,
			width: widthPX
		} = getComputedStyle(canvas);

		const height = parseInt(heightPX);
		const width  = parseInt(widthPX);

		//because it apparently freaks out unless it has an inline style too
		canvas.height = height;
		canvas.width  = width;


		const stripeWidth = width / 3;
		const half        = width / 2;
		const cutout      = height / 1.618;

		console.log(width, stripeWidth);

		//clear for clean canvas
		context.clearRect(0, 0, width, height);

		//define the triangular shape of the flag
		context.beginPath();
		context.moveTo(0, 0);
		context.lineTo(0, height);
		context.lineTo(half, cutout);
		context.lineTo(width, height);
		context.lineTo(width, 0);
		context.clip();

		//draw base colour
		context.fillStyle = `#${base.colour}`;
		context.fillRect(stripeWidth * 0, 0, stripeWidth, height);

		//draw highlight colour
		context.fillStyle = `#${highlight.colour}`;
		context.fillRect(stripeWidth * 1, 0, stripeWidth, height)

		//draw accent colour
		context.fillStyle = `#${accent.colour}`;
		context.fillRect(stripeWidth * 2, 0, stripeWidth, height)

	}//drawColours


	//RENDER METHODS
	//---------------------------------
	render(){
		return(
			<BannerContext.Consumer>
				{(context) => {

					const {
						colours = {}
					} = context;

					this.colours = colours;

					return(
						<canvas
							className={s.canvas}
							ref={(ref) => this.$canvas = ref} 
						/>
					);
				}}
			</BannerContext.Consumer>
		);
	}//render

}
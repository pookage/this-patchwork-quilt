import React, { Component } from "react";
import GemStone from "Components/GemStone/GemStone.jsx";
import s from "Components/GemSocket/GemSocket.css";

export default class GemSocket extends Component {

	constructor(...args){
		super(...args);

		this.setColour = this.setColour.bind(this);
		this.dragLeave = this.dragLeave.bind(this);
		this.dragDrop = this.dragDrop.bind(this);

		this.state = {
			gemColour: null
		};
	}

	//EVENT HANDLING
	//----------------------------
	colourUpdated(){
		console.log("ra")
	}
	dragEnter(event){
	//	console.log("enter")
	}
	dragLeave(event){
		const {
			target
		} = event;

	}
	dragOver(event){
		event.preventDefault();
		//console.log("over")
	}
	dragDrop(event){
		const colour = event.dataTransfer.getData("text");
		this.setState({
			colour
		});
	}

	//UTILS
	//-----------------------------
	setColour(colour){
		this.setState({
			colour
		});
	}//setColour


	//RENDER METHODS
	//-----------------------------
	render(){

		const {
			children: gemStone,
			...remainingProps
		} = this.props;

		const {
			colour
		} = this.state;

		const gemColour = (gemStone && gemStone.props.colour) || colour;

		return(
			<div
				ref={ref => this.$wrapper = ref} 
				className={s.wrapper}
				onDragEnter={this.dragEnter}
				onDragOver={this.dragOver}
				onDragLeave={this.dragLeave}
				onDrop={this.dragDrop}>
				{gemColour && (
					<GemStone 
						colour={gemColour} 
						removeGem={this.setColour.bind(true, null)}
					/>
				)}
				{colour && (
					<input					
						className={s.input} 
						type="color"
						defaultValue={colour}
					/>
				)}
			</div>
		);
	}//render

}
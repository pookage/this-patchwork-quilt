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
			colour: null
		};
	}

	//EVENT HANDLING
	//----------------------------
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
		//get the colour from the data set in the <GemStone>
		const colour = event.dataTransfer.getData("text");
		this.setColour(colour);
	}//dragDrop

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
			source = false,     // (boolean) whether or not the gem is a place to drag the gem from or to
			children: gemStone, // (VNode) the <GemStone> placed inside a source socket at creation to determine the colour it provides
			...remainingProps
		} = this.props;

		const {
			colour: currentColour = null // (string, null) the current colour set by the gem last dropped in it (only used for non-source sockets)
		} = this.state;

		//use the colour of the source gem if it's a source socket, or the colour from the state if not
		const gemColour = source ? gemStone.props.colour : currentColour;

		return(
			<div
				ref={ref => this.$wrapper = ref} 
				className={s.wrapper}
				onDragEnter={this.dragEnter}
				onDragOver={this.dragOver}
				onDragLeave={this.dragLeave}
				onDrop={this.dragDrop}>
				{gemColour && (
					<div className={s.container}>
						<GemStone 
							colour={gemColour} 
							removeGem={this.setColour.bind(true, null)}
						/>
						<input					
							className={s.input} 
							type="color"
							defaultValue={gemColour}
						/>
					</div>
				)}
			</div>
		);
	}//render

}
import React, { Component } from "react";
import { GemSocketContext } from "Components/GemSocket/GemSocketContext.js";
import GemStone from "Components/GemStone/GemStone.jsx";
import s from "Components/GemSocket/GemSocket.css";

export default class GemSocket extends Component {

	constructor(...args){
		super(...args);

		this.setColour = this.setColour.bind(this);
		this.dragDrop = this.dragDrop.bind(this);

		this.state = {
			colour: null // (string, null) the current colour set by the gem last dropped in it (only used for non-source sockets)
		};
	}

	//EVENT HANDLING
	//----------------------------
	dragOver(event){
		//do nothing - we just need to delcare this for the drag'n'drop to work
		event.preventDefault();
	}//dragOver
	dragDrop(event){
		//get the colour from the data set in the <GemStone> and update internal state to match
		const colour = event.dataTransfer.getData("text");
		this.setColour(colour);
	}//dragDrop


	//UTILS
	//-----------------------------
	setColour(colour){
		//if the colour has changed, assume that a new gem has been added to the socket and play the placed animation
		const placed = colour != this.state.colour;
		this.setState({
			colour,
			placed
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
			colour: currentColour = null, // (string, null) the current colour set by the gem last dropped in it (only used for non-source sockets)
			placed = false                // (boolean) whether or not to play the slam-down animation on the gem (due to new gem colour being placed)
		} = this.state;

		//create a context to pass into the provider
		const context = {
			placed,
			removeGem: this.setColour.bind(true, null)
		};

		//use the colour of the source gem if it's a source socket, or the colour from the state if not
		const gemColour = source ? gemStone.props.colour : currentColour;

		return(
			<div
				ref={ref => this.$wrapper = ref} 
				className={s.wrapper}
				onDragOver={this.dragOver}
				onDrop={this.dragDrop}
				onDragEnter={this.dragEnter}>
				<GemSocketContext.Provider value={context}>
					{gemColour && (
						<div className={s.container}>
							<GemStone colour={gemColour} />
							<input					
								className={s.input} 
								type="color"
								defaultValue={gemColour}
							/>
						</div>
					)}
				</GemSocketContext.Provider>
			</div>
		);
	}//render

}
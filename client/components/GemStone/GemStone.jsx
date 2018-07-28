import React, { Component } from "react";
import s from "Components/GemStone/GemStone.css";

export default class GemStone extends Component {

	constructor(...args){
		super(...args);

		this.setupDragData = this.setupDragData.bind(this);
		this.leftHome      = this.leftHome.bind(this);
		this.returnHome    = this.returnHome.bind(this);
		this.drag = this.drag.bind(this);
		this.move = this.move.bind(this);

		this.state = {
			drag: false
		};

	}//constructor
	componentWillUnmount(){
		window.removeEventListener("drag", this.move);
		cancelAnimationFrame(this.moveAnimation);
	}//componentWillUnmount



	//EVENT HANDLING
	//------------------------------
	drag(drag, event){

		let xDiff, yDiff;
		if(drag){
			window.addEventListener("drag", this.move);

			const {
				width, height,
				left, top
			} = this.$container.getBoundingClientRect();

			this.dragOrigin = {
				width, height,
				left, top
			};
			
		} else {

			const {
				removeGem
			} = this.props;

			const {
				removeOnDrop
			} = this.state;

			window.removeEventListener("drag", this.move);
			xDiff = 0;
			yDiff = 0;

			if(removeOnDrop) removeGem();
		}

		this.setState({
			xDiff, yDiff,
			drag
		});		
	}//drag
	move(event){
		this.moveAnimation = requestAnimationFrame(() => {
			const {
				clientX,
				clientY
			} = event;

			const {
				left, top,
				width, height
			} = this.dragOrigin;

			const centerX = width / 2;
			const centerY = height / 2;

			const xDiff = clientX - (left + centerX);//(screenX - left) - (width/2);
			const yDiff = clientY - (top + centerY);//(screenY - top) - (height/2);

			if(this.state.drag){
				this.setState({
					xDiff,
					yDiff
				});
			}
		})
	}//move
	setupDragData(event){
		event.dataTransfer.setData("text", this.props.colour);
		//hide the transparent image overlay
		event.dataTransfer.setDragImage(this.$empty, 0, 0);
	}//setupDragData
	leftHome(event){
		this.setState({
			removeOnDrop: true
		});
	}//
	returnHome(event){
		this.setState({
			removeOnDrop: false
		});
	}


	//RENDER METHODS
	//-------------------------------
	render(){

		const {
			colour = "#ff00ee"
		} = this.props;

		const {
			drag         = false,
			removeOnDrop = false,
			xDiff = 0,
			yDiff = 0
		} = this.state;

		return(
			<div
				draggable
				className={`${s.wrapper} ${drag ? s.dragging : s.resting}`}
				onDragStart={this.setupDragData}
				onDragLeave={this.leftHome}
				onDragEnter={this.returnHome}
				onMouseDown={this.drag.bind(true, true)}
				onDragEnd={this.drag.bind(true, false)}
				ref={ref => this.$wrapper = ref}>
				<div 
					className={s.container} 
					style={{ transform: `translate(${xDiff}px, ${yDiff}px)` }}>
					<div
						ref={(ref) => this.$container = ref}
						className={`${s.gem}`}
						style={{ backgroundColor: colour }}>
						<div ref={ref => this.$empty = ref} />
					</div>
				</div>
			</div>
		);
	}//render

}
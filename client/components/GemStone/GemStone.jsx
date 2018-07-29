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
		this.requestMove = this.requestMove.bind(this);
		this.tryToPop    = this.tryToPop.bind(this);

		this.state = {
			drag: false
		};

	}//constructor
	componentWillUnmount(){
		window.removeEventListener("drag", this.requestMove);
		cancelAnimationFrame(this.moveAnimation);
	}//componentWillUnmount



	//EVENT HANDLING
	//------------------------------
	drag(drag, event){

		let xDiff, yDiff;
		if(drag){
			window.addEventListener("drag", this.requestMove);

			const {
				width, height,
				left, top
			} = this.$container.getBoundingClientRect();

			this.dragOrigin = {
				width, height,
				left, top
			};

			this.setState({
				drag,
				placed: false
			});
			
		} else {

			const {
				removeGem
			} = this.props;

			const {
				removeOnDrop
			} = this.state;

			window.removeEventListener("drag", this.requestMove);
			xDiff = 0;
			yDiff = 0;

			if(removeOnDrop) removeGem();

			this.setState({
				xDiff, yDiff,
				drag,
				popped: false
			});		
		}
	}//drag
	requestMove(event){
		const {
			popped
		} = this.state;

		if(popped){
			this.moveAnimation = requestAnimationFrame(this.move.bind(true, event));
		}	
	}//requestMove

	move(event){

		if(this.$wrapper){
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
		}
	}//move
	setupDragData(event){
		event.dataTransfer.setData("text", this.props.colour);
		//hide the transparent image overlay
		event.dataTransfer.setDragImage(this.$empty, 0, 0);
	}//setupDragData
	leftHome(event){
		//BUG : if you leave quickly then this never fires
		this.setState({
			removeOnDrop: true
		});
	}//
	returnHome(event){
		this.setState({
			removeOnDrop: false
		});
	}
	tryToPop(event){
		const {
			animationName, 
			target
		} = event;

		if(animationName.indexOf("shake") > -1 && target == this.$container){
			this.setState({
				popped: true
			});
		}
	}


	//RENDER METHODS
	//-------------------------------
	render(){

		const {
			colour = "#ff00ee",
			placed = false
		} = this.props;

		const {
			drag         = false,
			removeOnDrop = false,
			xDiff        = 0,
			yDiff        = 0
		} = this.state;

		return(
			<div
				draggable
				className={`${s.wrapper} ${drag ? s.dragging : s.resting} ${!drag && placed ? s.placed : ""}`}
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
						style={{ backgroundColor: colour }}
						onAnimationEnd={this.tryToPop}>
						<div ref={ref => this.$empty = ref} />
					</div>
				</div>
			</div>
		);
	}//render

}
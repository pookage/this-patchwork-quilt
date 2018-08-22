import React, { Component } from "react";
import { AudioContext } from "Components/AudioManager/AudioContext.js";
import { GemSocketContext } from "Components/GemSocket/GemSocketContext.js";
import s from "Components/GemStone/GemStone.css";

export default class GemStone extends Component {

	constructor(...args){
		super(...args);

		this.setupDragData = this.setupDragData.bind(this);
		this.leftHome      = this.leftHome.bind(this);
		this.returnHome    = this.returnHome.bind(this);
		this.startDrag     = this.startDrag.bind(this);
		this.endDrag       = this.endDrag.bind(this);
		this.move          = this.move.bind(this);
		this.requestMove   = this.requestMove.bind(this);
		this.tryToPop      = this.tryToPop.bind(this);

		//initialise the default state
		this.state = this.defaultState = {
			dragging: false,
			popped: false,
			xDiff: 0,
			yDiff: 0,
		};
	}//constructor
	componentDidUpdate(prevProps, prevState){
		const {
			popped: prevPopped
		} = prevState;
		const {
			popped: currentPopped
		} = this.state;

		if(prevPopped != currentPopped){
			if(currentPopped){
				this.playSound("pop_short");
			}
		}

	}//componentDidUpdate
	componentWillUnmount(){
		//remove all listeners and animation frames
		window.removeEventListener("drag", this.requestMove);
		cancelAnimationFrame(this.moveAnimation);
	}//componentWillUnmount



	//EVENT HANDLING
	//------------------------------
	endDrag(removeGem, event){
		const {
			removeOnDrop // (boolean) whether or not the gem should be removed from its socket
		} = this.state;

		//stop moving the gem along with the cursor
		window.removeEventListener("drag", this.requestMove);

		//reset the gem to its start values
		this.setState({ ...this.defaultState });
		//if the gem has been dragged outside of its socket, then remove it entirely
		if(removeOnDrop) removeGem();
	}//endDrag
	startDrag(event){
		
		const {
			buttons // (number) the button that was pressed to trigger the event
		} = event;

		if(buttons == 1){
			//try to update the gem's position whenever the cursor is moved
			window.addEventListener("drag", this.requestMove);

			//get the gem's dimensions and position at the start of the drag...
			const {
				width, height,
				left, top
			} = this.$container.getBoundingClientRect();
			//...and then store them in a class variable to access outside of it
			this.dragOrigin = {
				width, height,
				left, top
			};

			//fire the shake animation and let the component know that we're dragging now
			this.setState({
				dragging: true
			});
		}
	}//startDrag
	requestMove(event){
		const {
			popped // (boolean) whether or the animation to pop the gem out of its socket has finished
		} = this.state;

		//if the gem has been popped out of its socket, you're allowed to move it.
		if(popped){
			this.moveAnimation = requestAnimationFrame(this.move.bind(true, event));
		}	
	}//requestMove
	move(event){

		if(this.$wrapper){
			const {
				clientX, // (number) horizontal coordinate of the cursor
				clientY  // (number) vertical coordinate of the cursor
			} = event;

			const {
				left, top,    // (number) of absolute pixels from the top left that the drag began at 
				width, height // (number) of x,y pixels that make up the gem's dimensions when the drag began
			} = this.dragOrigin;

			const {
				dragging // (boolean) whether or not the gem is still being dragged
			} = this.state;

			//calculate where the center of the gem is 
			const centerX = width / 2; 
			const centerY = height / 2;

			//calculate the relative distance between the cursor position and the gem's original position
			const xDiff = clientX - (left + centerX);
			const yDiff = clientY - (top + centerY);

			//if the gem is still being dragged - update its position
			if(dragging){
				this.setState({
					xDiff,
					yDiff
				});
			}
		}
	}//move
	setupDragData(event){
		//store the colour of the gem in 
		event.dataTransfer.setData("text", this.props.colour);
		//hide the transparent image overlay
		event.dataTransfer.setDragImage(this.$empty, 0, 0);
	}//setupDragData
	leftHome(event){
		//if the gem has been dragged out of its socket, then make sure it's removed from the socket when the drag completes
		//BUG : if you leave quickly then this never fires
		this.setState({
			removeOnDrop: true
		});
	}//leftHome
	returnHome(event){
		//if the gem has been dragged back to its own socket, don't remove it from the socket anymore
		this.setState({
			removeOnDrop: false
		});
	}//returnHome
	tryToPop(event){
		const {
			animationName, // (string) name of animation that triggered this event
			target         // (HTMLElement) that has finished an animation
		} = event;

		//if the container has been shaking, and that's what's just finished - consider the gem popped from its socket
		if(animationName.indexOf("shake") > -1 && target == this.$container){
			this.setState({
				popped: true
			});
		}
	}//tryToPop


	//RENDER METHODS
	//-------------------------------
	render(){

		const {
			colour = "#ff00ee" // (hexstring) what colour the gem should be
		} = this.props;

		const {
			dragging     = false, // (boolean) whether or not the gem is currently being dragged
			removeOnDrop = false, // (boolean) whether or not the gem has been dragged from its socket
			xDiff        = 0,     // (number) of horizontal pixels that the gem has moved from its original position
			yDiff        = 0      // (number) of vertical pixels that the gem has moved from its original position
		} = this.state;

		return(

			<AudioContext.Consumer>
				{AUDIO => {
					const {
						playSound
					} = AUDIO;

					//make the playSound function available outside of the render function
					this.playSound = playSound;
					return(
						<GemSocketContext.Consumer>
							{SOCKET => {
								const {
									placed,   // (boolean) whether or not this is gem has been recently placed / newly created
									removeGem // (function) callback to fire if the gem has been dragged out of its socket
								} = SOCKET;

								return(
									<div
										draggable
										ref={ref => this.$wrapper = ref}
										className={`${s.wrapper} ${dragging ? s.dragging : s.resting} ${!dragging && placed ? s.placed : ""}`}
										onDragStart={this.setupDragData}
										onDragLeave={this.leftHome}
										onDragEnter={this.returnHome}
										onMouseDown={this.startDrag}
										onDragEnd={this.endDrag.bind(true, removeGem)}>
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
							}}
						</GemSocketContext.Consumer>
					)
				}}
			</AudioContext.Consumer>
			
		);
	}//render

}
import React, { Component } from "react";
import { UIContext } from "Components/UIManager/UIContext.js";


export default class UIManager extends Component {

	//LIFECYCLE JAZZ
	//-------------------------------------
	constructor(...args){
		super(...args);

		//scope binding
		this.openOverlay  = this.openOverlay.bind(this);
		this.closeOverlay = this.closeOverlay.bind(this);

		//initialise state
		this.state = {
			overlay: {
				element: null,
				open: false
			}
		}
	}//constructor


	//UTILS
	//----------------------------------
	openOverlay(element){
		console.log(`Open overlay with : ${element}`);
		this.setState({
			overlay: {
				element,
				open: true
			}
		});
	}//openOverlay
	closeOverlay(){
		console.log(`Removing all overlays`);
		this.setState({
			overlay: {
				element: null,
				open: false
			}
		});
	}//closeOverlay


	//RENDER METHODS
	//----------------------------------
	render(){

		const {
			children = []
		} = this.props;

		const context = {
			openOverlay: this.openOverlay,
			closeOverlay: this.closeOverlay
		};

		return(
			<UIContext.Provider value={context}>
				{children}
			</UIContext.Provider>
		);
	}//render


}
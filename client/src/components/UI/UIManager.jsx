import React, { Component } from "react";
import { UIContext } from "Components/UI/UIContext.js";

export default class UIManager extends Component {

	//LIFECYCLE JAZZ
	//--------------------------------
	constructor(...args){
		super(...args);

		this.reportError = this.reportError.bind(this);

		this.state = {
			errors: []
		};
	}//constructor


	//UTILS
	//-----------------------------
	reportError(error){
		const {
			errors
		} = this.state;

		this.setState({
			errors: [
				...errors,
				error.toString()
			]
		});

		throw error;
	}//reportError


	//RENDER FUNCTIONS
	//-----------------------------
	renderError(message, index){
		return(
			<li key={`ui__error_${index}`}>
				{message}
			</li>
		);
	}//renderError
	render(){

		const {
			children = []
		} = this.props;

		const {
			errors: errorData
		} = this.state;

		const data = {
			reportError: this.reportError
		};

		const errors    = errorData.map(this.renderError);
		const hasErrors = errors.length > 0;

		return(
			<UIContext.Provider value={data}>
				{hasErrors && (
					<aside>
						<ul>
							{errors}
						</ul>
					</aside>
				)}

				{children}
			</UIContext.Provider>
		);
	}//render

}
import React, { Component } from "react";
import { UIContext } from "Components/UI/UIContext.js";
import Log from "Components/UI/Log/Log.jsx";

export default class UIManager extends Component {

	//LIFECYCLE JAZZ
	//--------------------------------
	constructor(...args){
		super(...args);

		this.reportError = this.reportError.bind(this);
		this.addEvent    = this.addEvent.bind(this);

		const {
			errors, events
		} = UIContext._currentValue;

		this.state = {
			errors,
			events
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
	addEvent(newEvent){
		this.setState(state => {
			const recentEvents = state.events.slice(-9);
			return({
				events: [
					...recentEvents,
					newEvent
				]
			});
		});
	}//addEvent


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
			errors: errorData,
			events,
		} = this.state;

		const data = {
			reportError: this.reportError,
			addEvent: this.addEvent,
			events
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
				<Log />
			</UIContext.Provider>
		);
	}//render

}
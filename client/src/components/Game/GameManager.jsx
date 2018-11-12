import React, { Component } from "react";
import { GameContext } from "Components/Game/GameContext.js";
import Exploration from "Modes/Exploration/Exploration.jsx";
import Camp from "Modes/Camp/Camp.jsx";
import ResourceManager from "Components/resources/ResourceManager.jsx";

export default class GameManager extends Component {

	constructor(...args){
		super(...args);

		//scope binding
		this.setMode             = this.setMode.bind(this);
		this.setSpeed            = this.setSpeed.bind(this);
		this.addTasksToTick      = this.addTasksToTick.bind(this);
		this.removeTasksFromTick = this.removeTasksFromTick.bind(this);
		this.performTasks        = this.performTasks.bind(this);
		this.updateTickInterval  = this.updateTickInterval.bind(this);

		//non-render-triggering variables
		this.tick = null;

		//grab default state values from the context
		const {
			mode, speed, debug
		} = GameContext._currentValue;

		//intialise the state
		this.state = {
			mode, speed, debug,
			tasks: []
		};
	}//constructor
	componentDidMount(){
		const {
			speed
		} = this.state;

		this.updateTickInterval(speed);

		window.debug = this.toggleDebug;
	}//componentDidMount
	componentDidUpdate(prevProps, prevState){
		const {
			speed: prevSpeed
		} = prevState;
		const {
			speed
		} = this.state;

		//if the speed has changed, then adjust the tick accordingly
		if(speed != prevSpeed) this.updateTickInterval(speed);
	}//componentDidUpdate
	componentWillUnmount(){
		window.clearInterval(this.tick)
	}//componentWillUnmount


	//UTILS
	//-------------------------
	addTasksToTick(newTasks){
		const {
			tasks
		} = this.state;

		//add each task to the tick
		tasks.push(...newTasks);
	}//addTasksToTick
	removeTasksFromTick(finishedTasks){
		const {
			tasks
		} = this.state;

		//find the index of, and remove, each given task from the tick
		let task, taskIndex;
		for(task of finishedTasks){
			taskIndex = tasks.indexOf(task);
			if(taskIndex > -1) tasks.splice(taskIndex, 1);
		}
	}//removeTasksFromTick
	setMode(mode){
		this.setState({ mode });
	}//setMode
	setSpeed(speed){
		this.setState({ speed });
	}//setSpeed
	updateTickInterval(speed){
		window.clearInterval(this.tick);
		const tickSpeed = speed * 1000;
		window.setInterval(this.performTasks, tickSpeed)
	}//updateTickInterval
	performTasks(){
		const {
			tasks
		} = this.state;

		for(let task of tasks) task();
	}//performTasks
	toggleDebug(){
		this.setState({
			debug: !this.state.debug
		});
	}//toggleDebug


	//RENDER FUNCTIONS
	//-------------------------
	render(){
		const {
			mode, speed, debug
		} = this.state;


		let ModeComp;
		switch(mode){
			case "CAMP":
				ModeComp = <Camp />
				break;
			case "EXPLORATION":
			default:
				ModeComp = <Exploration />
				break;
		}

		const data = {
			mode, speed, debug,
			setMode:             this.setMode,
			setSpeed:            this.setSpeed,
			addTasksToTick:      this.addTasksToTick,
			removeTasksFromTick: this.removeTasksFromTick
		};

		return(
			<GameContext.Provider value={data}>
				<ResourceManager>
					{ModeComp}
				</ResourceManager>
			</GameContext.Provider>
		);
	}//render

}
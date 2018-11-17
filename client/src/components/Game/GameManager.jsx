import React, { Component } from "react";
import { GameContext } from "Components/Game/GameContext.js";
import Exploration from "Modes/Exploration/Exploration.jsx";
import Camp from "Modes/Camp/Camp.jsx";
import SpeedControls from "Components/SpeedControls/SpeedControls.jsx";
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
		this.setState(state => ({
			tasks: [
				...state.tasks,
				...newTasks
			]
		}));
	}//addTasksToTick
	removeTasksFromTick(finishedTasks){
		const {
			tasks: currentTasks
		} = this.state;

		//create an alias of the current array of tasks
		let tasks = [ ...currentTasks ];

		//find the index of, and remove, each given task from the tick
		let task, taskIndex;
		for(task of finishedTasks){
			taskIndex = tasks.indexOf(task);
			if(taskIndex > -1) tasks.splice(taskIndex, 1);
		}

		//update the state functionally
		this.setState(state => ({ tasks }));
	}//removeTasksFromTick
	setMode(mode){
		this.setState({ mode });
	}//setMode
	setSpeed(speed){
		this.setState({ speed });
	}//setSpeed
	updateTickInterval(speed){
		window.clearInterval(this.tick);
		if(speed > 0){

			const tickSpeed = 1000 / speed;
			this.tick = window.setInterval(this.performTasks, tickSpeed)
		}
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
				<SpeedControls />
				<ResourceManager>
					{ModeComp}
				</ResourceManager>
			</GameContext.Provider>
		);
	}//render

}
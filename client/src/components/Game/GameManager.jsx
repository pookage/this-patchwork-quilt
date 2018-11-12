import React, { Component } from "react";
import { GameContext } from "Components/Game/GameContext.js";
import Exploration from "Modes/Exploration/Exploration.jsx";
import Camp from "Modes/Camp/Camp.jsx";
import ResourceManager from "Components/resources/ResourceManager.jsx";

export default class GameManager extends Component {

	constructor(...args){
		super(...args);

		this.setMode             = this.setMode.bind(this);
		this.setSpeed            = this.setSpeed.bind(this);
		this.addTasksToTick      = this.addTasksToTick.bind(this);
		this.removeTasksFromTick = this.removeTasksFromTick.bind(this);
		this.performTasks        = this.performTasks.bind(this);
		this.updateTickInterval  = this.updateTickInterval.bind(this);

		this.tick = null;

		this.state = {
			mode: "EXPLORE",
			speed: 1,
			tasks: []
		};
	}//constructor
	componentDidMount(){
		const {
			speed
		} = this.state;

		this.updateTickInterval(speed);
	}//componentDidMount
	componentDidUpdate(prevProps, prevState){
		console.log("componentUpdated")
		const {
			speed: prevSpeed
		} = prevState;
		const {
			speed,
			tasks
		} = this.state;

		if(speed != prevSpeed) this.updateTickInterval(speed);

		console.log(tasks)
	}//componentDidUpdate
	componentWillUnmount(){

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
		clearInterval(this.tick);
		const tickSpeed = speed * 1000;
		setInterval(this.performTasks, tickSpeed)
	}//updateTickInterval
	performTasks(){
		const {
			tasks
		} = this.state;

		for(let task of tasks) task();
	}//performTasks


	//RENDER FUNCTIONS
	//-------------------------
	render(){
		const {
			mode,
			speed
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
			mode,
			speed,
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
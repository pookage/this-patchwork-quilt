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
		this.saveGameToLocal     = this.saveGameToLocal.bind(this);
		this.loadSavedGame       = this.loadSavedGame.bind(this);

		//local vars for contexts that the game manager will use
		this.UI = {};

		//non-render-triggering variables
		this.tick            = null;
		this.localStorageKey = "TPQ__SAVEGAME";
		this.defaultSave    = {
			speed: 1,
			loadedResources: {}
		};

		//grab default state values from the context
		const {
			mode, speed, debug
		} = GameContext._currentValue;

		//intialise the state
		this.state = {
			mode, speed, debug,
			loadedResources,
			tasks: []
		};
	}//constructor
	componentDidMount(){
		const {
			speed
		} = this.state;

		//enable a debug toggle on the window
		window.debug = this.toggleDebug;
		//grab the savegame from localstorage if it exists
		this.loadSavedGame();
		//save the game to the localStorage before the tab closes
		window.addEventListener("beforeunload", this.saveGameToLocal);
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
		window.clearInterval(this.tick);
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
	saveGameToLocal(){
		const {
			morale, supplies, companions, storage, charisma
		} = this.$ResourceManager.exportState();
		const localSave = JSON.stringify({
			"mode": "CAMP",
			"resources" : {
				morale, supplies, companions, storage, charisma
			}
		});
		localStorage.setItem(this.localStorageKey, localSave);
	}//saveGameToLocal
	loadSavedGame(){
		const savedGame = window.localStorage.getItem(this.localStorageKey);
		if(savedGame) {
			const {
				mode,
				resources
			} = JSON.parse(savedGame);
			this.setState({
				mode,
				speed: 0, 
				loadedResources: resources
			});
		}
		else this.setState(this.defaultSave);
	}//loadSavedGame	


	//RENDER FUNCTIONS
	//-------------------------
	render(){
		const {
			mode, speed, debug, loadedResources,
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
				{loadedResources && (
					<ResourceManager
						ref={ref => this.$ResourceManager = ref}
						morale={loadedResources.morale}
						supplies={loadedResources.supplies}
						companions={loadedResources.companions}
						storage={loadedResources.storage}
						charisma={loadedResources.charisma}>
						{ModeComp}
					</ResourceManager>
				)}
			</GameContext.Provider>
		);
	}//render

}
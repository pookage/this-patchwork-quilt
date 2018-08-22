import React, { Component } from "react";
import { AudioContext } from "Components/AudioManager/AudioContext.js";

export default class AudioManager extends Component {


	//LIFECYCLE JAZZ
	//----------------------------------
	constructor(...args){
		super(...args);

		//scope binding
		this.play              = this.play.bind(this);
		this.pause             = this.pause.bind(this);
		this.pauseAll          = this.pauseAll.bind(this);
		this.removeFromPlaying = this.removeFromPlaying.bind(this);

		//initialise the state
		this.state = {
			playing: []
		};
	}//constructor
	componentWillUnmount(){
		//pause all audio elemnts and remove all listeners
		this.pauseAll();
	}//componentWillUnmount

	//EVENT HANDLING
	removeFromPlaying(event){
		const {
			target: audioFile // (HTMLMediaElement) that has either ended or paused
		} = event;

		const {
			playing = [] // (array) of HTMLMediaElements that the components believes is playing
		} = this.state;

		//remove all listeners from the page
		audioFile.removeEventListener("ended", this.removeFromPlaying);
		audioFile.removeEventListener("pause", this.removeFromPlaying);

		//remove the file from the internal storage of currently playing tracks
		const fileIndex      = playing.indexOf(audioFile);
		const updatedPlaying = [ ...playing ].splice(fileIndex, 1);

		//update the component's state of currently playing files so that it's accurate
		this.setState({
			playing: updatedPlaying
		});
	}//removeFromPlaying


	//UTILS
	//---------------------------------
	play(filename){

		const {
			playing = [] // (array) of currently playing HTMLMediaElements
		} = this.state;

		//grab the HTMLMediaElement from component storage
		const audioFile = this[filename];

		//add listeners to update the internal storage playing files if the file stops
		audioFile.addEventListener("ended", this.removeFromPlaying);
		audioFile.addEventListener("pause", this.removeFromPlaying);

		//start playing the file
		audioFile.play();

		//update the component state to include the now playing file
		this.setState({
			playing: [ ...playing, audioFile]
		});
	}//play
	pause(filename){
		//retrieve the file from the internal component storage, and call the HTMLMediaElement's pause
		const audioFile  = this[filename];
		audioFile.pause();
	}//pause
	pauseAll(){
		const {
			playing: audioFiles = [] // (array) of HTMLMediaElements that are currently playing
		} = this.state;

		let file, name;
		for(file of audioFiles){
			//get the name of the file, and use it to call this component's pause
			name = file.src.split(".mp3")[0];
			this.pause(name);
		}
	}//pauseAll



	//RENDER METHODS
	//---------------------------------
	render(){
		const {
			children = []
		} = this.props;

		const controls = {
			playSound: this.play,
			pauseSound: this.pause,
			pauseAllSound: this.pauseAll
		};

		return(
			<AudioContext.Provider value={controls}>
				<audio src="/client/assets/audio/pop.mp3" key="audio_pop" ref={(ref) => this["pop"] = ref} />
				<audio src="/client/assets/audio/pop_short.mp3" key="audio_pop_short" ref={(ref) => this["pop_short"] = ref} />
				{children}
			</AudioContext.Provider>
		);

	}//render

}
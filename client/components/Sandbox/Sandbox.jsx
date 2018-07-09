import React, { Component } from "react";
import GemSocket from "Components/GemSocket/GemSocket.jsx";
import s from "Components/Sandbox/Sandbox.css";

export default class Sandbox extends Component {

	render(){
		return(
			<div className={s.wrapper}>
				<GemSocket />
			</div>
		);
	}//render

}
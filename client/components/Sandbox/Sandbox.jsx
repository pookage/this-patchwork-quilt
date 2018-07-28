import React, { Component } from "react";
import GemSocket from "Components/GemSocket/GemSocket.jsx";
import GemStone from "Components/GemStone/GemStone.jsx";
import s from "Components/Sandbox/Sandbox.css";

export default class Sandbox extends Component {

	render(){
		return(
			<div className={s.wrapper}>
				<div className={`${s.example} ${s.source}`}>
					<GemSocket>
						<GemStone colour="#b71414" />
					</GemSocket>
					<GemSocket>
						<GemStone colour="#77b4ea" />
					</GemSocket>
				</div>
				<div className={s.example}>
					<GemSocket />
				</div>
				<div className={s.example}>
					<GemSocket />
				</div>
			</div>
		);
	}//render

}
import React, { Component } from "react";
import AudioManager from "Components/AudioManager/AudioManager.jsx";
import GemSocket from "Components/GemSocket/GemSocket.jsx";
import GemStone from "Components/GemStone/GemStone.jsx";
import s from "Components/Sandbox/Sandbox.css";

export default class Sandbox extends Component {

	render(){
		return(
			<AudioManager>
				<div className={s.wrapper}>
					<div className={`${s.example} ${s.source}`}>
						<GemSocket source>
							<GemStone colour="#b71414" />
						</GemSocket>
					</div>
					<div className={s.example}>
						<GemSocket />
						<GemSocket />
					</div>
				</div>
			</AudioManager>
		);
	}//render

}
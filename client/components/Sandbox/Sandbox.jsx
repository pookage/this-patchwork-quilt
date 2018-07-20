import React, { Component } from "react";
import GemSocket from "Components/GemSocket/GemSocket.jsx";
import GemStone from "Components/GemStone/GemStone.jsx";
import s from "Components/Sandbox/Sandbox.css";

export default class Sandbox extends Component {

	render(){
		return(
			<div className={s.wrapper}>
				<div className={`${s.example} ${s.source}`}>
					<GemSocket id="a">
						<GemStone colour="#b71414" />
					</GemSocket>
					<p>
						Source Gem
					</p>
				</div>
				<div className={s.example}>
					<GemSocket id="b"/>
					<p>
						Input socket A
					</p>
				</div>
				<div className={s.example}>
					<GemSocket id="c"/>
					<p>
						Input socket B
					</p>
				</div>
			</div>
		);
	}//render

}
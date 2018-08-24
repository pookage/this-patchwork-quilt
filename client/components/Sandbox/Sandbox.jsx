import React, { Component } from "react";
import Envelope from "Components/Envelope/Envelope.jsx";
import s from "Components/Sandbox/Sandbox.css";

export default class Sandbox extends Component {

	render(){
		
		return(
			<div className={s.wrapper}>
				<div>
					<p className={s.cta}>
						Open me!
					</p>
					<Envelope />
				</div>
			</div>
		);
		
	}//render

}
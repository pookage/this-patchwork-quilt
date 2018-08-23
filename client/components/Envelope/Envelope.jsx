import React, { Component } from "react";
import s from "Components/Envelope/Envelope.css";

export default class Envelope extends Component {

	render(){

		/*
			<polygon 
				points="0,155 0,130 133,0 266,130 266,155"
				fill="#f49e42"
			/>
			<polygon 
				points="0,100 0,84 50,0 100,84 100,100"
				fill="#f49e42"
			/>
		*/

		//1.2361504446763054603269240323943
		return(
			<div className={s.wrapper}>
				<div className={`${s.fold} ${s.topFlap}`}>
					<svg className={s.shape} viewBox="0 0 100 100" preserveAspectRatio="none">
						<polygon className={s.polygon} points="0,100 0,89 50,0 100,89 100,100" />
					</svg>
				</div>
				<div className={`${s.fold} ${s.bottomFlap}`}>
					<svg className={s.shape} viewBox="0 0 100 100" preserveAspectRatio="none">
						<polygon className={s.polygon} points="0,0 0,17 15,100 85,100 100,17 100,0" />
					</svg>
				</div>
				<div className={`${s.fold} ${s.sideFlap} ${s.left}`}>
					<svg className={s.shape} viewBox="0 0 100 100" preserveAspectRatio="none">
						<polygon className={s.polygon} points="100,0 84,0 0,50 84,100 100,100"
						/>
					</svg>
				</div>
				<div className={`${s.fold} ${s.sideFlap} ${s.right}`}>
					<svg className={s.shape} viewBox="0 0 100 100" preserveAspectRatio="none">
						<polygon className={s.polygon} points="0,0 16,0 100,50 16,100 0,100" />
					</svg>
				</div>
				
			</div>
		);
	}//render

}
import React, { Component } from "react";
import { UIContext } from "Components/UI/UIContext.js";
import s from "Components/UI/Log/Log.css";

export default class Log extends Component {

	renderEvent(data, index){

		const {
			time,
			text
		} = data;

		const hh = time.getHours().toString().padStart(2, "0");
		const mm = time.getMinutes().toString().padStart(2, "0");
		const ss = time.getSeconds().toString().padStart(2, "0");

		return(
			<li className={s.event}
				key={`${hh}${mm}${ss}_${index}`}>
				<time 
					className={s.time}
					dateTime={time.toString()}>
					{`${hh}:${mm}:${ss}`}
				</time>
				<span 
					className={s.text}>
					{text}
				</span>
			</li>
		);
	}//renderEvent
	render(){
		return(
			<UIContext.Consumer>
				{UI => {

					const {
						events: eventData
					} = UI;

					const events = eventData.map(this.renderEvent);

					return(
						<figure className={s.wrapper}>
							<figcaption className={s.title}>
								Recent Events
							</figcaption>
							<ul className={s.list}>
								{events}
							</ul>
						</figure>
					);
				}}
			</UIContext.Consumer>
		);
	}//render

}
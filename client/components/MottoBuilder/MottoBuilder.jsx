import React, { Component } from "react";
import { ClanContext } from "Components/ClanBuilder/ClanContext.js";
import s from "Components/MottoBuilder/MottoBuilder.css"

export default class MottoBuilder extends Component {

	render(){

		const {
			className = ""
		} = this.props;

		return(
			<output className={`${s.wrapper} ${className}`}>
				<ClanContext.Consumer>
					{CLAN => {
						const {
							base: lineOne, 
							highlight: lineTwo, 
							accent: lineThree
						} = CLAN.colours;

						return(
							<p>
								For {lineOne.mantra || "our cloudy minds"}
								<br/>
								and {lineTwo.mantra || "uncertain fingers"}
								<br/>
								we thank {lineThree.mantra || "our indecision"}
							</p>
						);
					}}
				</ClanContext.Consumer>
			</output>
		);
	}//render

}
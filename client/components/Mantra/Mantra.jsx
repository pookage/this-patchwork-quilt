import React, { Component } from "react";
import { BannerContext } from "Contexts/banner-colours.js";
import s from "Components/Mantra/Mantra.css";

export default class Mantra extends Component {
	
	render(){
		return(
			<BannerContext.Consumer>
				{Banner => {

					const {
						base,
						highlight,
						accent
					} = Banner.colours;

					return(
						<p className={s.wrapper}>
							<span className={s.line}>
								For {base.mantra}
							</span>
							<span className={s.line}>
								And {highlight.mantra}
							</span>
							<span className={s.line}>
								We thank {accent.mantra}
							</span>
						</p>
					);
				}}
			</BannerContext.Consumer>
		);
	}

}
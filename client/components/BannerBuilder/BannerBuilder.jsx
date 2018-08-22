import React, { Component } from "react";
import { ClanContext } from "Components/ClanBuilder/ClanContext.js";
import GemSocket from "Components/GemSocket/GemSocket.jsx";
import BannerCanvas from "Components/BannerCanvas/BannerCanvas.jsx";
import ColourOptions from "Components/ColourOptions/ColourOptions.jsx";
import s from "Components/BannerBuilder/BannerBuilder.css";

export default class BannerBuilder extends Component {

	//NOTE THIS NEEDS TO HAVE ALL THE COLOUR PICKER SHIT IN HERE TOO

	render(){

		const {
			className = ""
		} = this.props;

		return(
			<form className={`${s.wrapper} ${className}`}>
				<ColourOptions className={s.options}/>
				<div className={s.container}>
					<ClanContext.Consumer>
						{CLAN => {

							//extract the colour objects from the current clan colours
							const { base, accent, highlight } = CLAN.colours;

							return(
								<div className={s.selection}>
									<GemSocket
										className={s.socket} 
										colour={base.hexcode}
										role="base"
									/>
									<GemSocket 
										className={s.socket} 
										colour={highlight.hexcode} 
										role="highlight"
									/>
									<GemSocket 
										className={s.socket} 
										colour={accent.hexcode}
										role="accent"
									/>
								</div>
							);
						}}
					</ClanContext.Consumer>
					<BannerCanvas className={s.banner}/>
				</div>
			</form>
		);
	}//render

}
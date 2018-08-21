import React, { Component } from "react";
import BannerCanvas from "Components/BannerCanvas/BannerCanvas.jsx";

export default class BannerBuilder extends Component {

	//NOTE THIS NEEDS TO HAVE ALL THE COLOUR PICKER SHIT IN HERE TOO

	render(){
		return(
			<div>
				<BannerCanvas />
			</div>
		);
	}//render

}
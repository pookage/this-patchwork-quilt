import React, { Component, createContext } from "react";
import ColourPicker from "Components/ColourPicker/ColourPicker.jsx";

export default class BannerBuilder extends Component {
	
	constructor(...args){
		super(...args);

		this.state = {};
	}//constructor
	componentDidMount(){

	}//componentDidMount

	render(props = this.props, state = this.state){

		const {
			...remainingProps
		} = props;

		/*const { Provider, Consumer } = React.createContext({
			primary: "monkey",
			secondary: "balls"
		});*/

		return(
			<article>
				<h1>
					Banner Builder
				</h1>
				<form>
					<ColourPicker label="Base Colour" />
					<ColourPicker label="Highlight Colour" />
					<ColourPicker label="AccentColour" />
					<output>
						<canvas 
							ref={(ref) => this.$canvas = ref} 
							{...remainingProps}
						/>
					</output>
				</form>
			</article>
		);
	}//render

}
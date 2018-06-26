import React from 'react';

export default class BannerBuilder extends React.Component {
	
	constructor(...args){
		super(...args);

		this.state = {
			test: "Monkey"
		};
	}//constructor


	render(props = this.props, state = this.state){

		return(
			<canvas />
		);
	}//render

}
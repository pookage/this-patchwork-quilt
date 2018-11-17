import React, { Component } from "react";
import s from "Components/resources/ResourceMeter/ResourceMeter.css";

export default class ResourceMeter extends Component {


	render(){

		const {
			name  = "",
			min   = 0,
			max   = 100,
			value = 0,
			...attributes
		} = this.props;

		const id   = `resources__meter__${name}`;
		const low  = max * 0.2;

		return(
			<div className={s.wrapper}>
				<label
					className={s.label} 
					htmlFor={id}>
					{name}
				</label>
				<meter
					className={`${s.meter} ${s[name]}`} 
					id={id}
					low={low}
					min={min}
					max={max}
					value={value} 
					{...attributes}
				/>
				{`${value}/${max}`}
			</div>
		);
	}//render

}
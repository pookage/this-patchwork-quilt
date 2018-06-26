import React from 'react';
import BannerBuilder from "Components/BannerBuilder/BannerBuilder.jsx";
import styles from "./App.css";

export default class App extends React.Component {
	render() {
		return (
        	<div>
        		<h1 className={styles.test}>
	        		Hello World
	        	</h1>
	        	<p>
	        		Bugger off, world...
	        	</p>
	        	<BannerBuilder />
        	</div>
		);
	}
}
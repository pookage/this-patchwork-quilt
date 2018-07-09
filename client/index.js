import React from 'react';
import ReactDOM from 'react-dom';
import { getQueryParams } from "Utils/utils.js";
import App from './components/App/App.jsx';
import Sandbox from "Components/Sandbox/Sandbox.jsx";


const {
	sandbox = false
} = getQueryParams();

if(sandbox){
	ReactDOM.render(<Sandbox />, document.getElementById('root'));
} else {
	ReactDOM.render(<App />, document.getElementById('root'));
}
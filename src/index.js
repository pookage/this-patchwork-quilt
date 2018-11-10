import s from "./style.css";
import TestImage from "Assets/desk-corner.jpg";
import whatever from "Components/example/example.js"

function component(){

	const mode = process.env.NODE_ENV)
	
	switch(mode){
		case "production":
			break;
		case "development":
			break;
	}

	whatever()

	const element     = document.createElement("h1");
	element.innerText = "Testing: 1,2,3,4,5";
	element.classList.add(s.test);
	return element;
}

const image = new Image();
image.src = TestImage;

document.body.appendChild(component());
document.body.appendChild(image);
//dependencies
const express    = require("express");
const bodyParser = require("body-parser");
const http       = require("http");

//setup
const app    = express();
const server = http.Server(app);
const port   = 8017;

//middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(configureHeaders);

console.log(`Server Started: listening on PORT ${port}`);
server.listen(port);

app.post("/locations/new/", saveNewLocation);


function configureHeaders(request, response, next){
	response.setHeader("Access-Control-Allow-Origin", "https://localhost:8080");
	response.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	next();
}//configureHeaders

function saveNewLocation(request, response){

	const {
		lat, lng
	} = request.body;

	console.log(lat, lng)
	response.send({
		message: "aye"
	})
}//test

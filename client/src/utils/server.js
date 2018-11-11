const CONFIG = {
	server: "http://localhost:8017"
};


function storeNewLocation(lat, lng){
	return fetch(`${CONFIG.server}/locations/new/`, {
		headers: {
			'Content-Type': 'application/json'
		},
		method: 'POST',
		body: JSON.stringify({ lat, lng })
	}).then(response => response.json())
	.then((response) => response);
}//storeNewLocation

export {
	storeNewLocation
}
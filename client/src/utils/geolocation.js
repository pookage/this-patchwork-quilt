const CONFIG = {
	enableHighAccuracy: true
};

function getUserLocation(resolve, reject){
	window.navigator.geolocation.getCurrentPosition(
		position => resolve(position.coords),
		error => reject(error),
		CONFIG
	);
}//getUserLocation

export {
	getUserLocation
};
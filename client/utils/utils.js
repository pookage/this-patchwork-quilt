function getQueryParams(queryString){

	console.log(typeof window)

	if(typeof window != "undefined"){
		const queryParams = queryString || window.location.search.substr(1);	

		//get the url query params and split into an array of key:value pairs
		const queries     = queryParams.split("&");

		//iterate over key:values and store them inside an object for ease of use
		const params = {};
		for(let query of queries){
			let [ key, value ] = query.split("=")
			params[key]        = value;
		}

		return params;
	} else return {};

}//getQueryParams


export {
	getQueryParams
};
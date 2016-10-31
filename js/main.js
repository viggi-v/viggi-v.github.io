function mydelay(millisec){
	var mytimer = setInterval(donothing,10);
	function donothing(){
		millisec--;
		if(millisec<0){
			clearInterval(mytimer);
			console.log("clear");
		}
		return;
	}
	return;
}

$(document).ready(function(){
	console.log("Initialising...");
	mydelay(5000000);
	console.log("5 secs over");
	mydelay(1000);
	console.log("another second over");
});
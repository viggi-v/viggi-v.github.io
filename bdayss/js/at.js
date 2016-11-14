$(document).ready(function(){
	generateDiv();
});
function generateRandomPoints(){
	var width = $("body").width();
	var height = $("body").height();
	var x = Math.random()*width; 
	var y = Math.random()*height;
	var number={};
	number.x = width-x;
	number.y = height-y;
	return number;
}
var count = 0;
function generateDiv(){
	var id="elem"+count;
	count++;
	number = generateRandomPoints();
	document.getElementById('op').innerHTML+="<div id='"+id+"'class='textb'>Hooy!</div>"
	$("#"+id).css({"top":100+"px","right":100+"px"});
	console.log(number);
}


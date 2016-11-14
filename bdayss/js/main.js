var googleList = [];
var count=1;
$(".list_item").mouseenter(function(){
	console.log("hoo");
});
$(window).scroll(function(){
	if($(this).scrollTop() > 1){
		$(".top_nav").addClass("sticky");
	}
	else
		$(".top_nav").removeClass("sticky");
});
function myopen(str){
	str = str.slice(0,str.length-7)+"_popup";
	$(".popup").css({"display":"none"});
	document.getElementById(str).style.display = "block";
}
function myclose(str){
	str = str.slice(0,str.length-6)+"_popup";
	document.getElementById(str).style.display = "none";
}
function toggleNav(){
	$(".google_list").toggleClass("visible_nav");
}
function addToList(str){
	if(str!=''){
		document.getElementById("googleListItems").innerHTML+="<li class='list_item' id='item"+count+"' >"+count+"."+str+"</li>";
//		document.getElementById("googleListItems").innerHTML+="<button class='gl_close' onclick='closeGL("+count+")>X</button></li>";
		document.getElementById("googleItem").value="";
		count++;
	}
}
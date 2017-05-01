$(document).ready(function(){
	loadAndRenderContacts();
	particlesJS.load('particles-js', 'particlesjs-config.json', function(){
    });
});
function toTitleCase(str)
{
    return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
}
function loadAndRenderContacts(){
	var members = {};
	members.core = [];
	members.exec = [];
	$.ajax({
        url: "data/team.json",
        success: function(result) {
            members.core = result.core;
            members.exec = result.members;
            renderList(members);
        }
    });
}

function renderList(arr){
	for(var i = 0; i < arr.core.length; i++){
		var htmlStr = $(".core .members").html();
    	htmlStr+='<div class="member_card" id = "core'+i+'"><div class="img_section"><img src="res/img/profile.jpg" alt=""></div><div class="data_section"><h3>';
    	htmlStr+= arr.core[i].name+"</h3>";
    	htmlStr+= "<h4>"+arr.core[i].position + "</h4>"
    	$(".core .members").html(htmlStr);
    }
    htmlStr = '';
    for(var i = 0; i< arr.exec.length; i++){
    	htmlStr += '<div class="member_item" id = "memb'+i+'">'+toTitleCase(arr.exec[i].name)+'</div>';
    }
    $(".exec .members").html(htmlStr);
    $(".member_item").click(function(element){
    	var id = element.target.id.slice(4);
    	member = arr.exec[id];
    	$(".overLay #member_name").html(member.name);
    	$(".overLay #member_interests").html(member.interests);
    	$(".overLay #member_mail").html(member.email);
    	var links = '';
    	if(member.hasOwnProperty("github") && member.github != '')
    		links = "<a href='"+member.github+"'>GitHub</a>";
    	if(member.hasOwnProperty("linkedin") && member.linkedin != '')
    		links += ", <a href='"+member.linkedin+"'>LinkedIn</a>";
		$(".overLay #links").html(links);
		$(".overLay").addClass("visible");
 	});
}
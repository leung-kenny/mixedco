/* Created 08/09/14 */

/* 
 * Populates a div with a current member's photo and modal
 * displaying their biography. Assumes ZURB Foundation grid
 * elements (row, columns).
 */
function populateMemberGrid(gridId, memberXmlPath) {
	var grid = document.getElementById(gridId);

	/* Read in XML file */
	xmlhttp = new XMLHttpRequest();
	xmlhttp.open("GET", memberXmlPath,false);
	xmlhttp.send();
	xmlDoc = xmlhttp.responseXML; 

	var roster = xmlDoc.getElementsByTagName("roster")[0];
	var memberNodes = roster.getElementsByTagName("member"); // TODO alpha-sort
	var gridObjects = new Array();

	/* Create modal for each member and attach to grid */
	for (var i = 0; i < memberNodes.length; i++) {

		// Initialize member object
		var memObj = new Object();

		// Collect data about member
		var member = memberNodes[i];
		memObj.setAttribute("name", member.getElementsByTagName("name")[0].innerHTML);
		memObj.setAttribute("gradYear", member.getElementsByTagName("gradYear")[0].innerHTML);
		memObj.setAttribute("photo", member.getElementsByTagName("images")[0].getElementsByTagName("square")[0].innerHTML);
		memObj.setAttribute("voicePart", member.getElementsByTagName("voicePart")[0].innerHTML);
		memObj.setAttribute("major", member.getElementsByTagName("major")[0].innerHTML);
		memObj.setAttribute("hometown", member.getElementsByTagName("hometown")[0].innerHTML);
		memObj.setAttribute("bio", member.getElementsByTagName("bio")[0].innerHTML);
		var solos = member.getElementsByTagName("solos")[0].getElementsByTagName("song");
		memObj.setAttribute("songs", solos.map(function(x) { return(x.innerHTML); }));

		// Build modal
		var modalId = name.concat("Modal");
		var modal = makeMemberModal(modalClass, memObj);
		
		// Link modal to page
		var photo = document.createElement("img");
		photo.setAttribute("src", memObj.photo);
		gridObjects.push(photos);
	}

	addToGrid(gridObjects);

}

/* 
 * Creates an HTML modal object and returns it, given 
 * the member's information.
 *
 *	================================================
 *	Member's Photo
 *	Member's Name, Member's Grad Year 
 *	Member's Voice Part
 *  Member's Hometown
 *	Member's Major
 *	Member's Bio
 *	Member's Solos
 */

function makeMemberModal(modalId, member) {
	modal = document.createElement("div");
	modal.setAttribute("id", modalId);
	modal.setAttribute("class", "reveal-modal");

	var _photo = "<img src=" + member.photo + "/>";
	var _name = "<h4>" + name + " " + member.gradYear + "</h4>";
	var _voice_part = "<h5>" + member.voicePart + "</h5>";
	var _content = "<div>" + 
										"<span class='hometown'>" + member.hometown + "</span>" +
										"<span class='major'" + member.major + "</span>" +
										"<span class='bio'" + member.bio + "</span>" +
									"</div>"
	var _songs = "<ol class='song-list'>"
	for (var i = 0; i < member.songs.length; i++) {
		_songs.concat("<li class='song'>" + member.songs[i] + "</li>");
	}
	_songs.concat("</ol>");

	modal.innerHTML = _photo + _name + _voice_part + _content + _songs;
	return modal;
}


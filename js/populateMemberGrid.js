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
	xmlhttp.setRequestHeader("Content-Type","application/xml");
	xmlhttp.open("GET", memberXmlPath,true);
	xmlhttp.send();

	xmlhttp.onreadystatechange = function() {

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
			memObj["name"] = member.getElementsByTagName("name")[0].innerHTML;
			memObj["gradYear"] = member.getElementsByTagName("gradYear")[0].innerHTML;
			memObj["photo"] = member.getElementsByTagName("images")[0].getElementsByTagName("square")[0].innerHTML;
			memObj["voicePart"] = member.getElementsByTagName("voicePart")[0].innerHTML;
			memObj["major"] = member.getElementsByTagName("major")[0].innerHTML;
			memObj["hometown"] = member.getElementsByTagName("hometown")[0].innerHTML;
			memObj["bio"] = member.getElementsByTagName("bio")[0].innerHTML;
			var solos = member.getElementsByTagName("solos")[0].getElementsByTagName("song");
			memObj["songs"] = Array.prototype.slice.call(solos).map( function(node) { return(node.innerHTML); });

			// Build modal
			var modalId = name.concat("Modal");
			var modal = makeMemberModal(modalId, memObj);
			// Link modal to page
			var photo = document.createElement("img");
			photo.setAttribute("class", "lazy"); // lazy loading for improved performance
			photo.setAttribute("src", memObj.photo);
			gridObjects.push(photo);
		}

		addToGrid(grid, gridObjects);
	}

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

	var _photo = "<img src=" + member.photo + "></img>";
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

var kNumElementsPerRow = 3;
function addToGrid(grid, arr) {
	var row = createNewRow();
	for (var i = 0; i < arr.length; i++) {
		if (i % kNumElementsPerRow == 0 && i > 0) {
			grid.appendChild(row);
			row = createNewRow();
		}
		arr[i].setAttribute("class", "small-"+ parseInt(12/kNumElementsPerRow)  + " columns");
		row.appendChild(arr[i]);
	}
}

function createNewRow() {
	var row = document.createElement("div");
	row.setAttribute("class", "row");
	return row;
}




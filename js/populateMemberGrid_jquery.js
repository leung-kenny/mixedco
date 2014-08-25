/* Created 08/09/14 */

/* 
 * Populates a div with a current member's photo and modal
 * displaying their biography. Assumes ZURB Foundation grid
 * elements (row, columns).
 */

function populateMemberGrid(gridId, memberXmlPath) {
	var $grid = $('#' + gridId);
	var gridObjects = [];
	var modalObjects = [];

	$.ajax({
		url: memberXmlPath,
		dataType: 'xml',
		success: function(data) {
			$(data).find("member").each(function() {
				// build member object
				var $member = buildMemberObject($(this));
				// build corresponding modal
				var modalId = $member.name.concat("Modal").replace(" ", "-");
				modalObjects.push(makeMemberModal(modalId, $member));
				// link modal to page via image
				var $link = $('<a/>').attr({ "href": "#", "data-reveal-id": modalId });
				$('<img/>').attr('src', $member.photo).appendTo($link);
				gridObjects.push($link);
			});
			// add photo link to page
			addToGrid($grid, gridObjects);
			// add modal to page
			$.each(modalObjects, function(index, modal) { modal.appendTo($('body')); });
			// reload Foundation
			$(document).foundation({bindings: 'events'});
		}
	});
}

function buildMemberObject(data) {
	var member = {};
	// add member data
	member["name"] = data.find("name").text();
	member["gradYear"] = data.find("gradYear").text();
	member["photo"] = data.find("images").find("left").text();
	member["voicePart"] = data.find("voicePart").text();
	member["major"] = data.find("major").text();
	member["hometown"] = data.find("hometown").text();
	member["bio"] = data.find("bio").text();
	return member;
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
	// instantiate modal
	var $modal = $('<div/>').attr({
		id: modalId,
		'class': 'reveal-modal',
		'data-reveal': ''
	});
	// insert member titles
	$modal.append($('<img/>').attr('src', member.photo));
	$modal.append($('<h4/>').html(member.name + " " + member.gradYear));
	$modal.append($('<h5/>').html(member.voicePart));
	// insert member content
	var $content = $('<div/>');
	$content.append($('<span/>').addClass('major').html('Major: ' + member.major));
	$content.append($('<br/>'));
	$content.append($('<span/>').addClass('hometown').html('Hometown: ' + member.hometown));
	$content.append($('<br/>'));
	$content.append($('<span/>').addClass('bio').html(member.bio));
	// insert member songs
	/*var $songs = $('<ol/>').addClass('song-list').appendTo($content);
	$.each(member.songs, function(index, title) {
		$songs.append($('<li/>').addClass('song').html(title)); 
	});*/

	return $modal.append($content);
}

var kNumElementsPerRow = 2;
function addToGrid(grid, arr) {
	var $row = $('<div/>').addClass('row');
	$.each(arr, function(i, obj) {
		if (i % kNumElementsPerRow == 0 && i > 0) {
			grid.append($row);
			$row = $('<div/>').addClass('row');
		}
		$row.append(obj.addClass("small-"+ parseInt(12/kNumElementsPerRow) + " columns"));
	});	
}


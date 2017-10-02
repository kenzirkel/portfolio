// Beginning of theme.js (Javscript File) -- feel free to remove this comment
//
// Custom Variables are accessible via: 
// and JQuery 1.9+ is available in this scope
//

var resize = function() {
	var headerHeight = $('header').outerHeight();
	var footerHeight = 0;
	var windowHeight = $(window).height();
	var windowWidth = $(window).width();
	var availableHeight = windowHeight - headerHeight - footerHeight;
	var photoHeight = availableHeight;
	
	if ( windowWidth / availableHeight < (7/8) ) { // Portrait orientation
		photoHeight = windowWidth * 8 / 7;
		$('.photowrapper').css('margin-top', (availableHeight - photoHeight - 30)/2 );
	} else if ( windowWidth / availableHeight < (17/9) ) { // Landscape: maximum 16:9 photos plus a little extra
		photoHeight = windowWidth * 9 / 17;
		$('.photowrapper').css('margin-top', (availableHeight - photoHeight + 10)/2 );
	} else {
		$('.photowrapper').css('margin-top','0');
	}
	$('.infopage, #photos').css('height', availableHeight);
	
	$('.photo').css('height', photoHeight);
}

var getCurrentPhoto = function(scrollPosition) {
	var i = 0;
	var totalPhotoWidth = 0;
	var photoPositions = [];
	var currentPhotoIndex = 0;
	var photoMargin = parseInt($('.photowrapper').css('margin-right'));
	
	$('.photowrapper').each(function() {
		photoPositions[++i] = totalPhotoWidth;
		// console.log(i + ': ' + totalPhotoWidth);
		
		photoWidth = $(this).outerWidth() + photoMargin;
		totalPhotoWidth = totalPhotoWidth + photoWidth;
		
		if ( scrollPosition >= photoPositions[i] ) {
			currentPhotoIndex = i;
		}
	});
	return currentPhotoIndex;
}

var getPhotoPosition = function(photoIndex) {
	var i = 0;
	var totalPhotoWidth = 0;
	var photoPositions = [];
	var photoPosition;
	var photoMargin = parseInt($('.photowrapper').css('margin-right'));
	
	$('.photowrapper').each(function() {
		photoPositions[++i] = totalPhotoWidth;
		// console.log(i + ': ' + totalPhotoWidth);
		photoWidth = $(this).outerWidth() + photoMargin;
		totalPhotoWidth = totalPhotoWidth + photoWidth;
	});
	return photoPositions[photoIndex];
}

var applyVintagePhotoStyle = function() {	
	$('.photowrapper').each(function() {
		var scale = 0.9;
		var angle = (Math.random() * 3) - 1.5;
		// console.log(angle);
		
		$(this).css({
			'transform': 'scale(' + scale + ',' + scale + ') rotate(' + angle + 'deg)',
			'-webkit-transform': 'scale(' + scale + ',' + scale + ') rotate(' + angle + 'deg)',
			'-moz-transform': 'scale(' + scale + ',' + scale + ') rotate(' + angle + 'deg)'
		});
	});
}

$(document).ready(function() {
	
	
	
		$('.photoinfo').each(function() {
			if ($('.map', this).length > 0) {
				$(this).css('padding-right', '160px');
			}
		});
	
	
	resize();
	$(window).on("resize", function() {
		resize();
	});
	
	// Hide/show photo info
	$('.photowrapper').click(function(){
		var clickedPhotoShowsInfo = $('.photoinfo', this).hasClass('hidden');
		if (clickedPhotoShowsInfo) {
			$('.photoinfo').addClass('hidden');
			$('.photoinfo', this).removeClass('hidden');
		} else {
			$('.photoinfo', this).addClass('hidden');
		}
	});

	// Disable photo info fading when clicking photo info links
	$(".photoinfo a").click(function(e) {
		e.stopPropagation();
	})

	// Disable keyboard scroll default behaviour
	$(document.documentElement).keydown(function (event) {
		if (event.keyCode == 37) {
			// Left arrow
			event.preventDefault();
		} else if (event.keyCode == 39) {
			// Right arrow
			event.preventDefault();
		}
	});
	
	// Keyboard events
	$(document.documentElement).keyup(function (event) {
		var currentPhoto;
		var scrollPosition;
		var destinationPhotoPosition;
		
		scrollPosition = $('#photos').scrollLeft();
		currentPhoto = getCurrentPhoto(scrollPosition);
		// console.log(scrollPosition + ' / ' + getPhotoPosition(currentPhoto) );
		
		// left/right arrows
		if (event.keyCode == 37) {
			// Left arrow
			if ( scrollPosition == getPhotoPosition(currentPhoto) ) {
				destinationPhotoPosition = getPhotoPosition(currentPhoto - 1)
			} else {
				destinationPhotoPosition = getPhotoPosition(currentPhoto)
			}
			$('#photos').animate({ scrollLeft: destinationPhotoPosition}, 150);
		} 
		if (event.keyCode == 39) {
			// Right arrow
			destinationPhotoPosition = getPhotoPosition(currentPhoto + 1);
			$('#photos').animate({ scrollLeft: destinationPhotoPosition}, 150);
		}
	});
	
	// Re-bind vertical mouse wheel scrolling to horizontal scrolling
	$('#photos').mousewheel(function(event, delta, deltaX, deltaY) {
		event.preventDefault();
	    var scrollPosition = $('#photos').scrollLeft() - deltaY*2 + deltaX*2;
	    $('#photos').scrollLeft(scrollPosition);
	});
	
	// Disable right-click on images
	$('img.copyright').bind('contextmenu', function(e) {
	    return false;
	});
	
	// Open collection links in same window in iOS
	if (("standalone" in window.navigator) && window.navigator.standalone) {
		// For iOS Apps
		$('a').on('click', function(e) {
			e.preventDefault();
			var new_location = $(this).attr('href');
			if (new_location != undefined && new_location.substr(0, 1) != '#' && $(this).attr('data-method') == undefined) {
				window.location = new_location;
			}
		});
	}
});
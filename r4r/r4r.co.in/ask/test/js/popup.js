	$(document).ready( function() {
		$('#Location_box_close').click( function() {			
			unloadPopupBox();
		});
		$('#Location_box_open').click( function() {
			loadPopupBox();
		});
		function unloadPopupBox() {	// TO Unload the Popupbox
			$('#Location_box').fadeOut("slow");
			$("#LocationPoppupBack_box").css({ // this is just for style		
				"display": "none"  
			})
		}	
		function loadPopupBox() {	// To Load the Popupbox
			$('#Location_box').fadeIn("slow");
			$("#LocationPoppupBack_box").css({ // this is just for style		
				"display": "block"  
			})
		}
	});

	$(document).ready( function() {
		$('#Registration_box_close').click( function() {			
			unloadPopupBox();
		});
		$('#Registration_box_open').click( function() {
			loadPopupBox();
		});
		function unloadPopupBox() {	// TO Unload the Popupbox
			$('#Registration_box').fadeOut("slow");
			$("#RegistrationPoppupBack_box").css({ // this is just for style		
				"display": "none"  
			})
		}	
		function loadPopupBox() {	// To Load the Popupbox
			$('#Registration_box').fadeIn("slow");
			$("#RegistrationPoppupBack_box").css({ // this is just for style		
				"display": "block"  
			})
		}
	});
	
	$(document).ready( function() {
		$('#Login_box_close').click( function() {			
			unloadPopupBox();
		});
		$('#Login_box_open').click( function() {
			loadPopupBox();
		});
		function unloadPopupBox() {	// TO Unload the Popupbox
			$('#Login_box').fadeOut("slow");
			$("#LoginPoppupBack_box").css({ // this is just for style		
				"display": "none"  
			})
		}	
		function loadPopupBox() {	// To Load the Popupbox
			$('#Login_box').fadeIn("slow");
			$("#LoginPoppupBack_box").css({ // this is just for style		
				"display": "block"  
			})
		}
	});

function loadPopupBox(ElementID,backElementID) {
	$(function($) {
		$(document).ready(function() {
			$('#'+ElementID).fadeIn('slow');
			$("#"+backElementID).css('display', 'block' );
								   });
			   });
	}	
function unloadPopupBox(ElementID,backElementID) {
	$(function($) {
		$(document).ready(function() {
			$('#'+ElementID).fadeOut('slow');
			$("#"+backElementID).css('display', 'none' );
								   });
			   });
	}
function loadPopupBoxlocation(ElementID,backElementID) {
	if (document.getElementById('course_id').value==0)
			{
				alert("Please Select Course");
			}
	else{
	$(function($) {
		$(document).ready(function() {
			$('#'+ElementID).fadeIn('slow');
			$("#"+backElementID).css('display', 'block' );
								   });
			   });}
	}
function unloadPopupBoxlocation(ElementID,backElementID) {
	$(function($) {
		$(document).ready(function() {
			$('#'+ElementID).fadeOut('slow');
			$("#"+backElementID).css('display', 'none' );
								   });
			   });
	}
function loadPopupBox(ElementID,backElementID) {
	$(function($) {
		$(document).ready(function() {
			$('#'+ElementID).fadeIn('slow');
			$("#"+backElementID).css('display', 'block' );
								   });
			   });
	}	
function unloadPopupBox(ElementID,backElementID) {
	$(function($) {
		$(document).ready(function() {
			$('#'+ElementID).fadeOut('slow');
			$("#"+backElementID).css('display', 'none' );
								   });
			   });
	}
function forgotpassword(ElementID,backElementID) {
		$(function($) {
		$(document).ready(function() {
			$('#registration').fadeOut('fast');
			$("#registrationback").css('display', 'none' );
								   });
			   });
		$(function($) {
		$(document).ready(function() {
			$('#'+ElementID).fadeIn('fast');
			$("#"+backElementID).css('display', 'block' );
								   });
			   });

	}
function forgottoregistration() {
	unloadPopupBox('forgotpassword','forgotpasswordback');
	loadPopupBox('registrationBox','registrationBoxBack');	
	}
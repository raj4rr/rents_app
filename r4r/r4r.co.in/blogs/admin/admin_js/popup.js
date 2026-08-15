function loadPopupBoxRegister(url){
$(function($) {
		 $("#requesturl").val(url);
		$(document).ready(function() {
		$('#registrationBox').fadeIn('slow');
		$("#registrationBoxBack").css('display', 'block' );
									});
			  });
     }	
function loadPopupBoxforgotpassword() {
$(function($) {
		$(document).ready(function() {
			
			$("#registrationBoxBack").css('display', 'none' );
								   });
			   });
	$(function($) {
		$(document).ready(function() {
			
			$("#forgotpasswordback").css('display', 'block' );
								   });
			   });

	}
function forgottoregistration(){
		$('#forgotpasswordback').css('display', 'none' );				   
        $(function($) {
		$(document).ready(function() {
			$("#registrationBoxBack").css('display', 'block' );
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

function loadPopupmailBox(ElementID,backElementID,dic_id,co_id) {
	$(function($) {
		$(document).ready(function() {
			$('#'+ElementID).fadeIn('slow');
			$("#"+backElementID).css('display', 'block' );
								   });
			   });
		document.getElementById("discoun_t_id").value=dic_id;
		document.getElementById("coupo_n_id").value=co_id;
	}	
function unloadPopupmailBox(ElementID,backElementID) {
	$(function($) {
		$(document).ready(function() {
			$('#'+ElementID).fadeOut('slow');
			$("#"+backElementID).css('display', 'none' );
								   });
			   });
	}
function logintoregistration() {
	unloadPopupBox('loginBox','loginBoxBack');
	loadPopupBox('registrationBox','registrationBoxBack');	
	}
function registrationtologin() {
	unloadPopupBox('registrationBox','registrationBoxBack');
	loadPopupBox('loginBox','loginBoxBack');	
	}
function forgotpassword(ElementID,backElementID) {
		$(function($) {
		$(document).ready(function() {
			$('#registrationBox').fadeOut('fast');
			$("#registrationBoxBack").css('display', 'none' );
								   });
			   });
		$(function($) {
		$(document).ready(function() {
			$('#'+ElementID).fadeIn('fast');
			$("#"+backElementID).css('display', 'block' );
								   });
			   });

	}
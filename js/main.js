/*
	Typify by TEMPLATED
	templated.co @templatedco
	Released for free under the Creative Commons Attribution 3.0 license (templated.co/license)
*/
$(document).ready(function(){
 iniFormLogin();
 showPdf();
});


(function($) {

	skel.breakpoints({
		xlarge:	'(max-width: 1680px)',
		large:	'(max-width: 1280px)',
		medium:	'(max-width: 980px)',
		small:	'(max-width: 736px)',
		xsmall:	'(max-width: 480px)'
	});

	$(function() {

		var	$window = $(window),
			$body = $('body');

		// Disable animations/transitions until the page has loaded.
			$body.addClass('is-loading');

			$window.on('load', function() {
				window.setTimeout(function() {
					$body.removeClass('is-loading');
				}, 100);
			});

		// Fix: Placeholder polyfill.
			$('form').placeholder();

		// Prioritize "important" elements on medium.
			skel.on('+medium -medium', function() {
				$.prioritize(
					'.important\\28 medium\\29',
					skel.breakpoint('medium').active
				);
			});

	});

})(jQuery);

function iniFormLogin()
{
 if($("#login").length)
 {
  $("#login").submit(function(){ loginAdmin(); return false; });
 }
}

function iniFormPonente()
{
 if($("#form_ponente").length)
 {
  $("#form_ponente").validationEngine();
  $("#form_ponente").submit(function(){ agregarPonente(); return false; });
 }
}

function agregarPonente()
{
 var form="#form_ponente";
 var url="php_ponente.php"; 
 var action=function(res){
  var aux=res.split("|");
  var status=parseInt(aux[0]);
  if(status==1){ sSucces("El ponente fue agregado con exito"); 
   document.getElementById("form_ponente").reset();
  }
  else{ sError("No se pudo agregar el ponente. Detalles: "+aux[1]);}
 }
 submitForm(form, url, action);
}

function loginAdmin()
{
 var form="#login";
 var url="php_login.php"; 
 var action=function(res){
  var aux=res.split("|");
  var status=parseInt(aux[0]);
  if(status==1){ 
   swal.close();
   $("#content").load("admin.php" );
  }
  else{ sError('Error al iniciar sesión', aux[1]); }
 }
 submitForm(form, url, action);
}

function logoutAdmin()
{
 location.href="php_logout.php";
}

function showPdf()
{
$('.fancybox').fancybox({
            width  : '90%',
            height : '90%',
            type   :'iframe'
        });
}


/*
 Plugins necesarios para esta libreria:
 jquery
 filestyle
 validationEngine
 sweet alert
*/

//Funcion de ejemplo para inicializar un form con el evento submit
var dominio="/zika/";
function iniForm()
{
 var form="#idDelForm";
 var url="/submit/form"; 
 var action=function(res){//resp representa la cadena devuelta por el ajax, algo asi como: 1|Ok 
  var aux=res.split("|");
  var status=parseInt(aux[0]);
  if(status==1){ sSucces("Sus datos fueron registrados con exito"); }
  else{ sError("No se pudieron registrar sus datos. Detalles: "+aux[1]);}
 }
 submitForm(form, url, action);
}

//Submit de cualquier form con validacion
function submitForm(form, url, action)
{
  event.preventDefault();
  var valid = $(form).validationEngine('validate');
  if( valid == true )
  {
   //Validacion de captcha de google (si existe)
   if($('.g-recaptcha').length)
   {
   	if(grecaptcha.getResponse() == '')
   	{
   	 msjError('.g-recaptcha','Se necesita verificar que no es un robot.');
   	 return false;
    }
   }
   var data=getFormData(form);
   request(data, url, action);
  }
  else
  {
   //Validacion de captcha de google (si existe)
   if($('.g-recaptcha').length)
   {
   	if(grecaptcha.getResponse() == '')
   	{
   	 msjError('.g-recaptcha','Se necesita verificar que no es un robot.');
    }
   }
  }
}

function getFormData(form)
{
 var data = new FormData();
 if($('input:file').length)
 {
  jQuery.each(jQuery('input:file')[0].files, function(i, file) {
  data.append('file-'+i, file);
  });
 }

 $(form+" :input").each(function(){
  var input = $(this);
  if(input.attr("name")!=undefined)
  {
   if(input.attr("type")=="checkbox" || input.attr("type")=="radio")
   {
    if(input.is(":checked"))
    {
     data.append(input.attr("name"), input.val());
    }
   }
   else
   {
    data.append(input.attr("name"), input.val());
   }
  }
 });

 return data;
}

function request(data, url, response)
{
 sProcessing("Procesando...", function(){
  $.ajax({
   type: "POST",
   url: url,
   cache: false,
   contentType: false,
   processData: false,
   data: data,
   success: function( resultado )
   {
    console.log(resultado);
    response(resultado);
   },
   error:errorAjax
  });
 });
}

function consulta(data, url, response)
{
 $.ajax({
  type: "POST",
  url: url,
  cache: false,
  data: data,
  success: function( resultado )
  {
   console.log(resultado);
   response(resultado);
  },
  error:errorAjax
 });
}


function errorAjax(xhr, status, error) 
{
  var err = eval("(" + xhr.responseText + ")");
  swal({
    title: "Error al procesar la informaci\u00F3n",
    text: "Se ha detectado un error. Para continuar haga clic en el boton Aceptar.\n Detalles: "+err,
    type: "error",   
    showCancelButton: false,
    closeOnConfirm: true
   }, 
   function(){ window.location.reload(); });
}

/*Funciones para ValidationEngine*/
function msjError(obj, msj)
{
 $(obj).validationEngine('showPrompt', msj, 'error', 'topLeft', true);
}

/*Funciones para sweetalert*/
/*Opciones por default*/
function iniSweetAlert()
{
 swal.setDefaults({
  //confirmButtonColor: '#0000'
  confirmButtonText: "Aceptar",
  cancelButtonText: "Cancelar",
  html: true
 });
}
function sError(title, msj){ swal(title, msj, "error"); }
function sSucces(title, msj){ swal(title, msj, "success"); }
function sAlert(titulo, texto, tipo, accion)
{
 swal({
  title: titulo,
  text: texto,
  type: tipo,
  closeOnConfirm: true
 }, accion);
}

function sInputValue()
{
 swal({   title: "An input!",
              text: "Write something interesting:",
              type: "input",
              showCancelButton: true,
              closeOnConfirm: false,
              animation: "slide-from-top",
              inputPlaceholder: "Write something",
              showLoaderOnConfirm: true 
             },
              function(inputValue){ 
              	if (inputValue === false) return false;
              	if (inputValue === ""){ sError("You need to write something!");     return false   } 
              	setTimeout(function(){ sSucces("Ajax request finished!");   }, 2000); });
}

function sProcessing(msj, accion)
{
 var imgUrl=dominio+"assets/js/source/loading.gif";
 swal({
  title: "",
  text: msj,
  timer: 2000,
  imageUrl: imgUrl,
  showConfirmButton: false
 }, accion);
}




/* Funciones para el plugin filestyle*/
function iniFile(obj, placeholder)
{
 if($(obj).length)
 {
  $(obj).filestyle({
        'placeholder' : placeholder,
        buttonText : 'Adjuntar',
        iconName : 'glyphicon glyphicon-plus',
      });
 $(obj).focusout(function(){ $(obj).validationEngine('hideAll'); });//Quita mensaje de error
 $(obj).change(function(){ valFile(obj); });
 }
}

function valFile(obj)
{
  if (window.File && window.FileReader && window.FileList && window.Blob)
       {
        //get the file size and file type from file input field
        var doc = $(obj)[0].files[0];

        if(doc.size<1048576) //do something if file size less than 1 mb (1048576)
        {
          var ftype = doc.type;

          switch(ftype)
          {
            case 'application/pdf':
            case 'image/jpg':
            case 'image/jpeg':
            case 'image/pjpeg':
             break;

            default:
             $(obj).filestyle('clear');
             msjError(obj, 'Archivo PDF/Imagen no valido.');
             break;
          }
         }
         else
         {
          $(obj).filestyle('clear');
          msjError(obj, 'El tama\u00f1o del archivo no debe exceder mas de 1mb.');
         }
        }
        else
        {
         $(obj).filestyle('clear');
         msjError(obj, 'Lo sentimos. Se necesita un navegador reciente para hacer esta operacion.');
        }
}

/*Funciones para JQUERY */
function show(obj, action){ $(obj).fadeIn("slow", action); }
function hide(obj, action){ $(obj).fadeOut("slow", action); }
function getSelectedOpc(obj){ $(obj).children(':selected').val() }

/*HERRAMIENTAS*/

function soloLetras(e) {
    tecla = (document.all) ? e.keyCode : e.which; // 2
    if (tecla==8) return true; // 3
    patron = /\D/; // 4
    te = String.fromCharCode(tecla); // 5
    return patron.test(te); // 6
}
function soloNumeros( e ) {
	tecla = (document.all) ? e.keyCode :  e.which;
	if (tecla==0 || tecla==8 || tecla==9 ) return true;
	patron =/[0123456789]/;
	te = String.fromCharCode(tecla);
	return patron.test(te);
}
function soloPromedio( e ) {
  tecla = (document.all) ? e.keyCode :  e.which;
  if (tecla==0 || tecla==8 || tecla==9 ) return true;
  patron =/[0123456789.]/;
  te = String.fromCharCode(tecla);
  return patron.test(te);
}

function soloDinero( e ) {
  tecla = (document.all) ? e.keyCode :  e.which;
  if (tecla==0 || tecla==8 || tecla==9 ) return true;
  patron =/[0123456789.,]/;
  te = String.fromCharCode(tecla);
  return patron.test(te);
}

function soloTelefono( e ) {
  tecla = (document.all) ? e.keyCode :  e.which;
  if (tecla==0 || tecla==8 || tecla==9 ) return true;
  patron =/[0123456789+ ]/;
  te = String.fromCharCode(tecla);
  return patron.test(te);
}

function isEmail(email) {
  var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
  return regex.test(email);
}

function quitaAcentos(str){
for (var i=0;i<str.length;i++){
//Sustituye "á é í ó ú"
if (str.charAt(i)=="á") str = str.replace(/á/,"a");
if (str.charAt(i)=="é") str = str.replace(/é/,"e");
if (str.charAt(i)=="í") str = str.replace(/í/,"i");
if (str.charAt(i)=="ó") str = str.replace(/ó/,"o");
if (str.charAt(i)=="ú") str = str.replace(/ú/,"u");
}
return str;
}

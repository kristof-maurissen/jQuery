$(function(){
if($().validate) { console.log("validate geladen"); }
else { console.log("validate NIET geladen");}

//$("#regForm").submit(function(e) {e.preventDefault() });

//$.datepicker.setDefaults($.datepicker.regional['nl.BE']);
$.datepicker.setDefaults($.datepicker.regional['nl-BE']);
$("#geboren").datepicker({
    dateFormat: "yy-mm-dd",
    yearRange:  "-80:+00",
    changeMonth: true,
    changeYear: true
});

$.validator.addMethod("wwCheck", function(value, element) {
return value.match(/^.*(?=.{8,})(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=]).*$/);
});

//alle dialoogvensters: instellingen
$(".dialoogvenster").dialog({
autoOpen: false ,
buttons: {
"Ok": function() { $(this).dialog("close"); }
},
modal:true,
width: 600
});
// de dialoog Button
$('#dialog_link_username')
.button({icons: {secondary: "ui-icon-help"}})
.click(function(e){
e.preventDefault();
$('#dialog_username').dialog('open');
});
$('#promos').click(function(){
if ($(this).is(':checked')) {
$('#email').removeAttr('disabled')[0].focus();
} else {
$('#email').attr('disabled', true).val("");
}
});
var $foutBoksen = $('div.foutBox');
$("#regForm").validate({
    debug: true,
    
    rules:{
    vnaam: "required",
    fnaam: "required",
    sexe:  "required",
    "ruimte[]": "required",
    username:{
        required: true,
        minlength: 8
    },
    ww1: { 
        wwCheck:true 
    },
    ww2: {
        equalTo: "#ww1"
    },
    postnr:{
        required: true,
        digits:   true,
        minlength: 4,
        maxlength: 4
        },
    geboren:{
        required: true,
        dateISO: true
    },
    "soort_id[]": {
        required: true,
        rangelength:[1,4]
    },
    email: {
        required: "#promos:checked",
        email: true
    }
    
    },
    messages:{
    vnaam: "voornaam is verplicht",
    sexe:  "kies uw geslacht",
    "ruimte[]":"kies minstens &eacute;&eacute;n optie",
    "soort_id[]":"kies minstens &eacute;&eacute;n soort maar niet meer dan 4",
    username:"uw gebruikersnaam is verplicht en moet minimum 8 karakters hebben",
    ww1:"het wachtwoord moet min 8 karakters lang zijn en moet minstens &eacute;&eacute;nkleine letter, 1 Hoofdletter, 1 getal en 1 speciaal karakter (@#$%^&+=) bevatten",
    ww2:"wachtwoord niet identiek",
    postnr:{
        required:   "de postcode is verplicht",
        digits:     "een postcode bestaat enkel uit getallen",
        minlength:  "een postcodenummer bestaat uit exact 4 getallen",
        maxlength:  "een postcodenummer bestaat uit exact 4 getallen"
        },
    geboren:{
        required:"Geef uw geboortedatum in, aub",
        dateISO: "de datum moet het formaat YYYY-MM-DD hebben"
    },
    email:{
        required: "Een emailadres is nodig om u te kunnen contacteren",
        email: "het emailadres is ongeldig"
    }
    
    },
    /*errorPlacement: function(error,element){
        var $ctrlbx = element.parents("div.controlbox");
        if($ctrlbx.length!=0){
            error.insertAfter($ctrlbx);
        }
        else{
            error.insertAfter(element);
        }
    },*/
    errorContainer: $foutBoksen,
    errorLabelContainer: $("ul", $foutBoksen),
    wrapper: "li",
    submitHandler: function(form) {
    form.submit();
    }
});

}); // einde doc.ready



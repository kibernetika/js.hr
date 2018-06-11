var namePerson = '';
var fullname = '';
var email = '';
var phone = '';

$("#callback_me").on('click', submitCallMe);
$("#send-mail").on('click', submitSendMe);

$(document).ready(function(){
    $('.phone-mask').mask('+38 (000) 000-00-00');
});

function isValidate(input) {
    input.removeClass('error');
    input.tooltip('hide');
}

function notValidate(input) {
    input.addClass('error');
    input.tooltip('show');
}

function validationCallMe(parent){
    var result = true;
    var regular = /[^Є-Їa-zа-я\'\`\s]+/mi;
    var inputChild = parent.find("input[name='fullname']");
    var validInputName = ( regular.test(inputChild.val()) || (inputChild.val().length < 2) ) ? false : true;
    if ( validInputName ){
        isValidate(inputChild);
        namePerson = inputChild.val();
    }else{
        notValidate(inputChild);
        result = false;
    }
    regular = /^((8|\+3)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,10} /;
    inputChild = parent.find("input[placeholder='Ваш телефон']");
    var validPhone = ( regular.test(inputChild.val()) || (inputChild.val().length < 3) ) ? false : true;
    if ( validPhone ){
        isValidate(inputChild);
        phone = inputChild.val();
    }else{
        notValidate(inputChild);
        result = false;
    }
    return result;
}

function validationSendMe(parent){
    var result = true;
    var regular = /[^Є-Їa-zа-я\'\`\s]+/mi;
    var inputChild = parent.find("input[name='fullname']");
    var validInputName = ( regular.test(inputChild.val()) || (inputChild.val().length < 2) ) ? false : true;
    if ( validInputName ){
        isValidate(inputChild);
        fullname = inputChild.val();
    }else{
        notValidate(inputChild);
        result = false;
    }
    regular = /\S+@\S+\.\S+/;
    inputChild = parent.find("input[name='email']");
    var validMail = ( regular.test(inputChild.val()) ) ? true : false;
    if ( validMail ){
        isValidate(inputChild);
        email = inputChild.val();
    }else{
        notValidate(inputChild);
        result = false;
    }
    return result;
}

function submitCallMe(){
    if( ! validationCallMe($("#step-1")) ) return;
    $.ajax({
        type: "POST",
        url: "assets/php/mail.php",
        data: {
            'phone' : phone,
            'nameCustomer' : namePerson
        },
        success: function () {
            swal({
                title: "Дякуємо!",
                text: "Ми зв`яжемось з Вами найближчим часом. Гарного дня!",
                imageUrl: "assets/img/alert/email.png"
            });
        }
    });
    return false;
}

function submitSendMe(){
    if( ! validationSendMe($("#newsletter")) ) return;
    $.ajax({
        type: "POST",
        url: "assets/php/mail_send.php",
        data: {
            'email' : email,
            'fullname' : fullname
        },
        success: function () {
            swal({
                title: "Дякуємо!",
                text: "Ваш e-mail доданий до нашої бази розсилки. Гарного дня!",
                imageUrl: "assets/img/alert/mail.png"
            });
        }
    });
    return false;
}

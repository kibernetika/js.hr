var namePerson = '';
var mail = '';
var phone = '';

$("#callback_me").on('click', submitCallMe);

$(document).ready(function(){
    $('.phone-mask').mask('+38-000-000-0000');
});

function isValidate(input) {
    input.removeClass('error');
    input.tooltip('hide');
}

function notValidate(input) {
    input.addClass('error');
    input.tooltip('show');
}

function validationStepFirst(parent){
    var result = true;
    var regular = /[^а-яА-Я\s]+/mi;
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

function submitCallMe(){
    if( ! validationStepFirst($("#step-1")) ) return;
    $.ajax({
        type: "POST",
        url: "http://"+window.location.hostname+"/assets/php/mail.php",
        data: {
            'phone' : phone,
            'nameCustomer' : namePerson
        },
        success: function () {
            swal({
                title: "We sent you a confirmation email!",
                text: "Please check your Mailbox of " + mail,
                imageUrl: "assets/img/alert/email.png"
            });
        }
    });
    return false;
}
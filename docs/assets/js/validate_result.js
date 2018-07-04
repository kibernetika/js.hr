/**
 * Created by 13 on 13.11.2016.
 */
var price = 0;
var params = getSearchParameters();
$(".cart-submit").on('click', submitPayPal);
var paypal = false;
$(document).ready(function(){
    loadParameters();
});

function submitPayPal(){
    var result = true;
    inputChild = $("#email");
    regular = /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/;
    var validInputMail = ( ( ! regular.test(inputChild.val()) ) || (inputChild.val().length < 2) ) ? false : true;
    if ( validInputMail ){
        isValidate(inputChild);
    }else{
        notValidate(inputChild);
        result = false;
    }
    inputChild = $('#first_name');
    regular =   /[\u0000-,.-@[-`{-©«-´¶-¹»-¿×÷˂-˅˒-˟˥-˫˭˯-\u036f͵;΄-΅·϶҂-\u0489՚-՟։\u0591-\u05bd\u05bf-\u05c7׳-״\u0600-\u0603؆-؛؞-؟\u064b-\u065e٠-٭\u0670۔\u06d6-\u06e4\u06e7-\u06ed۰-۹۽-۾܀-܍\u070f\u0711\u0730-\u074a\u07a6-\u07b0߀-߉\u07eb-\u07f3߶-߹\u0901-\u0903\u093c\u093e-\u094d\u0951-\u0954\u0962-॰\u0981-\u0983\u09bc\u09be-\u09c4\u09c7-\u09c8\u09cb-\u09cd\u09d7\u09e2-\u09e3০-৯৲-৺\u0a01-\u0a03\u0a3c\u0a3e-\u0a42\u0a47-\u0a48\u0a4b-\u0a4d\u0a51੦-\u0a71\u0a75\u0a81-\u0a83\u0abc\u0abe-\u0ac5\u0ac7-\u0ac9\u0acb-\u0acd\u0ae2-\u0ae3૦-૯૱\u0b01-\u0b03\u0b3c\u0b3e-\u0b44\u0b47-\u0b48\u0b4b-\u0b4d\u0b56-\u0b57\u0b62-\u0b63୦-୰\u0b82\u0bbe-\u0bc2\u0bc6-\u0bc8\u0bca-\u0bcd\u0bd7௦-௺\u0c01-\u0c03\u0c3e-\u0c44\u0c46-\u0c48\u0c4a-\u0c4d\u0c55-\u0c56\u0c62-\u0c63౦-౯౸-౿\u0c82-\u0c83\u0cbc\u0cbe-\u0cc4\u0cc6-\u0cc8\u0cca-\u0ccd\u0cd5-\u0cd6\u0ce2-\u0ce3೦-೯ೱ-ೲ\u0d02-\u0d03\u0d3e-\u0d44\u0d46-\u0d48\u0d4a-\u0d4d\u0d57\u0d62-\u0d63൦-൵൹\u0d82-\u0d83\u0dca\u0dcf-\u0dd4\u0dd6\u0dd8-\u0ddf\u0df2-෴\u0e31\u0e34-\u0e3a฿\u0e47-๛\u0eb1\u0eb4-\u0eb9\u0ebb-\u0ebc\u0ec8-\u0ecd໐-໙༁-\u0f3f\u0f71-\u0f87\u0f90-\u0f97\u0f99-\u0fbc྾-࿌࿎-࿔\u102b-\u103e၀-၏\u1056-\u1059\u105e-\u1060\u1062-\u1064\u1067-\u106d\u1071-\u1074\u1082-\u108d\u108f-႙႞-႟჻\u135f-፼᎐-᎙᙭-᙮\u1680᚛-᚜᛫-\u16f0\u1712-\u1714\u1732-᜶\u1752-\u1753\u1772-\u1773\u17b4-៖៘-៛\u17dd០-៩៰-៹᠀-᠅᠇-\u180e᠐-᠙\u18a9\u1920-\u192b\u1930-\u193b᥀᥄-᥏\u19b0-\u19c0\u19c8-\u19c9᧐-᧙᧞-᧿\u1a17-\u1a1b᨞-᨟\u1b00-\u1b04\u1b34-\u1b44᭐-᭼\u1b80-\u1b82\u1ba1-\u1baa᮰-᮹\u1c24-\u1c37᰻-᱉᱐-᱙᱾-᱿\u1dc0-\u1de6\u1dfe-\u1dff᾽᾿-῁῍-῏῝-῟῭-`´-῾\u2000-\u200f‖-\u2064\u206a-⁰⁴-⁾₀-₎₠-₵\u20d0-\u20f0℀-℁℃-℆℈-℉℔№-℘℞-℣℥℧℩℮℺-℻⅀-⅄⅊-⅍⅏⅓-\u2182\u2185-\u2188←-⏧␀-␦⑀-⑊①-⚝⚠-⚼⛀-⛃✁-✄✆-✉✌-✧✩-❋❍❏-❒❖❘-❞❡-➔➘-➯➱-➾⟀-⟊⟌⟐-⭌⭐-⭔⳥-⳪⳹-⳿\u2de0-⸖⸘-⸙⸛-⸮⸰⺀-⺙⺛-⻳⼀-⿕⿰-⿻\u3000-〄\u3007-〛〝-\u302f〶-\u303a〽-〿\u3099-゜・㆐-㆟㇀-㇣㈀-㈞㈠-㉃㉐-㋾㌀-㏿䷀-䷿꒐-꓆꘍-꘏꘠-꘩\ua66f-꙳\ua67c-꙾꜀-꜖꜠-꜡꞉-꞊\ua802\ua806\ua80b\ua823-꠫꡴-꡷\ua880-\ua881\ua8b4-\ua8c4꣎-꣙꤀-꤉\ua926-꤯\ua947-\ua953꥟\uaa29-\uaa36\uaa43\uaa4c-\uaa4d꩐-꩙꩜-꩟\ud803-\ud808\ud80a-\ud833\ud836-\ud83b\ud83d-\udb3f\udb41-\udb7f\udc00-\uf8ff\ufb1e﬩﴾-﴿﷼-﷽\ufe00-︙\ufe20-\ufe26︰︳-﹒﹔-﹗﹙-﹢﹤-﹦﹨-﹫\ufeff！-，．-＠［-｀｛-･￠-￦￨-￮\ufff9-�]|[\udb80-\udbbe\udbc0-\udbfe][\udc00-\udfff]|\ud800[\udd00-\udd02\udd07-\udd33\udd37-\udd8a\udd90-\udd9b\uddd0-\uddfd\udf20-\udf23\udf41\udf4a\udf9f\udfd0-\udfd5]|\ud801[\udca0-\udca9]|\ud802[\udd16-\udd19\udd1f\udd3f\ude01-\ude03\ude05-\ude06\ude0c-\ude0f\ude38-\ude3a\ude3f-\ude47\ude50-\ude58]|\ud809[\udc00-\udc62\udc70-\udc73]|\ud834[\udc00-\udcf5\udd00-\udd26\udd29-\udddd\ude00-\ude45\udf00-\udf56\udf60-\udf71]|\ud835[\udec1\udedb\udefb\udf15\udf35\udf4f\udf6f\udf89\udfa9\udfc3\udfce-\udfff]|\ud83c[\udc00-\udc2b\udc30-\udc93]|\udb40[\udc01\udc20-\udc7f\udd00-\uddef]|\udbbf[\udc00-\udffd]|\udbff[\udc00-\udffd]|[\ud800-\ud802\ud809\ud834-\ud835\ud83c\udb40\udb80-\udbff]/;
    var validInputName = ( regular.test(inputChild.val()) || (inputChild.val().length < 2) ) ? false : true;
    if ( validInputName ){
        isValidate(inputChild);
        namePerson = inputChild.val();
    }else{
        notValidate(inputChild);
        result = false;
    }
    inputChild = $('#last_name');
    var validInputSurname = ( regular.test(inputChild.val()) || (inputChild.val().length < 3) ) ? false : true;
    if ( validInputSurname ){
        isValidate(inputChild);
        namePerson = namePerson +' ' + inputChild.val();
    }else{
        notValidate(inputChild);
        result = false;
    }
    if( result & paypal ){
        $('#paypal_f').unbind();
        loadDataPayPalForm();
        $('#paypal_f').submit();
        swal("Redirection...", "You will be redirected to the payment system.", "info");
    };
}

function getSearchParameters() {
    var prmstr = window.location.search.substr(1);
    return prmstr != null && prmstr != "" ? transformToAssocArray(prmstr) : {};
}

function transformToAssocArray( prmstr ) {
    var params = {};
    var prmarr = prmstr.split("&");
    for ( var i = 0; i < prmarr.length; i++) {
        var tmparr = prmarr[i].split("=");
        params[tmparr[0]] = decodeURIComponent(tmparr[1]);
    }
    return params;
}

function loadParameters(){
    if( (typeof (params['gender']) == "undefined") || (typeof (params['name']) == "undefined") || (typeof (params['address']) == "undefined") ||
        (params['gender'] == "") || (params['name'] == "") || (params['address'] == "") )
            document.location.href = '/';
    if( params['gender'] == 'm'  ){
        $('#summary>h3').text('Info about your boyfriend');
    }else{
        $('#summary>h3').text('Info about your girlfriend');
    }
    var childNode = $(".info-set>li");
    childNode.eq(0).html( '<i class="fa fa-search"></i>' + params['name']) ;
    if( params['facebook'] != '' ){
        childNode.eq(1).html( '<i class="fa fa-facebook"></i>' + params['facebook']);
    }else{
        childNode.eq(1).remove();
    }
    childNode.eq(2).html( '<i class="fa fa-map-marker"></i>' + params['address']);
}

function validate(parent){
    var result;
    parent = $('.cart-checkout-content');
    var curStep = $(parent).find('.active');
    switch (curStep.attr('id')){
        case 'review-order': result = validationStepFirst(curStep);
            break;
        case 'payment-method': result = validationStepSecond(curStep);
            break;
        default: result = true;
    }
    return result;
}

function validationStepFirst(parent){
    var result = true;
    var child = parent.find("#price");
    if( $(parent).find('input[type="radio"]').eq(0).prop('checked') || $(parent).find('input[type="radio"]').eq(1).prop('checked') ){
        price = $(parent).find('input[type="radio"]').eq(0).prop('checked') ? '$100.00' : '$225.00';
        $('.cart-ammount').text(price);
        isValidate( $(parent).find('#price') )
    }else{
        result = false;
        notValidate( $(parent).find('#price') );
    }
    return result;
}

function validationStepSecond(parent) {
    var result = true;
    var child = parent.find(".payment-method-form");
    if( $(parent).find('input[type="radio"]').eq(0).prop('checked') ||
        $(parent).find('input[type="radio"]').eq(1).prop('checked') ||
        $(parent).find('input[type="radio"]').eq(2).prop('checked')){
            paypal = ($(parent).find('input[type="radio"]').eq(0).prop('checked')) ? true : false;
            isValidate( $(parent).find('.payment-method-form') )
    }else{
        result = false;
        notValidate( $(parent).find('.payment-method-form') );
    }
    return result;
}

function notValidate(input) {
    input.addClass('error');
    input.tooltip('show');
}

function isValidate(input) {
    input.removeClass('error');
    input.tooltip('hide');
}
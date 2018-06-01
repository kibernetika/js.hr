/**
 * Created by 13 on 10.11.2016.
 */
var receiverEmail = 'sg.pavel.d-facilitator@gmail.com';
var returnUrl = 'http://'+window.location.hostname+'/assets/php/paypal.php';
var itemName = 'Standard Service';
var amount = '100.0';

function loadDataPayPalForm() {
    var check = $('#price').find('input[type="radio"]').eq(0).prop('checked');
    var price = check ? '$100.00' : '$225.00';
    if( typeof(price) == "undefined" ) price = '$100.00';
    if( price == '$100.00'){
        amount = '39.00';
        itemName = 'Standard Service';
    }else{
        amount = '59.00';
        itemName = 'Priority Service';
    }
    var customData = {
        'mail' : $('#email').val(),
        'friend_name' : params['name'],
        'address' : params['address'],
        'gender' : params['gender'],
        'facebook' : params['facebook'] !== undefined ? params['facebook'] : 'none',
        'service' : itemName,
        'price' : amount,
        'payment_method' : 'paypal',
        'first_name' : $('#first_name').val(),
        'last_name' : $('#last_name').val(),
    };
    $('input[name="business"]').prop('value', receiverEmail);
    $('input[name="item_name"]').prop('value', itemName);
    $('input[name="amount"]').prop('value', amount);
    $('input[name="return"]').prop('value', returnUrl);
    $('input[name="custom"]').prop('value', JSON.stringify(customData));
    $('input[name="cancel_return"]').prop('value', 'https://www.facebook.com/');
}

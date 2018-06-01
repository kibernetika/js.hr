/**
 * Created by 13 on 10.11.2016.
 */

function searchZIPCode(zip, country) {
    var cityName = null;
    var client = new XMLHttpRequest();
    client.open("GET", "http://api.zippopotam.us/"+country+"/"+zip, true);
    client.onreadystatechange = function(){
        if(client.readyState == 4) {
            cityName = client.responseText;
            var start = cityName.indexOf('name": "')+8;
            var end = cityName.indexOf('"', start);
            cityName = cityName.substring(start, end);
            var r = /\\u([\d\w]{4})/gi;
            cityName = cityName.replace(r, function (match, grp){
                return String.fromCharCode(parseInt(grp, 16));
            });
            cityName = unescape(cityName);
            var input = $("input[placeholder='Zip ']");
            if (cityName != '{}'){
                input.val( input.val() + " (" + cityName + ")" );
                input.removeClass('error');
                zipValid = true;
            }else{
                input.addClass('error');
            }
        }
        $("#load_animation").css('display', 'none');
    };
    client.send();
}

var API_KEY = "9e98ff202e28c0404208daae4abc71b0";
var cel = false;
var wd;

function displayTemp(fTemp, c){
	if(c) return Math.round((fTemp - 32) * (5/9)) + " C";
	return Math.round(fTemp) + " F"
}

$(function(){
  
  var loc;
  
  $.getJSON('http://ipinfo.io', function(d){
    console.log("assigning the data...")
    loc = d.loc.split(",");
    console.log(loc);
    
    // DEVALERT: used for testing snow. replace with lat/long for place where it's snowing
    //loc[0] = 35.97;
    //loc[1] = -83.19;

   $.getJSON('http://api.openweathermap.org/data/2.5/weather?units=imperial&lat='
             + loc[0] + '&lon=' + loc[1] + '&APPID=' + API_KEY, function(apiData){
     wd = apiData;

     console.log("got the data ,", wd);
     var currentLocation = wd.name;
     var weatherType = wd.weather[0].main.toLowerCase();
     var currentWeather = wd.weather[0].description;
     var currentTemp = displayTemp(wd.main.temp, cel);
     var high = displayTemp(wd.main.temp_max, cel);
     var low = displayTemp(wd.main.temp_min, cel);
     var icon = wd.weather[0].icon;

     // if snow, show background image
     if (weatherType == "snow"){
       $('#main').addClass('snow');
     }
     
     $('#currentLocation').html(currentLocation);
     $('#currentTemp').html(currentTemp);
     $('#currentWeather').html(currentWeather);
     $('#high-low').html(high + " / " + low);

     var iconSrc = "http://openweathermap.org/img/w/" + icon + ".png";
     $('#currentTemp').prepend('<img src="' +iconSrc + '">');


   })
    
  })
  
})






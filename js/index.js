$("#icon").on('click', changeUnit);
$(window).on('resize', resizing);

var link,
    icon,
    temp,
    city,
    unit = "Celsius",
    tempMin,
    tempMax,
    humidity,
    pressure;
if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(function(position) {
    var baseURL = "https://cors-anywhere.herokuapp.com/http://api.openweathermap.org/data/2.5/weather?";
    var coordinates = "lat=" + position.coords.latitude + "&lon=" + position.coords.longitude;
    link = baseURL + coordinates  + "&APPID=110bed5ae6f092b8715d7ae0d0e45f80&units=metric";
    weather();
  }, function(error){
    alert(error.message);
  });
}
function weather(){
  $.getJSON(link, function(data){
    temp = data.main.temp;
    icon = data.weather[0].icon;
    city = data.name;
    tempMin = data.main.temp_min;
    tempMax = data.main.temp_max;
    humidity = data.main.humidity;
    pressure = data.main.pressure;
  }).done(function(){
    $("#city").html(city);
    $("#icon").html("<img src='http://openweathermap.org/img/w/" + icon + ".png' /><h3>" + temp + " °C</h3>");
    $("#temperatureMin").html(tempMin);
    $("#temperatureMax").html(tempMax);
    $("#humidity").html(humidity);
    $("#pressure").html(pressure);
  });
}
// Celsius to Fahrenheit
function changeUnit(){
  if(unit === "Celsius"){
    unit = "Fahrenheit";
    temp = Math.round((temp*(9/5) + 32)*100)/100;
    $("#icon").html("<img src='http://openweathermap.org/img/w/" + icon + ".png' /><h3>" + temp + " °F</h3>");
  }else{
    unit = "Celsius";
    temp = Math.round(((temp - 32) * (5/9))*100)/100;
    $("#icon").html("<img src='http://openweathermap.org/img/w/" + icon + ".png' /><h3>" + temp + " °C</h3>");
  }
}

function resizing(){
  if($("#main").width() < 550){
    $("#details .col-xs-8").css("margin-top", "45px");
  }else{
    $("#details .col-xs-8").css("margin-top", "28px");
  }
}

// Set margin top at a start on small screens
resizing();
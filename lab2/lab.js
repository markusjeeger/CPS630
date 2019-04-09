var jsonResponse;
var url="";
var xmlhttp = new XMLHttpRequest();
var data;
var searched = false;
var unit;
var speedUnit;
var tempUnit;

function update()
{
	xmlhttp.onreadystatechange=function() 
	{
	if (xmlhttp.readyState== 4 && xmlhttp.status== 200) 
	{
		jsonResponse = xmlhttp.responseText;
		displayWeather(jsonResponse);
		}
	}

	xmlhttp.open("GET", url, true);
	xmlhttp.send();
}

function displayWeather(response)
{
	data = JSON.parse(response);
	var currentTemp = Math.round(data.list[0].main.temp);
	var currentHumidity = data.list[0].main.humidity;
	var currentWind = Math.round(data.list[0].wind.speed);
	var currentWindDegree = getDirection(data.list[0].wind.deg);
	var currentWeather = data.list[0].weather[0].main;
	var currentWeatherIcon = "url(http://openweathermap.org/img/w/"+ data.list[0].weather[0].icon + ".png" + ")";
	var currentTime = data.list[0].dt;
		
	document.getElementById("currentIcon").style.backgroundImage = currentWeatherIcon 
	document.getElementById("currentInfo").innerHTML = currentTemp + tempUnit + "";
	document.getElementById("currentPrecip").innerHTML = currentWeather;
	document.getElementById("currentHumidity").innerHTML = "Humidity: " + currentHumidity ;
	document.getElementById("currentWind").innerHTML = "Wind: " + currentWind + speedUnit + " " + currentWindDegree; 
	
	var hour0temp = Math.round(data.list[0].main.temp);
	var hour0icon = currentWeatherIcon;
	var hour3temp = Math.round(data.list[1].main.temp);
	var hour3icon = "url(http://openweathermap.org/img/w/"+ data.list[1].weather[0].icon + ".png" + ")";
	var hour6temp = Math.round(data.list[2].main.temp);
	var hour6icon = "url(http://openweathermap.org/img/w/"+ data.list[2].weather[0].icon + ".png" + ")"; 
	var hour9temp = Math.round(data.list[3].main.temp);
	var hour9icon = "url(http://openweathermap.org/img/w/"+ data.list[3].weather[0].icon + ".png" + ")"; 
	var hour12temp = Math.round(data.list[4].main.temp);
	var hour12icon = "url(http://openweathermap.org/img/w/"+ data.list[4].weather[0].icon + ".png" + ")";
	var hour15temp = Math.round(data.list[5].main.temp);
	var hour15icon = "url(http://openweathermap.org/img/w/"+ data.list[5].weather[0].icon + ".png" + ")";
	var hour18temp = Math.round(data.list[6].main.temp);
	var hour18icon = "url(http://openweathermap.org/img/w/"+ data.list[6].weather[0].icon + ".png" + ")"; 
	
	document.getElementById("h0").innerHTML = new Date((data.list[0].dt)*1000).getHours() + ":00";
	document.getElementById("h3").innerHTML = new Date((data.list[1].dt)*1000).getHours() + ":00";
	document.getElementById("h6").innerHTML = new Date((data.list[2].dt)*1000).getHours() + ":00";
	document.getElementById("h9").innerHTML = new Date((data.list[3].dt)*1000).getHours() + ":00";
	document.getElementById("h12").innerHTML = new Date((data.list[4].dt)*1000).getHours() + ":00";
	document.getElementById("h15").innerHTML = new Date((data.list[5].dt)*1000).getHours() + ":00";
	document.getElementById("h18").innerHTML = new Date((data.list[6].dt)*1000).getHours() + ":00";
	
	document.getElementById("hour0icon").style.backgroundImage = hour0icon;
	document.getElementById("hour3icon").style.backgroundImage = hour3icon; 
	document.getElementById("hour6icon").style.backgroundImage = hour6icon; 
	document.getElementById("hour9icon").style.backgroundImage = hour9icon; 
	document.getElementById("hour12icon").style.backgroundImage = hour12icon; 
	document.getElementById("hour15icon").style.backgroundImage = hour15icon; 
	document.getElementById("hour18icon").style.backgroundImage = hour18icon; 
	 
	document.getElementById("hour0").innerHTML = hour0temp + tempUnit + "";
	document.getElementById("hour3").innerHTML = hour3temp + tempUnit + "";
	document.getElementById("hour6").innerHTML = hour6temp + tempUnit + "";
	document.getElementById("hour9").innerHTML = hour9temp + tempUnit + "";
	document.getElementById("hour12").innerHTML = hour12temp + tempUnit + "";
	document.getElementById("hour15").innerHTML = hour15temp + tempUnit + "";
	document.getElementById("hour18").innerHTML = hour18temp + tempUnit + "";
	
	var d = new Date();
	var weekday = new Array(7);
	weekday[0] =  "Sun";
	weekday[1] = "Mon";
	weekday[2] = "Tues";
	weekday[3] = "Wed";
	weekday[4] = "Thurs";
	weekday[5] = "Fri";
	weekday[6] = "Sat";

	
	var day1temp = Math.round(data.list[data.list.length-33].main.temp);
	var day1icon = "url(http://openweathermap.org/img/w/"+ data.list[data.list.length-33].weather[0].icon + ".png" + ")";
	var day2temp = Math.round(data.list[data.list.length-25].main.temp);
	var day2icon = "url(http://openweathermap.org/img/w/"+ data.list[data.list.length-25].weather[0].icon + ".png" + ")"; 
	var day3temp = Math.round(data.list[data.list.length-17].main.temp);
	var day3icon = "url(http://openweathermap.org/img/w/"+ data.list[data.list.length-17].weather[0].icon + ".png" + ")"; 
	var day4temp = Math.round(data.list[data.list.length-19].main.temp);
	var day4icon = "url(http://openweathermap.org/img/w/"+ data.list[data.list.length-19].weather[0].icon + ".png" + ")"; 
	var day5temp = Math.round(data.list[data.list.length-1].main.temp);
	var day5icon = "url(http://openweathermap.org/img/w/"+ data.list[data.list.length-1].weather[0].icon + ".png" + ")";
	
	document.getElementById("d1").innerHTML = weekday[new Date((data.list[data.list.length-33].dt)*1000).getDay()];
	document.getElementById("d2").innerHTML = weekday[new Date((data.list[data.list.length-25].dt)*1000).getDay()];
	document.getElementById("d3").innerHTML = weekday[new Date((data.list[data.list.length-17].dt)*1000).getDay()];
	document.getElementById("d4").innerHTML = weekday[new Date((data.list[data.list.length-9].dt)*1000).getDay()];
	document.getElementById("d5").innerHTML = weekday[new Date((data.list[data.list.length-1].dt)*1000).getDay()];
	
	document.getElementById("day1icon").style.backgroundImage = day1icon;
	document.getElementById("day2icon").style.backgroundImage = day2icon;
	document.getElementById("day3icon").style.backgroundImage = day3icon;
	document.getElementById("day4icon").style.backgroundImage = day4icon;
	document.getElementById("day5icon").style.backgroundImage = day5icon;
	
	document.getElementById("day1").innerHTML = day1temp + tempUnit + "";
	document.getElementById("day2").innerHTML = day2temp + tempUnit + "";
	document.getElementById("day3").innerHTML = day3temp + tempUnit + "";
	document.getElementById("day4").innerHTML = day4temp + tempUnit + "";
	document.getElementById("day5").innerHTML = day5temp + tempUnit + "";
	
}

function setCity()
{
	searched = true;
	isImperial = document.getElementById("temp").checked;
	city = document.getElementById("city").value.toLowerCase();
	country = document.getElementById("country").value.toLowerCase();
	
	document.getElementById("title").innerHTML = "Current Weather in " + city.toUpperCase() + ", " + country.toUpperCase();
	
	if (isImperial)
	{
		unit = "metric";
		speedUnit = "km/h"
		tempUnit = "&#176;C"
	}
	else
	{
		unit = "imperial";
		speedUnit = "mi/h"
		tempUnit = "&#176;F"
	}
	
	url="http://api.openweathermap.org/data/2.5/forecast?q="+city+","+country+"&appid=67b869635abd51a275724ab3c22b5382&units="+unit;
	update();
}

function switchUnits()
{
	if (searched)
	{
		setCity();
	}
}

function getDirection(angle) {
  var directions = ['N', 'NW', 'W', 'SW', 'S', 'SE', 'E', 'NE'];
  return directions[Math.round(((angle %= 360) < 0 ? angle + 360 : angle) / 45) % 8];
}
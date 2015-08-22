//Used to get the page parameter value against name

function getParameterByName(name) {
	name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
	var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
	results = regex.exec(location.search);
	return results == null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}

function getCurrentLat()
{
	return 55.844428;
}
function getCurrentLng()
{
	return -4.430502;
}

function findClosestPlace(callBack)
{
	$.getJSON('appData/Json.json',function(data) {

		var min = findDistance(getCurrentLat(), getCurrentLng(), data[0].coordinates.lat, data[0].coordinates.lng);
		var index = 0;

		for (var i = 1; i < data.length; i++) {
			var distance = findDistance(getCurrentLat(), getCurrentLng(), data[i].coordinates.lat, data[i].coordinates.lng);
			if (distance < min) {
		    	
		    	index = i;
		    	min = data[i].distance;
		    }
		}
		callBack(index);
	});	
}

function findDistance(lat1, lon1, lat2, lon2) {
	var radlat1 = Math.PI * lat1/180;
	var radlat2 = Math.PI * lat2/180;
	var radlon1 = Math.PI * lon1/180;
	var radlon2 = Math.PI * lon2/180;
	var theta = lon1-lon2;
	var radtheta = Math.PI * theta/180;
	var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
	dist = Math.acos(dist);
	dist = dist * 180/Math.PI;
	dist = dist * 60 * 1.1515;
	dist = dist * 1.609344 ;
	return Math.round(dist);
}  


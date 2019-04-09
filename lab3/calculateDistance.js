var mapCoords;
var fileCoords;

onmessage = function(input){
	var data = input.data;
	console.log(input.data);
	if (!data[2])
	{
		mapCoords = {lat: parseFloat(data[0]), lng: parseFloat(data[1])};
		console.log("first");
	}
	else if (!data[0])
	{
		fileCoords = {lat: parseFloat(data[2]), lng: parseFloat(data[3])};
		console.log("second");
	}
	
	if (mapCoords && fileCoords)
	{
		console.log("calc");
		hd = haversineDistance(mapCoords, fileCoords)
		self.postMessage(hd);
	}
}

function haversineDistance(coords1, coords2) {
	function toRad(x) {
		return x * Math.PI / 180;
	}

	var lng1 = coords1["lng"];
	var lat1 = coords1["lat"];

	var lng2 = coords2["lng"];
	var lat2 = coords2["lat"];

	var R = 6371; // km

	var x1 = lat2 - lat1;
	var dLat = toRad(x1);
	var x2 = lng2 - lng1;
	var dLng = toRad(x2)
	var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLng / 2) * Math.sin(dLng / 2);
	var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
	var distance = R * c;

	return distance;
}
//Lots of stolen google code

var distanceWorker;
distanceWorker = new Worker('calculateDistance.js');
distanceWorker.addEventListener('error', handleWorkerError);
distanceWorker.addEventListener('message', handleWorkerMessage);

function initMap() {
	var map = new google.maps.Map(document.getElementById('map'), {
		zoom: 11,
		center: {lat: 43.6532, lng: -79.3832}
	});

	var geocoder = new google.maps.Geocoder;
	var infoWindow = new google.maps.InfoWindow;
	var newInfoWindow = new google.maps.InfoWindow;
	
	if (navigator.geolocation) 
	{
		navigator.geolocation.getCurrentPosition(function(position) {
			var pos = {
				lat: position.coords.latitude,
				lng: position.coords.longitude
			};
			
			initialMarker = new google.maps.Marker({
				position: pos,
				map: map,
				title: 'start'
			});
			newMarker = new google.maps.Marker({
				position: pos,
				map: map,
				title: 'end'
			});
			map.setCenter(pos);
			infoWindow.setContent("Current Location");
			infoWindow.open(map, initialMarker);
			
			newInfoWindow.setContent("");
			infoWindow.open(map, newMarker);
			
			geocoder.geocode({'location': pos}, function(results, status) {
			if (status === 'OK') 
			{
				if (results[0]) 
				{
					document.getElementById('start').innerText = "From: "
					document.getElementById('start-coords').innerText = results[0].formatted_address;
				} 
				else 
				{
					window.alert('No results found');
				}
			} 
			else 
			{
				window.alert('Geocoder failed due to: ' + status);
			}
		});
			
			message = [pos["lat"], pos["lng"], false, false];
			distanceWorker.postMessage(message);
		}, function() {
			handleLocationError(true, infoWindow, map.getCenter());
		});
		
	} 
	else 
	{
	  //If browser doesn't support Geolocation
	  handleLocationError(false, infoWindow, map.getCenter());
	}

	document.getElementById('submit').addEventListener('click', function() {
		submitCoords(geocoder, map, infoWindow, initialMarker);
	});
	
	map.addListener('click', function(e) {
		mapClick(geocoder, map, infoWindow, initialMarker, e.latLng);
	});
	
	document.getElementById("drop_zone").addEventListener('drop', function(e) {
		dropHandler(e, geocoder, map, newInfoWindow, newMarker);
	});
	
	document.getElementById("drop_zone").addEventListener('dragover', function(e) {
		dragOverHandler(e);
	});
}

function handleLocationError(browserHasGeolocation, infoWindow, pos) {
	infoWindow.setPosition(pos);
	infoWindow.setContent(browserHasGeolocation ?
		'Error: The Geolocation service failed.' :
		'Error: Your browser doesn\'t support geolocation.');
	infoWindow.open(map);
}

function submitCoords(geocoder, map, infoWindow, marker){
	var input = document.getElementById('latlng').value;
    var latlngStr = input.split(',', 2);
	var latlng = {lat: parseFloat(latlngStr[0]), lng: parseFloat(latlngStr[1])};
	geocodeLatLng(geocoder, map, infoWindow, marker, latlng);
	message = [latlng["lat"], latlng["lng"], false, false];
	distanceWorker.postMessage(message);
}

function mapClick(geocoder, map, infoWindow, marker, latlng){
	geocodeLatLng(geocoder, map, infoWindow, marker, latlng);
	message = [latlng.lat(), latlng.lng(), false, false];
	distanceWorker.postMessage(message);
}

function geocodeLatLng(geocoder, map, infoWindow, marker, latlng) {
	geocoder.geocode({'location': latlng}, function(results, status) {
		if (status === 'OK') 
		{
			if (results[0]) 
			{
				map.setZoom(11);
				marker.setPosition(latlng);
				map.setCenter(latlng);
				infoWindow.setContent(results[0].formatted_address);
				infoWindow.open(map, marker);
				if (marker.title == "start")
				{
					document.getElementById('start').innerText = "From: "
					document.getElementById('start-coords').innerText = results[0].formatted_address;
				}
				else if (marker.title == "end")
				{
					document.getElementById('end').innerText = "To: "
					document.getElementById('end-coords').innerText = results[0].formatted_address;
				}
			} 
			else 
			{
				window.alert('No results found');
			}
		} 
		else 
		{
			window.alert('Geocoder failed due to: ' + status);
		}
	});
}

function dropHandler(ev, geocoder, map, infoWindow, marker) {
	console.log('File dropped');
	//Prevent default behavior (Prevent file from being opened)
	ev.preventDefault();

	if (ev.dataTransfer.items) 
	{
		// Use DataTransferItemList interface to access the file
		if (ev.dataTransfer.items[0].kind === 'file') {
			var newCoords;
			var file = ev.dataTransfer.items[0].getAsFile();
			var reader = new FileReader();
			reader.onload = function(){
				var content = reader.result;
				newCoords = reader.result.split(",");
				var coords = {lat: parseFloat(newCoords[0]), lng: parseFloat(newCoords[1])};
				geocodeLatLng(geocoder, map, infoWindow, marker, coords);
				message = [false, false, coords["lat"], coords["lng"]];
				distanceWorker.postMessage(message);
			};
			reader.readAsText(file);
		}
	} 
	else 
	{
		console.warn("File upload failed");
	}
}

function dragOverHandler(ev) {
	//console.log('File in drop zone'); 
	ev.preventDefault();
}


function handleWorkerError(event) {
	console.warn('Error in web worker: ', event.message);
}

function handleWorkerMessage(event) {
	document.getElementById('dist').innerText = "Distance: "
	document.getElementById('distance').innerText = (Math.round(event.data*100)/100) + "km" ;
}
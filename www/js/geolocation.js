/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

document.addEventListener("deviceready", onDeviceReady, false);
document.addEventListener("offline", onOfflineMode, false);
document.addEventListener("online", onOnlineMode, false);
var offline;

function onDeviceReady() {
	document.addEventListener('touchmove', function(e) { e.preventDefault(); }, false);
	checkConnection();


	function onOfflineMode() {
		//if the device has no internet connection, set var to true
		offline = true;
	}

	function onOnlineMode() {
		//if the device has an internet connection, set var to false
		offline = false;
	}

	function checkConnection() {
		//Checks if the device is offline, if so do not try and get geolocation
		if(offline == true){
			$("#noInternet").css("display", "block");
			$("#mapSection").css("display", "none");
		} else {
			$("#noInternet").css("display", "none");
			$("#mapSection").css("display", "block");
			navigator.geolocation.getCurrentPosition(onSuccess, onError);
		}
	}

	function onSuccess(position) {	

		//Display the current position of the device

		//Create a new point on the google maps with device geolocation
		var point = new google.maps.LatLng(position.coords.latitude, 
										position.coords.longitude);

		// Initialize the Google Maps API v3
		var map = new google.maps.Map(document.getElementById('mapSection'), {
									zoom: 16,
									center: point,
									mapTypeId: google.maps.MapTypeId.ROADMAP
									});

		// Place a marker on the map of current location
		new google.maps.Marker({ position: point, map: map}); 
	}

	// onError Callback
	function onError(error) {
		//If there is an error, display message
		$('#mapSection').text(error.message);
	}

}
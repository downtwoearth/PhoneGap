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
var x, y, c, ctx, gameCtx;
var currentX = 10;
var currentY = 10;

function onDeviceReady() {
	
	drawLine();
	watchAcc();
	
	function watchAcc() {

		var options = { frequency: 1000 }; 
		
		var activeId;
		$(".wrapper").each(function(i,obj){
			if($(obj).hasClass("ui-page-active")){
				activeId = $(obj).attr("id");
			}
		});

		if(activeId == "game") {
			var watchID = navigator.accelerometer.watchAcceleration(onGameSuccess, onGameError, options);
		} else {
			var watchID = navigator.accelerometer.watchAcceleration(onSuccess, onError, options);
		}
	}

	function onSuccess(acceleration) {

		x = acceleration.x;
		y = acceleration.y;

		$('#currentX').text('X : ' + x);
		$('#currentY').text('Y : ' + y);

		$('#currentVal').text($('#myCanvas').width());

		if(x < -2) {
			currentX = currentX + (Math.abs(x) * 10);
			
			if(currentX < ($('#myCanvas').width() - 100)) {
				ctx.clearRect ( 0 , 0 , $('#myCanvas').width() , $('#myCanvas').height() );
				ctx.fillRect(currentX, currentY, 100, 50);
			} else {
				currentX = $('#myCanvas').width() - 100;
			}
			$('#currentVal').text(currentX);
		} else if(x > 2) {
			currentX = currentX - (Math.abs(x) * 10);
			
			if(currentX > 0) {
				ctx.clearRect ( 0 , 0 , $('#myCanvas').width() , $('#myCanvas').height() );
				ctx.fillRect(currentX, currentY, 100, 50);
			} else {
				currentX = 0;
			}
			$('#currentVal').text(currentX);
		}

		if(y > 6) {
			currentY = currentY + 10;

			if(currentY < ($('#myCanvas').height() - 50)) {
				ctx.clearRect ( 0 , 0 , $('#myCanvas').width() , $('#myCanvas').height() );
				ctx.fillRect(currentX, currentY, 100, 50);
			} else {
				currentY = $('#myCanvas').height() - 50;
			}
		} else if (y < 3) {
			currentY = currentY - (Math.abs(y) * 10);

			if(currentY > 0) {
				ctx.clearRect ( 0 , 0 , $('#myCanvas').width() , $('#myCanvas').height() );
				ctx.fillRect(currentX, currentY, 100, 50);
			} else {
				currentY = 0;
			}
		}
	}

	function onError() {
	   $('#currentY').text('An error occured');

	}

	function drawLine()
	{
		ctx=document.getElementById("myCanvas").getContext("2d");
		ctx.fillStyle = "rgb(150,29,28)";
		ctx.fillRect(currentX, currentY, 100, 50);
	}

}

/* Game Section */
function startGame() {

	gameCtx=document.getElementById("gameCanvas").getContext("2d");
	gameCtx.fillStyle = "rgb(150,29,28)";
	gameCtx.fillRect(125, 125, 50, 20);

	watchGameAcc();

}

function watchGameAcc() {
	var options = { frequency: 1000 }; 
	var watchID = navigator.accelerometer.watchAcceleration(onGameSuccess, onGameError, options);
}

function onGameSuccess() {
	if(x < -2) {
				currentX = currentX + (Math.abs(x) * 10);
			
				if(currentX < ($('#gameCanvas').width() - 100)) {
					ctx.clearRect ( 0 , 0 , $('#gameCanvas').width() , $('#gameCanvas').height() );
					ctx.fillRect(currentX, currentY, 100, 50);
				} else {
					currentX = $('#gameCanvas').width() - 100;
				}
			} else if(x > 2) {
				currentX = currentX - (Math.abs(x) * 10);
			
				if(currentX > 0) {
					ctx.clearRect ( 0 , 0 , $('#gameCanvas').width() , $('#gameCanvas').height() );
					ctx.fillRect(currentX, currentY, 100, 50);
				} else {
					currentX = 0;
				}
			}
}

function onGameError() {

}
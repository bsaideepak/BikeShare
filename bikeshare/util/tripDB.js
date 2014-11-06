/**
 * Author: Sai
 */

var bikeDB = require("./util/bikeDB");
var costMetricsDB = require("./util/costMetricsDB");
var bikeStationDB = require("./util/bikeStationDB");

var MongoClient = require('mongodb').MongoClient;


function insertTrip(callback,json){
	
	if(json.timeRequested && json.bookingStartTime && json.bookingEndTime && json.bookingDay && json.pickUpPoint && json.dropOffPoint && json.userEmail && json.bikeId && json.bikeName && json.tripStatus)
	{
		MongoClient.connect('mongodb://127.0.0.1:27017/bikeShare123', function(err, db) {
			if(err){
				console.log("Error: "+err);
			}
			else
			{	
				var d = new Date();
				var timeStamp = d.getTime();
		
				json.tripId = json.bikeId + timeStamp + json.totalHrsUsed; 

				var bikeCosts;
				var costOverheads = [];

				bikeDB.findBikeById(function(err,result){
					if(!err){
						result.toArray(function(err,docs){
							if(!docs.length == 0){

								costOverheads.categoryPriority = docs[0].categoryPriority;
								costOverheads.insurancePriority = docs[0].insurancePriority;

								bikeStationDB.findLocationPriorityByBikeStationId(function(err,locationP){

									if(!err){
										costOverheads.locationPriority = locationP;

										bikeStationDB.decreaseResourceCountAndIncreaseEmptySlots(json.pickUpPoint);


									}

								}json.pickUpPoint);
							}
						})
						
					}
				},json.bikeId);


				costOverheads.bookingStartTime = json.bookingStartTime;
				costOverheads.bookingEndTime = json.bookingEndTime;

				json.costPerHr = costMetricsDB.getCostPerHr(costOverheads);

				db.collection("trip", function (err, connection){

					connection.insert({'tripId':json.tripId,'timeRequested':json.timeRequested,'bookingStartTime':json.bookingStartTime,'bookingEndTime':json.bookingEndTime ,'bookingDay':json.bookingDay, 'pickUpPoint':json.pickUpPoint ,'dropOffPoint':json.dropOffPoint ,'userEmail':json.userEmail ,'bikeId':json.bikeId ,'bikeName':json.bikeName ,'tripStatus':json.tripStatus, 'costPerHr': json.costPerHr},function (err,result){

						if(err){
							console.log(err);
							db.close();
						}
						else{
							var status = "Successfully Inserted";
							
							db.close();
							console.log("Operation Successful.");
							callback(err,status);
						}
					});
				});
			}

		});
	}
	else{
		console.log("Insufficient Data.");
		db.close();
	}
}

exports.insertTrip = insertTrip;


function updateTripStatus(json){

	if(json.tripStatus && json.tripId)
	{
		MongoClient.connect('mongodb://127.0.0.1:27017/bikeShare123', function(err, db) {

			if(err){
				console.log("Error: "+err);
				db.close();
			}
			else
			{	
				db.collection("trip", function (err, connection){

					cconnection.findAndModify({query: {'tripId': json.tripId },update: { $set: { 'tripStatus':json.tripStatus} }, upsert: true },function(err,result){

						if(err){
							console.log(err);
							db.close();
						}
						else{
							console.log("Successfully Updated.");
							db.close();
						}
					});
				});
			}

		});
	}
	else{
		console.log("Insufficient Data.");
		db.close();
	}
}

exports.updateTripStatus = updateTripStatus;	


function removeTrip(json){

	if(json.tripId && json.timeRequested && json.bookingStartTime && json.bookingEndTime && json.bookingDay && json.pickUpPoint && json.dropOffPoint && json.userEmail && json.bikeId && json.bikeName && json.tripStatus)
	{
		MongoClient.connect('mongodb://127.0.0.1:27017/bikeShare123', function(err, db) {
			
			if(err){
				console.log("Error: "+err);
				db.close();
			}
			else
			{
				db.collection("trip", function (err, connection){

					connection.remove({'tripId':json.tripId,'timeRequested':json.timeRequested,'bookingStartTime':json.bookingStartTime,'bookingEndTime':json.bookingEndTime ,'bookingDay':json.bookingDay, 'pickUpPoint':json.pickUpPoint ,'dropOffPoint':json.dropOffPoint ,'userEmail':json.userEmail ,'bikeId':json.bikeId ,'bikeName':json.bikeName ,'tripStatus':json.tripStatus , 'costPerHr': json.costPerHr},function (err,result){
						
						if(err){
							console.log(err);
							db.close();
						}

						else{
							console.log("Successfully Removed");
							db.close();
						}
					});
				});
			}
		});
	}
	else{
		console.log("Insufficient Data.");
		db.close();
	}
}

exports.removeTrip = removeTrip;

function findAllTrips(callback){

	MongoClient.connect('mongodb://127.0.0.1:27017/bikeShare123', function(err, db) {

		if(err){
				console.log("Error: "+err);
				db.close();
				callback(err,new Error("Error: "+ err));
		}
		else
		{
			db.collection("trip", function (err, connection){
				if(err){
					console.log("No such database exists.");
					db.close();
					callback(err,new Error("Error: "+ err));
				}
				else{
					connection.find(function(err,result){
						if(err){
							console.log("No order exists.");
							db.close();
							callback(err,new Error("Error: "+ err));
						}
						else{
							db.close();
							callback(err,result);
						}
					});
				}

			});
		}
	});
}
exports.findAllTrips = findAllTrips;

function findAllTripsByTripId(callback,tripId){

	MongoClient.connect('mongodb://127.0.0.1:27017/bikeShare123', function(err, db) {

		if(err){
				console.log("Error: "+err);
				db.close();
				callback(err,new Error("Error: "+ err));
		}
		else
		{
			db.collection("trip", function (err, connection){
				
				if(err){
					console.log("No such database exists.");
					db.close();
					callback(err,new Error("Error: "+ err));
				}
				else{
					connection.find({"tripId":tripId},function(err,result){
						if(err){
							console.log("No order exists.");
							db.close();
							callback(err,new Error("Error: "+ err));
						}
						else{
							db.close();
							callback(err,result);
						}
					});
				}

			});
		}
	});
}
exports.findAllTripsByTripId = findAllTripsByTripId;

//Update bikeStation resourceCount & emptySlots based on dropOffPoint & bookingEndTime



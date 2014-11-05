/**
 * Author: Sai
 */

var MongoClient = require('mongodb').MongoClient;

function insertBikeStation(json){
	
	if(json.latitude && json.longitude && json.resourceCount && json.stationName && json.emptySlots){

		MongoClient.connect('mongodb://127.0.0.1:27017/bikeShare123', function(err, db) {
			
			if(err){
				console.log("Error: "+err);
			}
		
			else
			{	
				//var d = new Date();
				//var timeStamp = d.getTime();
		
				//json.orderId = json.firstname + timeStamp + json.lastname; 
				db.collection("bikeStation", function (err, connection){
				
					connection.insert({'lat':json.latitude,'long':json.longitude,'resourceCount':json.resourceCount,'stationName':json.stationName, 'stationId':json.stationId,'emptySlots':json.emptySlots, 'locationPriority': json.locationPriority},function (err,result){
					
						if(err){
							console.log(err);
							db.close();
						}
					
						else{
							console.log("Operation Successful.");
							db.close();
						}
					});
				});
			}
		});
	}
}

exports.insertBikeStation = insertBikeStation;



function updateBikeStationResources(json){

	if(json.latitude && json.longitude && json.resourceCount && json.stationName && json.emptySlots && json.stationId){

		MongoClient.connect('mongodb://127.0.0.1:27017/bikeShare123', function(err, db) {
			if(err){
				console.log("Error: "+err);
				db.close();
			}
			else
			{	
				db.collection("bikeStation", function (err, connection){

					cconnection.findAndModify({query: {"stationId": json.stationId },update: { $set: { "resourceCount": json.resourceCount, "emptySlots": json.emptySlots } }, upsert: true },function(err,result){

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

exports.updateBikeStationResources = updateBikeStationResources;	



function updateBikeStationPriority(json){

	if(json.latitude && json.longitude && json.resourceCount && json.stationName && json.emptySlots && json.stationId){

		MongoClient.connect('mongodb://127.0.0.1:27017/bikeShare123', function(err, db) {
			if(err){
				console.log("Error: "+err);
				db.close();
			}
			else
			{	
				db.collection("bikeStation", function (err, connection){

					cconnection.findAndModify({query: {"stationId": json.stationId },update: { $set: { "locationPriority": json.locationPriority } }, upsert: true },function(err,result){

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

exports.updateBikeStationPriority = updateBikeStationPriority;	


function removeBikeStation(json){

	if(json.latitude && json.longitude && json.stationId && json.stationName && json.resourceCount && json.emptySlots){

		MongoClient.connect('mongodb://127.0.0.1:27017/bikeShare123', function(err, db) {
			if(err){
				console.log("Error: "+err);
				db.close();
			}
			else
			{
				db.collection("bikeStation", function (err, connection){

					connection.remove({'lat':json.latitude,'long':json.longitude,'resourceCount':json.resourceCount,'stationName':json.stationName, 'stationId':json.stationId,'emptySlots':json.emptySlots, 'locationPriority': json.locationPriority},function (err,result){
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

exports.removeBikeStation = removeBikeStation;

function findAllBikeStations(callback){

	MongoClient.connect('mongodb://127.0.0.1:27017/bikeShare123', function(err, db) {

		if(err){
				console.log("Error: "+err);
				db.close();
		}
		else
		{
			db.collection("bikeStation", function (err, connection){
				if(err){
					console.log("No such database exists.");
					db.close();
				}
				else{
					connection.find(function(err,result){
						if(err){
							console.log("");
							db.close();
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
exports.findAllBikeStations = findAllBikeStations;



function findAllBikeStationsWhereEmptySlotsExist(callback){

	MongoClient.connect('mongodb://127.0.0.1:27017/bikeShare123', function(err, db) {

		if(err){
				console.log("Error: "+err);
				db.close();
		}
		else
		{
			db.collection("bikeStation", function (err, connection){
				if(err){
					console.log("No such database exists.");
					db.close();
				}
				else{
					connection.find({'emptySlots': { $gt:0 } }, function(err,result){
						if(err){
							console.log("");
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
exports.findAllBikeStationsWhereEmptySlotsExist = findAllBikeStationsWhereEmptySlotsExist;


function findLocationPriorityByBikeStationId(callback,stationId){

	var locPriority;
	MongoClient.connect('mongodb://127.0.0.1:27017/bikeShare123', function(err, db) {

		if(err){
				console.log("Error: "+err);
				db.close();
		}
		else
		{
			db.collection("bikeStation", function (err, connection){
				if(err){
					console.log("No such database exists.");
					db.close();
				}
				else{
					connection.find({'stationId': stationId }, function(err,result){
						if(err){
							console.log("");
							db.close();
							callback(err,locationPriority);
						}
						else{
							result.toArray(function(err,docs){
								if(!docs.length == 0){
									locPriority = docs[0].locationPriority;
									callback(err,locationPriority);

								}
								db.close();
							})
							
							
						}
					});
				}

			});
		}
	});
}
exports.findLocationPriorityByBikeStationId = findLocationPriorityByBikeStationId;




//Function to find Nearest Lovations of bikeStations.


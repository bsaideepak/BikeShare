/**
 * Author: Sai
 */

var MongoClient = require('mongodb').MongoClient;

function insertBike(json){
	
	if(json.bikeId && json.bikeId && json.bikeName && json.currentStationId){

		MongoClient.connect('mongodb://127.0.0.1:27017/bikeShare123', function(err, db) {
			
			if(err){
				console.log("Error: "+err);
			}
		
			else
			{	
				//var d = new Date();
				//var timeStamp = d.getTime();
		
				//json.orderId = json.firstname + timeStamp + json.lastname; 
				db.collection("bike", function (err, connection){
				
					connection.insert({'bikeId':json.bikeId,'bikeName':json.bikeName,'availableUpto':json.availableUpto,'categoryPriority':json.categoryPriority, 'insurancePriority':json.insurancePriority, 'categoryPriority':json.categoryPriority,  'currentStationId':json.currentStationId},function (err,result){
					
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

exports.insertBike = insertBike;


function updateBikeInfo(json){

	if(json.bikeId && json.bikeId && json.bikeName){

		MongoClient.connect('mongodb://127.0.0.1:27017/bikeShare123', function(err, db) {

			if(err){
				console.log("Error: "+err);
				db.close();
			}

			else
			{	
				db.collection("bike", function (err, connection){

					cconnection.findAndModify({query: {"bikeId": json.bikeId },update: { $set: { 'availableUpto':json.availableUpto, 'currentStationId':json.currentStationId } }, upsert: true },function(err,result){

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

exports.updateBikeInfo = updateBikeInfo;	


function removeBike(json){

	if(json.bikeId && json.bikeId && json.bikeName){

		MongoClient.connect('mongodb://127.0.0.1:27017/bikeShare123', function(err, db) {
			
			if(err){
				console.log("Error: "+err);
				db.close();
			}

			else
			{
				db.collection("bike", function (err, connection){

					connection.remove({'bikeId':json.bikeId,'bikeName':json.bikeName,'availableUpto':json.availableUpto, 'categoryPriority':json.categoryPriority, 'insurancePriority':json.insurancePriority, 'categoryPriority':json.categoryPriority,  'currentStationId':json.currentStationId},function (err,result){
						
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

exports.removeBike = removeBike;

function findAllBikes(callback){

	MongoClient.connect('mongodb://127.0.0.1:27017/bikeShare123', function(err, db) {

		if(err){
				console.log("Error: "+err);
				db.close();
				callback(err,new Error("Error: "+ err));
		}
		else
		{
			db.collection("bike", function (err, connection){

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
							callback(err,result);
							db.close();
						}
					});
				}

			});
		}
	});
}
exports.removeBikeStation = removeBikeStation;

function findAllBikesByCurrentStationId(callback, currentStationId){

	MongoClient.connect('mongodb://127.0.0.1:27017/bikeShare123', function(err, db) {

		if(err){
				console.log("Error: "+err);
				db.close();
				callback(err,new Error("Error: "+ err));
		}
		else
		{
			db.collection("bike", function (err, connection){

				if(err){
					console.log("No such database exists.");
					db.close();
					callback(err,new Error("Error: "+ err));
				}
				else{
					connection.find({'currentStationId':currentStationId},function(err,result){

						if(err){
							console.log("No order exists.");
							db.close();
							callback(err,new Error("Error: "+ err));
						}
						else{
							callback(err,result);
							db.close();
						}
					});
				}

			});
		}
	});
}
exports.findAllBikesByCurrentStationId = findAllBikesByCurrentStationId;


function findBikeById(callback, bikeId){

	MongoClient.connect('mongodb://127.0.0.1:27017/bikeShare123', function(err, db) {

		if(err){
				console.log("Error: "+err);
				db.close();
				callback(err,new Error("Error: "+ err));
		}
		else
		{
			db.collection("bike", function (err, connection){

				if(err){
					console.log("No such database exists.");
					db.close();
					callback(err,new Error("Error: "+ err));
				}
				else{
					connection.find({'bikeId':bikeId},function(err,result){

						if(err){
							console.log("No bike exists.");
							db.close();
							callback(err,new Error("Error: "+ err));
						}
						else{
							callback(err,result);
							db.close();
						}
					});
				}

			});
		}
	});
}
exports.findBikeById = findBikeById;



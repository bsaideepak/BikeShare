/**
 * Author: Sai
 */

var MongoClient = require('mongodb').MongoClient;

function insertTransaction(json){
	
	if(json.tripId && json.totalHrsUsed && json.totalCost)
	{
		MongoClient.connect('mongodb://127.0.0.1:27017/bikeShare123', function(err, db) {
			if(err){
				console.log("Error: "+err);
			}
			else
			{ 
				db.collection("receipts", function (err, connection){

					connection.insert({'tripId':json.tripId,'totalHrsUsed':json.totalHrsUsed,'totalCost':json.totalCost,'totalMilesTravelled':json.totalMilesTravelled},function (err,result){

						if(err){
							console.log(err);
							db.close();
						}
						else{
							db.close();
							console.log("Operation Successful.");
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

exports.insertTransaction = insertTransaction;


function updateTransaction(json){

	if(json.tripId && json.totalHrsUsed && json.totalCost)
	{
		MongoClient.connect('mongodb://127.0.0.1:27017/bikeShare123', function(err, db) {

			if(err){
				console.log("Error: "+err);
				db.close();
			}
			else
			{	
				db.collection("receipts", function (err, connection){

					cconnection.findAndModify({query: {'tripId': json.tripId },update: { $set: { 'totalHrsUsed':json.totalHrsUsed, 'totalCost':json.totalCost, 'totalMilesTravelled':json.totalMilesTravelled} }, upsert: true },function(err,result){

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

exports.updateTransaction = updateTransaction;	


function removeTransaction(json){

	if(json.tripId && json.totalHrsUsed && json.totalCost)
	{
		MongoClient.connect('mongodb://127.0.0.1:27017/bikeShare123', function(err, db) {
			
			if(err){
				console.log("Error: "+err);
				db.close();
			}
			else
			{
				db.collection("receipts", function (err, connection){

					connection.remove({'tripId':json.tripId,'totalHrsUsed':json.totalHrsUsed,'totalCost':json.totalCost,'totalMilesTravelled':json.totalMilesTravelled},function (err,result){
						
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

exports.removeTransaction = removeTransaction;

function findAllTransactions(callback){

	MongoClient.connect('mongodb://127.0.0.1:27017/bikeShare123', function(err, db) {

		if(err){
				console.log("Error: "+err);
				db.close();
				callback(err,new Error("Error: "+ err));
		}
		else
		{
			db.collection("receipts", function (err, connection){
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
exports.findAllTransactions = findAllTransactions;

function findAllTransactionsByTripId(callback,tripId){

	MongoClient.connect('mongodb://127.0.0.1:27017/bikeShare123', function(err, db) {

		if(err){
				console.log("Error: "+err);
				db.close();
				callback(err,new Error("Error: "+ err));
		}
		else
		{
			db.collection("receipts", function (err, connection){
				
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
exports.findAllTransactionsByTripId = findAllTransactionsByTripId;


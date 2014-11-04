/**
 * Author: Sai
 */

var MongoClient = require('mongodb').MongoClient;

function insertTransaction(callback,json){
	
	if(json.timeRequested && json.bikeId && json.pickUpPointStationId && json.bookingStartTime && json.dropOffPointStationId && json.bikerUsername && json.cost && json.bikerName && json.bikeName && json.bikerEmail)
	{
		MongoClient.connect('mongodb://127.0.0.1:27017/bikeShare123', function(err, db) {
			if(err){
				console.log("Error: "+err);
			}
			else
			{	
				var d = new Date();
				var timeStamp = d.getTime();
		
				json.transactionId = json.bikeId + timeStamp + json.timeRequested; 

				db.collection("receipts", function (err, connection){

					connection.insert({'transactionId':json.transactionId,'pickUpPoint':json.pickUpPointStationId,'bookingStartTime':json.bookingStartTime,'dropOffPoint':json.dropOffPointStationId,'bookingEndTime':json.bookingEndTime, 'bikeName':json.bikeName,'bikeId':json.bikeId,'bikerName':json.bikerName, 'bikerUsername':json.bikerUsername, 'timeRequested':json.timeRequested,'cost':json.cost, 'bikerEmail': json.bikerEmail},function (err,result){

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

exports.insertTransaction = insertTransaction;


function updateTransaction(json){

	if(json.timeRequested && json.bikeId && json.pickUpPointStationId && json.bookingStartTime && json.dropOffPointStationId && json.bikerUsername && json.cost && json.bikerName && json.bikeName)
	{
		MongoClient.connect('mongodb://127.0.0.1:27017/bikeShare123', function(err, db) {

			if(err){
				console.log("Error: "+err);
				db.close();
			}
			else
			{	
				db.collection("receipts", function (err, connection){

					cconnection.findAndModify({query: {'transactionId': json.transactionId , 'bikerUsername': json.bikerUsername },update: { $set: { 'bookingStartTime':json.bookingStartTime, 'bookingEndTime':json.bookingEndTime, 'pickUpPointStationId':json.pickUpPointStationId, 'dropOffPointStationId':json.dropOffPointStationId } }, upsert: true },function(err,result){

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

	if(json.timeRequested && json.bikeId && json.pickUpPoint && json.dropOffPoint && json.bikerName && json.cost && json.bikerName){

		MongoClient.connect('mongodb://127.0.0.1:27017/bikeShare123', function(err, db) {
			
			if(err){
				console.log("Error: "+err);
				db.close();
			}
			else
			{
				db.collection("receipts", function (err, connection){

					connection.remove({'transactionId':json.transactionId,'pickUpPoint':json.pickUpPointStationId,'bookingStartTime':json.bookingStartTime,'dropOffPoint':json.dropOffPointStationId,'bookingEndTime':json.bookingEndTime, 'bikeName':json.bikeName,'bikeId':json.bikeId,'bikerName':json.bikerName, 'bikerUsername':json.bikerUsername, 'timeRequested':json.timeRequested,'cost':json.cost, 'bikerEmail': json.bikerEmail},function (err,result){
						
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
		}
		else
		{
			db.collection("receipts", function (err, connection){
				if(err){
					console.log("No such database exists.");
					db.close();
				}
				else{
					connection.find(function(err,result){
						if(err){
							console.log("No order exists.");
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
exports.findAllTransactions = findAllTransactions;

function findAllTransactionsByTransactionId(callback,transactionId){

	MongoClient.connect('mongodb://127.0.0.1:27017/bikeShare123', function(err, db) {

		if(err){
				console.log("Error: "+err);
				db.close();
		}
		else
		{
			db.collection("receipts", function (err, connection){
				
				if(err){
					console.log("No such database exists.");
					db.close();
				}
				else{
					connection.find({"TransactionId":transactionId},function(err,result){
						if(err){
							console.log("No order exists.");
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
exports.findAllTransactionsByTransactionId = findAllTransactionsByTransactionId;


function findAllTransactionsByBikerUsername(callback,bikerName){

	MongoClient.connect('mongodb://127.0.0.1:27017/bikeShare123', function(err, db) {

		if(err){
				console.log("Error: "+err);
				db.close();
		}
		else
		{
			db.collection("receipts", function (err, connection){
				
				if(err){
					console.log("No such database exists.");
					db.close();
				}
				else{
					connection.find({"bikerUsername":bikerUsername},function(err,result){
						if(err){
							console.log("No order exists.");
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
exports.findAllTransactionsByBikerUsername = findAllTransactionsByBikerUsername;

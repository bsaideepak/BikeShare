/**
 * Author: Sai
 */

var MongoClient = require('mongodb').MongoClient;

function insertTransaction(callback,json){
	
	if(json.timeRequested && json.bikeId && json.pickUpPoint && json.startTime && json.dropOffPoint && json.bikerName && json.cost && json.bikerName)
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

					connection.insert({'transactionId':json.transactionId,'pickUpPoint':json.pickUpPoint,'bookingStartTime':json.bookingStartTime,'dropOffPoint':json.dropOffPoint,'bookingEndTime':json.bookingEndTime, 'bikerName':json.bikerName,'bikeId':json.bikeId,'bikerName':json.bikerName,'timeRequested':json.timeRequested,'cost':json.cost},function (err,result){

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

	if(json.timeRequested && json.bikeId && json.pickUpPoint && json.dropOffPoint && json.bikerName && json.cost && json.bikerName){

		MongoClient.connect('mongodb://127.0.0.1:27017/bikeShare123', function(err, db) {

			if(err){
				console.log("Error: "+err);
				db.close();
			}
			else
			{	
				db.collection("receipts", function (err, connection){

					cconnection.findAndModify({query: {'bikeId': json.bikeId , 'bookingStartTime': json.bookingStartTime },update: { $set: { 'bookingStartTime':json.bookingStartTime, 'bookingEndTime':json.bookingEndTime, 'pickUpPoint':json.pickUpPoint, 'dropOffPoint':json.dropOffPoint } }, upsert: true },function(err,result){

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

					connection.remove({'transactionId':json.transactionId,'pickUpPoint':json.pickUpPoint,'bookingStartTime':json.bookingStartTime,'dropOffPoint':json.dropOffPoint,'bookingEndTime':json.bookingEndTime, 'bikerName':json.bikerName,'bikeId':json.bikeId,'bikerName':json.bikerName,'timeRequested':json.timeRequested,'cost':json.cost},function (err,result){
						
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


function findAllTransactionsByBikerName(callback,bikerName){

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
					connection.find({"bikerName":bikerName},function(err,result){
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
exports.findAllTransactionsByBikerName = findAllTransactionsByBikerName;

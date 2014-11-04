var MongoClient = require('mongodb').MongoClient;

function newUser(json){
	
	if(json.username && json.password && json.emailId){

		MongoClient.connect('mongodb://127.0.0.1:27017/bikeShare123', function(err, db) {
			
			if(err){
				console.log("Error: "+err);
			}
		
			else
			{	
				db.collection("userAccounts", function (err, connection){
				
					connection.insert({'username':json.username,'password':json.password,'emailId':json.emailId},function (err,result){
					
						if(err){
							console.log(err);
							db.close();
						}
					
						else{
							console.log("New User Created.");
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

exports.newUser = newUser;


function changeUserPassword(json){
	
	if(json.username && json.password && json.emailId){

		MongoClient.connect('mongodb://127.0.0.1:27017/bikeShare123', function(err, db) {
			
			if(err){
				console.log("Error: "+err);
			}
		
			else
			{	
				db.collection("userAccounts", function (err, connection){
				
					connection.findAndModify({query: {'username':json.username, 'password':json.password}, update: {$set: {'username':json.username,'password':json.newPassword } },upsert: true},function (err,result){
					
						if(err){
							console.log(err);
							db.close();
						}
					
						else{
							console.log("User Password Updated.");
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

exports.changeUserPassword = changeUserPassword;

function removeUser(json){
	
	if(json.username && json.password && json.emailId){

		MongoClient.connect('mongodb://127.0.0.1:27017/bikeShare123', function(err, db) {
			
			if(err){
				console.log("Error: "+err);
			}
		
			else
			{	
				db.collection("userAccounts", function (err, connection){
				
					connection.remove({'username':json.username,'password':json.password,'emailId':json.emailId},function (err,result){
					
						if(err){
							console.log(err);
							db.close();
						}
					
						else{
							console.log("User Deleted.");
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

exports.removeUser = removeUser;


function userLogin(callback,json){
	
	if(json.username && json.password){

		var authenticated;

		MongoClient.connect('mongodb://127.0.0.1:27017/bikeShare123', function(err, db) {
			
			if(err){
				console.log("Error: "+err);
			}
		
			else
			{	
				db.collection("userAccounts", function (err, connection){
				
					connection.find({'username':json.username,'password':json.password},function (err,result){
					
						if(err){
							authenticated = 0;
							console.log(err);
							db.close();
						}
					
						else{
							
							var username;
							var password;
							
							result.toArray(function(err,docs){
								
								if(!docs.length==0)
								{
									//console.log(docs);
									username = docs[0].username;
									password = docs[0].password;

									if(json.username==username && json.password == password)
									{
										authenticated = 1;
										console.log("User Authenticated");
										callback(err,authenticated);
									}
									else
									{
										authenticated = 0;
										console.log("User Not Authenticated");
										callback(err,authenticated);
									}
								}
								else{
									console.log("ERROR.");
								}
							});
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

exports.userLogin = userLogin;




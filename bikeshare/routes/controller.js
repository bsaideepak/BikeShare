/**
 * Author: Sai
 */


var userAccountsDB = require("../util/userAccountsDB");
var bikeStationDB = require("../util/bikeStationDB");
var bikeDB = require("../util/bikeDB");
var receiptDB = require("../util/receiptDB");

var latitude;
var longitude;

 exports.userLogin = function (req, res) {
	if(!req.body.hasOwnProperty('userEmail') || !req.body.hasOwnProperty('password')) {
		res.statusCode = 400;
		return res.send('Error 400: Post syntax incorrect.');
	}
	var json = [];
	json.userEmail = req.body.userEmail;
	json.password = req.body.password;

	req.session.latitude = req.body.latitude;
	req.session.longitude = req.body.longitude;

	latitude = req.session.latitude;
	longitude = req.session.longitude;

	
	userAccountsDB.userLogin(function(err,results){
		if(err){
			console.log(err);
		}
		else
		{
			if(results==1){

				req.session.userEmail = req.body.userEmail;
				console.log(req.session.userEmail);

				//res.render('../views/bikeStations.ejs');
				console.log("success");
			
			}
			
			else if(results==0)
			{
				console.log("Invalid Id or Password");
				//res.render('../views/LogInError.ejs');
			}
		}
	},json);
}

exports.signup = function (req, res) {
	if(!req.body.hasOwnProperty('userEmail') || !req.body.hasOwnProperty('password') || !req.body.hasOwnProperty('bikerName') || !req.body.hasOwnProperty('bikerAddress') ) {
		res.statusCode = 400;
		return res.send('Error 400: Post syntax incorrect.');
	}
	var json = [];
	json.userEmail = req.body.userEmail;
	json.password = req.body.password;
	json.bikerName = req.body.bikerName;
	json.bikerAddress = req.body.bikerAddress;

	userAccountsDB.newUser(json);

}



exports.checkSessionExists = function(req, res, next) {
	if(req.session.userEmail){
		next();
	}
	else{
		return res.render('../views/sessionExpired.ejs');
	}
}

exports.showAvailableBikeStations = function(req, res) {

	if(!req.body.hasOwnProperty('latitude') || !req.body.hasOwnProperty('longitude')) {
		res.statusCode = 400;
		return res.send('Error 400: Post syntax incorrect.');
	}

	var json = [];
	//json.latitude = req.body.latitude;
	//json.longitude = req.body.longitude;

	bikeStationDB.findAllBikeStations(function(err,results){
		if(err){
			console.log(err);
		}
		else
		{
			//res.render('../views/ResponsiveGoogleMap.ejs');
		}
	}/*,json*/);
}

exports.getbikeDetails = function(req, res) {

	if(!req.body.hasOwnProperty('latitude') || !req.body.hasOwnProperty('longitude') || !req.body.hasOwnProperty('currentStationId')) {
		res.statusCode = 400;
		return res.send('Error 400: Post syntax incorrect.');
	}

	var json = [];
	//json.latitude = req.body.latitude;
	//json.longitude = req.body.longitude;

	bikeDB.findAllBikesByCurrentStationId(function(err,results){
		if(err){
			console.log(err);
		}
		else
		{
			//res.render('../views/showAvailableBikes.ejs');
		}
	}, req.body.currentStationId);
}


exports.tripConfirmation = function(req, res) {

	if(!req.body.hasOwnProperty('bikeId') || !req.body.hasOwnProperty('bikeName') || !req.body.hasOwnProperty('availableUpto') || !req.body.hasOwnProperty('bookingStartTime') || !req.body.hasOwnProperty('bookingEndTime') || !req.body.hasOwnProperty('costPerHr') || !req.body.hasOwnProperty('currentStationId') ) {
		res.statusCode = 400;
		return res.send('Error 400: Post syntax incorrect.');
	}

	var json = [];
	json.bikeId = req.body.bikeId;
	json.bikeName = req.body.bikeName;
	json.availableUpto = req.body.availableUpto;
	json.bookingStartTime = req.body.bookingStartTime;
	json.bookingEndTime = req.body.bookingEndTime;
	json.costPerHr = req.body.costPerHr;
	json.currentStationId = req.body.currentStationId;

	bikeStationDB.findAllBikeStationsWhereEmptySlotsExist(function(err,result){

		if(!err){
			//res.render('../views/showAvailableDropOffPoints.ejs');
			//res.send(result);
		}

	});
}


exports.generateReceipt = function(req, res) {

	if(!req.body.hasOwnProperty('dropOffPoint') ) {
		res.statusCode = 400;
		return res.send('Error 400: Post syntax incorrect.');
	}

	var json = [];
	json.bikeId = req.session.bikeId;
	json.bikeName =  req.session.bikeName;
	json.availableUpto = req.session.availableUpto;   //check the need.
	json.bookingStartTime =  req.session.bookingStartTime;
	json.bookingEndTime = req.session.bookingEndTime;
	json.costPerHr = req.session.costPerHr;
	json.pickUpPoint = req.session.currentStationId;
	json.dropOffPoint = req.body.dropOffPoint;

	receipt.insertTransaction(function(err,result){

		if(!err){
			//res.render('../views/acknowledgement.ejs');
		}

	},json);
}


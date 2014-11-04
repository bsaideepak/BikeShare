var userAccountsDB = require("../util/userAccountsDB");
var bikeStationDB = require("../util/bikeStationDB");
var bikeDB = require("../util/bikeDB");
var receiptDB = require("../util/receiptDB");

 exports.userLogin = function (req, res) {
	if(!req.body.hasOwnProperty('username') || !req.body.hasOwnProperty('password')) {
		res.statusCode = 400;
		return res.send('Error 400: Post syntax incorrect.');
	}
	var json = [];
	json.username = req.body.username;
	json.password = req.body.password;
	
	userAccountsDB.userLogin(function(err,results){
		if(err){
			console.log(err);
		}
		else
		{
			if(results==1){

				req.session.username = req.body.username;
				console.log(req.session.username);

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


exports.checkSessionExists = function(req, res, next) {
	if(req.session.username){
		next();
	}
	else{
		return res.render('../views/sessionExpired.ejs');
	}
}

exports.showBikeStations = function(req, res) {

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

exports.showBikes = function(req, res) {

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


exports.reserveBike = function(req, res) {

	if(!req.body.hasOwnProperty('bikeId') || !req.body.hasOwnProperty('bikeName') || !req.body.hasOwnProperty('availableUpto') || !req.body.hasOwnProperty('bookingStartTime') || !req.body.hasOwnProperty('bookingEndTime') || !req.body.hasOwnProperty('costPerHr') || !req.body.hasOwnProperty('currentStationId') ) {
		res.statusCode = 400;
		return res.send('Error 400: Post syntax incorrect.');
	}

	//var json = [];
	req.session.bikeId = req.body.bikeId;
	req.session.bikeName = req.body.bikeName;
	req.session.availableUpto = req.body.availableUpto;
	req.session.bookingStartTime = req.body.bookingStartTime;
	req.session.bookingEndTime = req.body.bookingEndTime;
	req.session.costPerHr = req.body.costPerHr;
	req.session.currentStationId = req.body.currentStationId;

	bikeStationDB.findAllBikeStationsWhereEmptySlotsExist(function(err,result){

		if(!err){
			//res.render('../views/showAvailableDropOffPoints.ejs');
			//res.send(result);
		}

	});
}


exports.confirmBikeReservation = function(req, res) {

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


exports.homepage = function(req, res) {

	//res.render('../views/homepage.ejs');

}



var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var stations = require("./routes/stations");
var bike = require("./routes/bike");
var receipt = require("./routes/receipt");

var bikeStation = require("../util/bikeStation");
var bike = require("../util/bike");
var receipt = require("../util/receipt");

var routes = require('./routes/index');
var users = require('./routes/users');

var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,POST');
    res.header('Access-Control-Allow-Headers', 'Content-Type');

    next();
}


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.set('port', process.env.PORT || 3000);
app.use(allowCrossDomain);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

app.get('/', routes.index); //Record Current Location.
app.get('/stations', stations.getNearByStations);  //Nearby Stations in Green, others in Red.
app.post('/bikeDetails',bike.getBikesInfo);   //JSON having bike info, for all bikes available in the station.
app.post('/selectBike',receipt.generateReceipt);  //Generate receipt for the transaction.


http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});

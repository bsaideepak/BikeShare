var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var controller = require("./routes/controller");

var bikeStationDB = require("../util/bikeStationDB");
var bikeDB = require("../util/bikeDB");
var receiptDB = require("../util/receiptDB");
var userAccountsDB = require("../util/userAccountsDB");

var routes = require('./routes/index');
var users = require('./routes/users');

var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,POST');
    res.header('Access-Control-Allow-Headers', 'Content-Type');

    next();
}


var app = express();
var RedisStore = require('connect-redis')(express);

app.use(express.cookieParser());
app.use(express.session({
  store: new RedisStore({
    host: 'localhost',
    port: 6379,
    db: 2,
    pass: 'RedisPASS'
  }),
  secret: '1234567890QWERTY'
}));


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.set('port', process.env.PORT || 3000);
app.use(allowCrossDomain);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
//app.use(express.cookieParser());
//app.use(express.session({secret: '1234567890QWERTY'}));
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
app.post('/login',controller.userLogin);  //User Login.
app.get('/stations', controller.getNearByStations);  //Nearby Stations in Green, others in Red.
app.post('/bikeDetails',controller.getBikesInfo);   //JSON having bike info, for all bikes available in the station.
app.post('/selectBike',controller.generateReceipt);  //Generate receipt for the transaction.

app.all('*', function(req, res){
    //res.render(index.ejs)
    res.send(404);
})

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});

var express    = require('express');        // call express
var app        = express();                 // define our app using express
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/node-api');
var Bear = require('./models/bear');

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//stackoverflow resource
app.use(function(req,res,next){
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Expose-Headers', '*');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Origin, X-Requested-With, Accept');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS');
  next();
});

var port = process.env.PORT || 8080;        // set our port

// ROUTES FOR OUR API
// =============================================================================
var router = express.Router();              // get an instance of the express Router

//midleware to use for all requests
router.use(function (req, res, next){
  //do logging
  console.log('Something else is happening');
  next();//make sure to go the next routes and dont stop here
});

//request router
router.route('/bears')
//create a bear instance in the db using POST
.post(function (req, res){
  var bear = new Bear();
  bear.name = req.body.name;
  bear.save(function(err){
    if(err)
    res.send(err);

    res.json({message: 'Bear created!'});
  });
});

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', function(req, res) {
    res.json({ message: 'hooray! welcome to our api!' });
});

// more routes for our API will happen here

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);

var express = require('express');
var mysql    = require('mysql');
var app         = express();
var http     = require('http');
var md5 = require('MD5');
var cors = require('cors');
var bodyParser  = require('body-parser');
var apiToken        = require('api-token');
var path = require('path');
var connection = require('./connection');

var funkcije = require('./routes/funkcije.js');

var helmet = require('helmet');
const { Console } = require('console');

//u 365 dana istice token
var apiRoutes = express.Router();
apiToken.setExpirationTime(365);
var fileUpload = require('express-fileupload');
var port = process.env.PORT || 3014; // used to create, sign, and verify tokens

//app.use(helmet())

//u 365 dana istice token
app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(fileUpload());

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


app.use(express.static('./public'));

app.get('/',function (req, res) {

    res.render('pages/home', {message:''})
});


app.all('/api/*', function(req, res, next){

    funkcije.log(true, {route:req.url, body:req.body});

    var token = (req.body && req.body.access_token) || (req.query && req.query.access_token) || req.headers['x-access-token'];
    //if(req.url === '/api/authenticate'){
    //apiToken.addUser(req.body.username);
    console.log(req.body);
    //console.log(req.query);
    //console.log(req.connection.remoteAddress);
    //console.log(req.socket.remoteAddress);
    //console.log(req.url.substring(0,40));
        
    if(req.get('token')){
        token = req.get('token');
    }
    else if (req.query.token){
        token = req.query.token;
    }else if(req.url.substring(0,15) === '/api/prijavaweb'){
        /* token is not needed when posting authentication credentials */
        next();
    //}else if(apiToken.isTokenValid(req.get('token'))){
    }else if(req.url.substring(0,18) === '/api/prijavamob'){
        /* token is not needed when posting authentication credentials */
        console.log('Mobitel pušten');
        next();
    //}else if(apiToken.isTokenValid(req.get('token'))){
    }
    //test
    else if(req.url.substring(0,5) === '/api/'){
        console.log('TESTNI API');
        next();
    }
    else if(apiToken.isTokenValid(token)){
        /* continue if token is valid */
        next();
    }else{
        /* send 401 if not authenticating or token is invalid */
        //res.send(401);
        //res.send("Authenticate");
        res.json({ success: false, message: 'Authentication failed. Invalid token. Login again!' });
    }
});

app.use('/', require('./routes'));

/*
app.use('/', function (req, res, next) {
    if (1) {
          console.log('Time: %d', Date.now());
          console.log(' ');
          next();

    }else{
             res.json({ success: false, message: 'nemate pristup stranici' });
             res.send(401);
        }

},
require('./routes'));
*/

//app.use(express.static(__dirname + '/../ngClient'));

app.use('/api', apiRoutes);

//app.use('/datoteke', apiRoutes);

app.get('/', function(req, res){
    res.json({ message: 'Regulator API'});
});



/* app.get('*', function(req, res) {
    res.sendFile(__dirname + '/../ngClient/index.html');
}); */

connection.init();

app.listen(port);
console.log('Magic happens at http://localhost:' + port);

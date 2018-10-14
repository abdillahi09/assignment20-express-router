/* -------- CREATING EXPRESS SERVER ENGINE AND DEPENDENCIES --------- */
var express = require('express');
var bodyParser = require('body-parser');
var multer = require('multer');
var upload = multer();
var app = express();

/* Setting up the templating machine - PUG*/

app.set('view engine', 'pug');
app.set('views', './views');

/* connecting to MongoDB*/

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/my_db');

// for parsing application/json
app.use(bodyParser.json()); 

// for parsing application/xwww-
app.use(bodyParser.urlencoded({useNewUrlParser: true})); 
//form-urlencoded

// for parsing multipart/form-data
app.use(upload.array()); 
app.use(express.static('public'));

// /* Serving Static Files */
app.use(upload.array()); /* for parsing mutlipart/Form data */
app.use(express.static('public'));
app.use('/static', express.static('public'));


/* ------ ASSIGNMENT SOLUTION - USING MULTIPLE PUG FILES WITH THE EXPRESS.ROUTER() ----- */

var schemas = require('./schema');

app.use('/schema', schemas)

/* Middleware*/

app.get('/middleware', (req, res) => {
    console.log("A request for the page has been received");
})

app.get('/pages', (req, res) => {
    res.send('My Page');
});

/* Running the form code. */

app.get('/form', function(req, res){
   res.render('form');
});

// app.put('/house', (req, res) => {
//    console.log(req.body);
//    res.send("recieved your request!");
// });

// /* Loads static file image to browser localhost:3000/home */
app.get('/home', (req, res) => {
    res.render('index');
});

// /* Getting simple file view */ 

app.get('/first_template', (req, res) => {
    res.render('first_view');
});

// /* Passing values to Pug HTML file through Interpolation */ 

app.get('/dynamic_view', (req, res) => {
    res.render('dynamic', {
        name: "Tutorialspoint",
        url:"http://www.tutorialspoint.com"
    });
});

// /* Using conditional in Pug HTML file and object interpolation */

app.get('/*signup', (req, res) => {
    res.render('signup', {
        user: {name: "Abdillahi Muse", age: "30"}
    });
});


/* Server is listening */
app.listen(3000);

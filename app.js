const express = require('express');
const fileUpload = require('express-fileupload');
const session = require('express-session');
const cors = require('cors');
const mongoose = require('mongoose');
const errorHandler = require('errorhandler')
const bodyParser = require('body-parser');
const mysql = require('mysql');
const path = require('path');

mongoose.promise = global.Promise;
const isProduction = process.env.NODE_ENV === 'production';

const app = express();

const {getHomePage} = require('./routes/index');
const {getClientPage, addClient} = require('./routes/clientInformation');
const {getRequestPage, addRequest} = require('./routes/requestAQuote');
const {getQuoteHistoryPage} = require('./routes/quoteHistory');
const {getClientListPage} = require('./routes/clientList');
const port = 5000;


// app.use(express.static('views'));
// create connection to database
// the mysql.createConnection function takes in a configuration object which contains host, user, password and the database name.
const db = mysql.createConnection ({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'CS3320'
});

// connect to database
db.connect((err) => {
    if(err) {
        throw err;
    }
    console.log('Connected to database');
});
global.db = db;

// configure middleware
app.set('port', process.env.port || port); // set express to use this port
app.set('views', __dirname + '/views'); // set express to look in this folder to render our view
app.set('view engine', 'ejs'); // configure template engine
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json()); // parse form data client

// routes for the app
app.get('/', getHomePage);
app.get('/clientInformation.ejs', getClientPage);
app.post('/clientInformation.ejs', addClient);
app.get('/requestAQuote.ejs', getRequestPage);
app.post('/requestAQuote.ejs', addRequest);
app.get('/quoteHistory.ejs', getQuoteHistoryPage);
app.get('/clientList.ejs', getClientListPage);
// set the app to listen on the port
app.listen(port, () => {
    console.log(`Server running on port: ${port}`);
});
app.use(cors());
app.use(require('morgan')('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({ secret: 'passport-tutorial', cookie: { maxAge: 60000 }, resave: false, saveUninitialized: false }));

if(!isProduction) {
	app.use(errorHandler());
}
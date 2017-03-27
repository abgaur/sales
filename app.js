const express =  require('express');
const path = require("path");
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const mongoose = require('mongoose');
const config = require('./config/database');




// Connect to Database
mongoose.connect(config.database);

// On Connection
mongoose.connection.on('connected', () => {
    console.log('Connected to DB ' + config.database);
});

mongoose.connection.on('error', (err) => {
    console.log('Database Error ' + err);
});

const app = express();

// setting up cross origin
// app.use(function(req, res, next) { //allow cross origin requests
//     res.setHeader("Access-Control-Allow-Methods", "POST, PUT, OPTIONS, DELETE, GET");
//     res.header("Access-Control-Allow-Origin", "http://localhost:4200");
//     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//     res.header("Access-Control-Allow-Credentials", true);
//     next();
// });


const users = require('./routes/users');
const clients = require('./routes/clients');
const uploadtest = require('./routes/uploadtest');

const port = 3000;

// cors Middleware
app.use(cors());

// SEt Static folder
app.use(express.static(path.join(__dirname, 'public')));

// Body Parser Middleware
app.use(bodyParser.json());

// Passport Middleware
app.use(passport.initialize());
app.use(passport.session());

require('./config/passport')(passport);

app.use('/users', users);
app.use('/clients', clients);
app.use('/uploadtest', uploadtest);



// Index Route
app.get('/', (req, res) => {
    res.send('Invalid endpoint');
});

app.get('*', (req,res) => {
    res.sendFile(path.join(__dirname, 'public/index.html'));
});

app.listen(port, () => {
    console.log('server started on port '+ port);
});

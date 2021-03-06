const express =  require('express');
const path = require("path");
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const mongoose = require('mongoose');
const config = require('./config/database');


// Connect to Database
mongoose.Promise = global.Promise;// To remove Deprecation Warning
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
const comments = require('./routes/comments');
const stages = require('./routes/stages');
const teamdata = require('./routes/teamdata');
const userdata = require('./routes/userdata');

const port = process.env.PORT || 3000;

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
app.use('/comments', comments);
app.use('/stages', stages);
app.use('/teamdata', teamdata);
app.use('/userdata', userdata);



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

const express = require('express')
const passport = require('passport')
const path = require('path')
const config = require('./config/database')
const bodyparser = require('body-parser')
const Sequelize = require('sequelize')

const port = 3000;
const sql = new Sequelize('mysql://root@localhost:3306/tinderforjobs');
// connect to the database.
sql.authenticate()
.then(()=>{
    console.log("connected to the mysql database boiz");
})
.catch(err=>{
    console.log("error connection to db", err);
})
const app = express()
//app.use(...) ...
//set static folder
app.use(express.static(path.join(__dirname, 'public')));

// Body Parser middleware
app.use(bodyparser.json());
// passport middleware -- used for authentication in Node.js
app.use(passport.initialize());
app.use(passport.session());

app.get('/', (req, res) => {
    res.send('welcome to the hood');
});
app.listen(port, ()=>{
    console.log("Running on port: " +port);
});
const User = require('./models/user');

var models = require('./models');
models.sequelize.sync().then(function(){
    console.log("database synced");
}).catch(function(err){
    console.log("oops");
});

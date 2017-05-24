const express = require('express')
const passport = require('passport')
const path = require('path')
const config = require('./config/database')
const bodyparser = require('body-parser')
const Sequelize = require('sequelize')
const cors = require('cors');

const port = 3000;
// connect to the database.
// sql.authenticate()
// .then(()=>{
//     console.log("connected to the mysql database boiz");
// })
// .catch(err=>{
//     console.log("error connection to db", err);
// })
const app = express()
//app.use(...) ...
//set static folder
app.use(express.static(path.join(__dirname, 'public')));

app.use(cors());

// Body Parser middleware
app.use(bodyparser.json());
// passport middleware -- used for authentication in Node.js
app.use(passport.initialize());
app.use(passport.session());
require('./config/passport')(passport);
// users route
const users_route = require('./routes/users');
app.use('/users', users_route);

app.get('/', (req, res) => {
    res.send('welcome to the hood');
});
app.listen(port, ()=>{
    console.log("Running on port: " +port);
});

var models = require('./models');
models.sequelize.sync({force:true}).then(function(){
    console.log("database synced");
}).catch(function(err){
    console.log("oops");
});

const models = require('../models')
const express = require('express')
const router = express.Router();
const jwt = require('jsonwebtoken');
const config = require('../config/database');
const util = require('util');
const passport = require('passport');
//create user
router.post('/create', (req, res, next)=>{
    var newuser = {
        username: req.body.username,
        password: req.body.password,
        isEmployer: req.body.isEmployer
    };
    models.user.create({
        username: req.body.username,
        password: req.body.password,
        isEmployer: req.body.isEmployer
    }).then((user)=>{
        res.json({
            success:true,
            msg: "user created successfully!"
        });
    }).catch(error =>{
        res.json({
            success:false,
            msg:"failed to create user"+ error
        });
    });
});
// find by username.
router.get('/find/:usr', (req, res, next) =>{
    var username = req.params.usr;``
    models.user.findById(username)
        .then(user=>{
            res.json(user);
        });

});

// authenticate user.
// returns an authenticaion token as well as the user's username and hashed password.
// if successfull.
router.post('/auth', (req, res, next) => {
    const username = req.body.username;
    const password = req.body.password;
    console.log(username);
    models.user.findById(username)
        .then(user => {
            // authenticate
            if(user != null){
                if(user.validatePassword(password)){
                    // grab the relevant data from the model.
                    var u = {
                        username: user.username,
                        password: user.password,
                        isEmployer: user.isEmployer,
                    };
                    const token = jwt.sign(u,config.secret, {expiresIn: 604800});
                    res.json({
                        success:true,
                        token: 'JWT ' + token,
                        user: u
                    });
                }else{
                    res.json({
                        success:false,
                        msg: "incorrect password"
                    });
                }
            }else{
                res.json({
                    success:false,
                    msg:"user does not exist"
                })
            }

        })
        .catch(err => {
            // throw error message.
            res.json({
                success:false,
                msg: "invalid login" + err
            });
        });
});

router.get('/profile', passport.authenticate('jwt',{session:false}), (req, res, next) => {
    res.json({user: req.user});
});

// adds an interest to the authenticated user.
router.post('/add_interest', passport.authenticate('jwt', {session:false}), (req, res, next)=>{
    const user = req.user;
    const interest = req.body.interest;
    const im = models.interest;
    let interest_id;
    // find the interest in the interests table, if it does not exist create it.
    im.findOrCreate({where: {name : interest}})
    .spread((interest, created)=>{
        //interest_id = interest[0].id;
        user.addInterest(interest);
        res.json(({user: user}));
    });
});

module.exports = router;

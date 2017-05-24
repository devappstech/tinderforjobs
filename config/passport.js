const config = require('../config/database')
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const models = require('../models')
const User = models.user;
module.exports = function(passport){
    let opts = {};
    opts.jwtFromRequest = ExtractJwt.fromAuthHeader();
    opts.secretOrKey = config.secret;
    passport.use(new JwtStrategy(opts, (jwt_payload, done) =>{
        User.findById(jwt_payload.username)
            .then(user=>{
                if(user){
                    return done(null, user);
                }else{
                    return done(null, false);
                }
            })
            .catch(err =>{
                return done(err, false);
            });
    }));;
}

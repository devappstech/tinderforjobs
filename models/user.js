const bcrypt = require('bcryptjs');
const Sequelize = require('sequelize');
const User = (sequelize, Sequelize) =>{
    var usr = sequelize.define('user',{
        username: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true,
            primaryKey: true,
            get(){
                return this.getDataValue('username');
            }
        },
        password:{
            type: Sequelize.STRING,
            allowNull: false,
            get(){
                return this.getDataValue('password');
            },
            set(password){
                // set the password after hashing + salting it
                this.setDataValue('password', bcrypt.hashSync(password, bcrypt.genSaltSync(10),null));
            }
        },
        isEmployer:{
            type:Sequelize.BOOLEAN,
            allowNull: false,
            get(){
                return this.getDataValue('isEmployer');
            }
        },
        location:{
            type:Sequelize.GEOMETRY('POINT'),
            get(){
                return this.getDataValue('location');
            }
        },
    },{
        instanceMethods: {
            validatePassword: function(password){
                return bcrypt.compareSync(password, this.password);
            },
        }
    },{
        classMethods:{
            associate: function(models){
                user.hasMany(models.interest);
            }
        }
    });
    return usr;
}
module.exports = User;

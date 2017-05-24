const Sequelize = require('sequelize');
const Interest = (sequelize, Sequelize) =>{
    var interest = sequelize.define('interest', {
        id:{
            type: Sequelize.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        name:{
            type: Sequelize.STRING,
            allowNull: false
        }
    },{
        classMethods:{
            associate: function(model){
                interest.belongsTo(model.user);
            }
        }
    });
    return interest;
}
module.exports = Interest;

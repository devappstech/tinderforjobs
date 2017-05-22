module.exports = (sequelize, Sequelize) =>{
    const User = sequelize.define('User',{
        username: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true,
            primaryKey: true
        },
        password:{
            type: Sequelize.STRING,
            allowNull: false
        },
        isEmployer:{
            type:Sequelize.BOOLEAN
        }
    });
    return User;
}

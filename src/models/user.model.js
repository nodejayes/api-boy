const {Model} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class User extends Model { }
    User.init({
        name: DataTypes.STRING,
        email: DataTypes.STRING,
        password: DataTypes.STRING,
    }, { sequelize });
    return User;
};

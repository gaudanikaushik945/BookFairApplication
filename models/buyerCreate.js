const { Sequelize, DataTypes } = require("sequelize")
const db = require("./db")
const { toDefaultValue } = require("sequelize/lib/utils")




module.exports = (sequelize, DataTypes) => {
    const Buyer = sequelize.define("buyers", {
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            // unique: true
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            len: {
                args: [8, 20],
                msg: "the password should be between 8 and 20 charter"
            }
        },
       

    })
    return Buyer
}
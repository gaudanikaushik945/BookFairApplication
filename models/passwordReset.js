const { DataTypes } = require("sequelize")
const db = require("./db")

module.exports = (sequelize, DataTypes) => {
   const resetPassword = sequelize.define("resetPass", {
    user_id:{
        type: DataTypes.STRING,
        allowNull: true,
        ref: "buyerCreate"
    },
    token: {
        type: DataTypes.STRING,
        allowNull: true
    }
   })
   return resetPassword
}
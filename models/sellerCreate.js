const { Sequelize, DataTypes } = require("sequelize")
const db = require("./db")





module.exports = (sequelize, DataTypes) => {
    const Seller = sequelize.define("sellers", {
        // id: {
        //     type: DataTypes.INTEGER,
        //     autoIncrement: true,
        //     primaryKey: true,
        //     foreignKey: true
        // },
        name: { 
            type: DataTypes.STRING,
            allowNull: false
        }, 
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            
        },
        password: {
            type: DataTypes.STRING, 
            allowNull: false,

            len: {
                args: [8, 20],
                msg: "the password should be between 8 and 20 charter"
            }
        } 
    })
    return Seller
}
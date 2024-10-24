const { Sequelize, DataTypes } = require("sequelize");
const db = require("./db")
// const { orderStatus } = require("../Controllers/orderController")
const { toDefaultValue } = require("sequelize/lib/utils")




module.exports = (sequelize,DataTypes) => {
    
    const Order = sequelize.define("orders",{
    //   id:{
    //       type: DataTypes.INTEGER,
    //       autoIncrement: true,
    //       allowNull: false,
    //       primaryKey: true
    //   },
      
        buyer_id:{
            type: DataTypes.INTEGER,
            allowNull: false
        },
        shop_id:{
           type: DataTypes.INTEGER,
           allowNull: true,
        },
        books_id: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        quantity: {
            type: DataTypes.INTEGER,
            allowNull: true,
            
        },
        order_uuid :{
            type: DataTypes.STRING,
            allowNull: false
        },
        order_status: {
            type: DataTypes.STRING,
            defaultValue: "conform",
            allowNull: false
        }
    }) 
    // const queryInterface = sequelize.getQueryInterface();
    // queryInterface.addColumn("viewOrder", 'order_uuid', { type: DataTypes.STRING });

    return Order 
}
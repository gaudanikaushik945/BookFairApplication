const { Sequelize, DataTypes } = require("sequelize");
const db = require("./db")
const { toDefaultValue } = require("sequelize/lib/utils")

module.exports = (sequelize, DataTypes) => {
  const Shops = sequelize.define("shops", {
    name: {
      type: DataTypes.STRING,
      allowNull: true
    },
    seller_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: null
    }
  })
  return Shops 
}   
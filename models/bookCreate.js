const { Sequelize, DataTypes } = require("sequelize");
const db = require("./db")
const { FOREIGNKEYS } = require("sequelize/lib/query-types")

module.exports = (sequelize, DataTypes) => {
  const Book = sequelize.define("books", {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    stock_count: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    bookimage: {
      type: DataTypes.STRING,
      allowNull: true
    },
    shop_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      // defaultValue: null
    }
  })
  return Book
}


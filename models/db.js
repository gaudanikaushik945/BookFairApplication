const { Sequelize, DataTypes } = require("sequelize");
// const config = require("config")
const { FOREIGNKEYS } = require("sequelize/lib/query-types");
const env = require("dotenv")
env.config()

const sequelize = new Sequelize({
    dialect: process.env.DB_DIALECT,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    logging: false
})


sequelize.authenticate().then(() => {
    console.log("connection embist successfully");
}).catch((error) => {
    console.log("error", error)
})

const db = {}
db.Sequelize = Sequelize
db.sequelize = sequelize


db.books = require('../model/bookCreate')(sequelize, DataTypes);
db.buyers = require('../model/buyerCreate')(sequelize, DataTypes);
db.sellers = require('../model/sellerCreate')(sequelize, DataTypes);
db.shops = require('../model/shopCreate')(sequelize, DataTypes);
db.orders = require('../model/viewOrder')(sequelize, DataTypes);
db.resetPassword = require("../model/passwordReset")(sequelize, DataTypes)

db.sellers.hasMany(db.shops, { foreignKey: 'seller_id' })
db.shops.belongsTo(db.sellers, { foreignKey: 'seller_id' })

db.shops.hasMany(db.books, { foreignKey: 'shop_id' })
db.books.belongsTo(db.shops, { foreignKey: 'shop_id' })

db.shops.hasMany(db.orders, { foreignKey: 'shop_id' })
db.orders.belongsTo(db.shops, { foreignKey: 'shop_id' })

db.books.hasMany(db.orders, { foreignKey: 'books_id' })
db.orders.belongsTo(db.books, { foreignKey: 'books_id' })

db.buyers.hasMany(db.orders, { foreignKey: 'buyer_id' })
db.orders.belongsTo(db.buyers, { foreignKey: 'buyer_id' })

db.buyers.hasMany(db.resetPassword, {foreignKey: 'user_id'})
db.resetPassword.belongsTo(db.buyers, {foreignKey: 'user_id'})

db.sequelize.sync({ force: false }).then(() => {
    console.log("Database synced successfully")
}).catch((error) => {
    console.error("Error syncing database:", error)
});

// console.log("++++++++ db ++++++++++++", db)

module.exports = db


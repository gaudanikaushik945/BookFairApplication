const { Sequelize, DataTypes } = require("sequelize");
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




db.courses = require("./course.model")(sequelize, DataTypes)
db.students = require("./student.moel")(sequelize, DataTypes)
db.teachers = require("./teacher.model")(sequelize, DataTypes)
db.users = require("./user.model")(sequelize, DataTypes)

db.teachers.hasMany(db.students,{foreignKey : "teacherId"})
db.students.belongsTo(db.teachers, {foreignKey : "teacherId"})
db.courses.hasMany(db.students,{foreignKey: "courseId"})
db.students.belongsTo(db.courses,{foreignKey: "courseId"})

db.sequelize.sync({ force: false }).then(() => {
    console.log("Database synced successfully")
}).catch((error) => {
    console.error("Error syncing database:", error)
});


module.exports = db 

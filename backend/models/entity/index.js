const dotenv=require('dotenv')
dotenv.config()

const { Sequelize, DataTypes } = require("sequelize");
console.log('connection successful !!!')
const sql = require("mysql2/promise")
console.log(process.env.USER)

sql.
    createConnection({ user: process.env.USER, password: process.env.PASSWORD })
    .then(()=>
    {
        console.log("db CONNECTED successfully")
    })

const sequelize= new Sequelize(
    process.env.DATABASE,
    process.env.USER,
    process.env.PASSWORD,{
        host:process.env.HOSTDB,
        dialect:process.env.DIALECT,

    }
) 

const db={}
db.sequelize=sequelize
db.USER=require('../entity/users/user_table')(sequelize,DataTypes)
db.SKILL=require('../entity/skill/skill_table')(sequelize,DataTypes)



db.sequelize.sync({ force: false }, () => {
    console.log("Sync done");
  });
  module.exports = db;
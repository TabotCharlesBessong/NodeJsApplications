const { Sequelize, DataTypes } = require("sequelize");
const dbConfig = require("../config/dbConfig");
// const { noBoolOperatorAliases } = require("sequelize/lib/utils/deprecations")

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorAliases: false,
  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle,
  },
});

sequelize
  .authenticate()
  .then(() => {
    console.log("Connection successful");
  })
  .catch((err) => console.log(err));

const db = {}

db.Sequelize = Sequelize
db.sequelize = sequelize

db.products = require("./productModel")(sequelize,DataTypes)
db.reviews = require("./reviewModel")(sequelize,DataTypes)

db.sequelize.sync({force:false}).then(() => console.log("Yes resync done!")).catch(err => console.log(err))

module.exports = db

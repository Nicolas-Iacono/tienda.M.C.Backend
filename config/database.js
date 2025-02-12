const { Sequelize } = require('sequelize');
const dotenv = require("dotenv");
dotenv.config({
    path: process.env.NODE_ENV === "production" ? ".env.production" : ".env.development",
  });

console.log("Conectando a la base de datos en:", process.env.PGHOST);
const sequelize = new Sequelize(
    process.env.PGDATABASE,
    process.env.PGUSER,
    process.env.PGPASSWORD,
    {
    host: process.env.PGHOST,
    port: process.env.PGPORT || 5432,
    dialect: 'postgres',
    define:{
        timestamps: false
    },
    dialectOptions: {
        ssl: false
    },
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    },
    logging: console.log
    });
    

module.exports = sequelize;

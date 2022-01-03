const Sequelize = require('sequelize');
const dotenv = require('dotenv');
dotenv.config();

// Override timezone formatting for MSSQL
Sequelize.DATE.prototype._stringify = function _stringify(date, options) {
  return this._applyTimezone(date, options).format("YYYY-MM-DD HH:mm:ss.SSS");
};
const sequelize =  new Sequelize(process.env.DB_DATABASE, process.env.DB_USERNAME, process.env.DB_PASSWORD, {
    logging: process.env.DB_LOGGIN === "true",
    host: process.env.DB_HOST,
    dialect: 'mssql',
    
    dialectOptions: {
      options: {
        encrypt: process.env.DB_ENCRYPT === "true",
        useUTC: false,
        dateFirst: 1,
      }
    }
  });

module.exports =  sequelize;

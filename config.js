const Sequelize = require('sequelize');
//const Student = require('./models/Students');
//const __dirname = "./modules/models/"

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
  
  // fs.readdirSync(__dirname)
  // .filter((file) => {
  //   return (
  //     file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.js'
  //   )
  // })
  // .forEach((file) => {
  //   const model = require(path.join(__dirname, file))(
  //     sequelize,
  //     Sequelize.DataTypes
  //   )
  //   db[model.name] = model
  // })

module.exports =  {
    db:{
        sequelizeConn: sequelize,
    },
  }

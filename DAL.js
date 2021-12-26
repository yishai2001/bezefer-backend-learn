//const path = require("path");
//const fs = require('fs');
//const sequelize = require('sequelize');
const config = require('./config');
//const Classes = require('./models/Classes');
//const Students = require('./models/Studens');
const db = config.db.sequelizeConn;
//const __dirname = "./models/"
const models = require('./models/index')

console.log("hi")
console.log(models.Students)

db.authenticate().then(() => {
  console.log('Connection established successfully.');
  }).catch(err => {
  console.error('Unable to connect to the database:', err);
  db.close();
});

Object.keys(db.models).forEach(function(modelName) {
  if ("associate" in db.models[modelName]) {
    db.models[modelName].associate();
  }
});

db.sync();

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

module.exports = {db,
   // Add all DB functionality
}

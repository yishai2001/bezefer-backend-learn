const sequelize = require('sequelize');
const config = require('./config');
const ClassModel = require('./modules/routes/models/ClassModel');
const StudentModel = require('./modules/routes/models/StudentModel');
const db = config.db.sequelizeConn;
const __dirname = "./modules/models/"

db.authenticate().then(() => {
  console.log('Connection established successfully.');
  }).catch(err => {
  console.error('Unable to connect to the database:', err);
  db.close();
});

Object.keys(db.models).forEach(function(modelName) {
  if ("associate" in db.models[ClassModel]) {
    db.models[StudentModel].associate();
  }
});

db.sync();

fs.readdirSync(__dirname)
.filter((file) => {
  return (
    file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.js'
  )
})
.forEach((file) => {
  const model = require(path.join(__dirname, file))(
    sequelize,
    Sequelize.DataTypes
  )
  db[model.name] = model
})

module.exports = {db,
   // Add all DB functionality
}

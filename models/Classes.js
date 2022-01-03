
const  Sequelize = require('sequelize');
const db = require('../config');
//const db = config.db.sequelizeConn;

const Classes = db.define('Class', {
  classId: {
    type: Sequelize.UUID ,
    allowNull: false,
    primaryKey: true,
    validate: {
      notNull: { msg: 'Class must have an id' },
      notEmpty: { msg: 'Id must not be empty' },
    },
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notNull: { msg: 'Class must have a name' },
      notEmpty: { msg: 'Name must not be empty' },
    },
  },
  maxSeats: {
    type: Sequelize.INTEGER ,
    allowNull: false,
    validate: {
      notNull: { msg: 'Class must have max seats' },
      notEmpty: { msg: 'Max seats must not be empty' },
    },
  },
  currentCapacity: {
    type: Sequelize.INTEGER ,
    allowNull: false
  },
},
);
module.exports = Classes;
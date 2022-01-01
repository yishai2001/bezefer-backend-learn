const  Sequelize = require('sequelize');
const db = require('../config');

const Students = db.define('Student', {
  id: {
    type: Sequelize.STRING ,
    primaryKey: true,
  },
  firstName: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notNull: { msg: 'User must have a name' },
      notEmpty: { msg: 'Name must not be empty' },
    },
  },
  lastName: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notNull: { msg: 'User must have a name' },
      notEmpty: { msg: 'Name must not be empty' },
    },
  },
  age: {
    type: Sequelize.INTEGER ,
    allowNull: true
  },
  classId: {
    type: Sequelize.INTEGER ,
    allowNull: true
  },
  profession: {
    type: Sequelize.STRING ,
    allowNull: false
  },
  image: {
    type: Sequelize.STRING ,
    allowNull: true
  },
},
);
module.exports = Students;
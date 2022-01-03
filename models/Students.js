const  Sequelize = require('sequelize');
const db = require('../config');

const Students = db.define('Student', {
  id: {
    type: Sequelize.STRING ,
    primaryKey: true,
    allowNull: false,
    validate: {
      notNull: { msg: 'Student must have an id' },
      notEmpty: { msg: 'Id Name must not be empty' },
    },
  },
  firstName: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notNull: { msg: 'Student must have a first name' },
      notEmpty: { msg: 'First Name must not be empty' },
    },
  },
  lastName: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notNull: { msg: 'Student must have a last name' },
      notEmpty: { msg: 'Last name must not be empty' },
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
    allowNull: false,
    validate: {
      notNull: { msg: 'Student must have a profession' },
      notEmpty: { msg: 'Profession must not be empty' },
    },
  },
  image: {
    type: Sequelize.STRING ,
    allowNull: true
  },
},
);
module.exports = Students;
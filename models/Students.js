// const { Model } = require('sequelize')
// module.exports = (sequelize, DataTypes) => {
//   class Student extends Model {

//     // static associate({ Classes }) {
//     //     this.belongsTo(Classes, { foreignKey: 'classId', as: 'class' })
//     // } 

//     // toJSON() {
//     //   return { ...this.get(), id: undefined }
//     // }
//   }
//   Student.init(
//     {
//       id: {
//         type: DataTypes.UUID ,
//         primaryKey: true,
//       },
//       firstName: {
//         type: DataTypes.STRING,
//         allowNull: false,
//         validate: {
//           notNull: { msg: 'User must have a name' },
//           notEmpty: { msg: 'Name must not be empty' },
//         },
//       },
//       lastName: {
//         type: DataTypes.STRING,
//         allowNull: false,
//         validate: {
//           notNull: { msg: 'User must have a name' },
//           notEmpty: { msg: 'Name must not be empty' },
//         },
//       },
//       age: {
//         type: DataTypes.INTEGER ,
//         allowNull: true
//       },
//       classId: {
//         type: DataTypes.INTEGER ,
//         allowNull: true
//       },
//       profession: {
//         type: DataTypes.STRING ,
//         allowNull: false
//       },
//       image: {
//         type: DataTypes.STRING ,
//         allowNull: true
//       },
//     },
//     {
//       sequelize,
//       tableName: 'Students',
//       modelName: 'Student',
//       createdAt: 'date_created',
//       updatedAt: 'date_updated',
//     }
//   );
//   return Student
// };

// const { Sequelize, DataTypes } = require('sequelize');
// const config = require('../config');
// const db = config.db.sequelizeConn;


// module.exports = (db, DataTypes) => {
//   const Student = db.define("Student", {
//     id: {
//       type: DataTypes.UUID ,
//       primaryKey: true,
//     },
//     firstName: {
//       type: DataTypes.STRING,
//       allowNull: false,
//       validate: {
//         notNull: { msg: 'User must have a name' },
//         notEmpty: { msg: 'Name must not be empty' },
//       },
//     },
//     lastName: {
//       type: DataTypes.STRING,
//       allowNull: false,
//       validate: {
//         notNull: { msg: 'User must have a name' },
//         notEmpty: { msg: 'Name must not be empty' },
//       },
//     },
//     age: {
//       type: DataTypes.INTEGER ,
//       allowNull: true
//     },
//     classId: {
//       type: DataTypes.INTEGER ,
//       allowNull: true
//     },
//     profession: {
//       type: DataTypes.STRING ,
//       allowNull: false
//     },
//     image: {
//       type: DataTypes.STRING ,
//       allowNull: true
//     },
//   },
//   {
//     // db,
//     // tableName: 'Students',
//     // modelName: 'Student',
//     // createdAt: 'date_created',
//     // updatedAt: 'date_updated',
  
//   });

//    return Student;
// };

const  Sequelize = require('sequelize');
const db = require('../config');
//const db = config.db.sequelizeConn;

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
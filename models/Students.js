const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Student extends Model {

    // static associate({ Classes }) {
    //     this.belongsTo(Classes, { foreignKey: 'classId', as: 'class' })
    // } 

    // toJSON() {
    //   return { ...this.get(), id: undefined }
    // }
  }
  Student.init(
    {
      id: {
        type: DataTypes.UUID ,
        primaryKey: true,
      },
      firstName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: 'User must have a name' },
          notEmpty: { msg: 'Name must not be empty' },
        },
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: 'User must have a name' },
          notEmpty: { msg: 'Name must not be empty' },
        },
      },
      age: {
        type: DataTypes.INTEGER ,
        allowNull: true
      },
      classId: {
        type: DataTypes.INTEGER ,
        allowNull: true
      },
      profession: {
        type: DataTypes.STRING ,
        allowNull: false
      },
      image: {
        type: DataTypes.STRING ,
        allowNull: true
      },
    },
    {
      sequelize,
      tableName: 'Students',
      modelName: 'Student',
      createdAt: 'date_created',
      updatedAt: 'date_updated',
    }
  );
  return Student
};

// module.exports = (sequelize, DataTypes) => {
//   const Student = sequelize.define("Student", {
//     firstName: {
//       type: DataTypes.STRING,
//       allowNull: false,
//       validate: {
//         notEmpty: true,
//       },
//     },
//     lastName: {
//       type: DataTypes.STRING,
//       allowNull: false,
//       validate: {
//         notEmpty: true,
//       },
//     },
//     age: {
//       type: DataTypes.INTEGER,
//       allowNull: true,
//     },
//     classId: {
//       type: DataTypes.INTEGER,
//       allowNull: true,
//     },
//     lastName: {
//       type: DataTypes.STRING,
//       allowNull: false,
//       validate: {
//         notEmpty: true,
//       },
//     },
//   });

//   return Student;
// };
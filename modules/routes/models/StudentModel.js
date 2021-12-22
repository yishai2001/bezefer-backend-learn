const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Student extends Model {

    static associate({ ClassModel }) {
        this.belongsTo(ClassModel, { foreignKey: 'classId', as: 'class' })
    } 

    toJSON() {
      return { ...this.get(), id: undefined }
    }
  }
  Student.init(
    {
      id: {
        type: DataTypes.UUID,
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
      createdAt: {
        type: DataTypes.DATE ,
        allowNull: false
      },
      updatedAt: {
        type: DataTypes.INTEGER ,
        allowNull: false
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
    }
  )
  return Student
}
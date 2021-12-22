const { Model } = require('sequelize')
//const StudentModel = require('./StudentModel')
module.exports = (sequelize, DataTypes) => {
  class Class extends Model { 

    static associate({ StudentModel }) {
        this.hasMany(StudentModel, { foreignKey: 'classId', as: 'student' })
    }       

    toJSON() {
      return { ...this.get(), id: undefined }
    }
  }
  Class.init(
    {
      classId: {
        type: DataTypes.INTEGER,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      maxSeats: {
        type: DataTypes.INTEGER ,
        allowNull: false
      },
      createdAt: {
        type: DataTypes.DATE ,
        allowNull: false
      },
      updatedAt: {
        type: DataTypes.DATE ,
        allowNull: false
      },
      image: {
        type: DataTypes.STRING ,
        allowNull: true
      },
      currentCapacity: {
        type: DataTypes.INTEGER ,
        allowNull: false
      },
    },
    {
      sequelize,
      tableName: 'Students',
      modelName: 'Student',
    }
  )
  return Class
}
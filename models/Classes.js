const { Model } = require('sequelize')
//const StudentModel = require('./StudentModel')
module.exports = (sequelize, DataTypes) => {
  class Class extends Model { 

    // static associate({ Students }) {
    //     this.hasMany(Students, { foreignKey: 'classId', as: 'student' })
    // }       

    // toJSON() {
    //   return { ...this.get(), id: undefined }
    // }
  }
  Class.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      maxSeats: {
        type: DataTypes.INTEGER ,
        allowNull: false
      },
      currentCapacity: {
        type: DataTypes.INTEGER ,
        allowNull: false
      },
    },
    {
      sequelize,
      tableName: 'Classes',
      modelName: 'Class',
      createdAt: 'date_created',
      updatedAt: 'date_updated',
    }
  )
  return Class
}
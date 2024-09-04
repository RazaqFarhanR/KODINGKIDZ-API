'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class student extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  student.init({
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
    },
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    no_tlp: DataTypes.INTEGER,
    imageId: DataTypes.STRING,
    imageUrl: DataTypes.STRING,
    dateOfBirth: DataTypes.STRING,
    gender: DataTypes.ENUM('MALE', 'FEMALE'),
    domicile: DataTypes.STRING,
    password: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'student',
    tableName: 'student'
  });
  return student;
};
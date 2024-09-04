'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class course extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  course.init({
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
    },
    title: DataTypes.STRING,
    description: DataTypes.TEXT,
    price: DataTypes.INTEGER,
    imageId: DataTypes.STRING,
    imageUrl: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'course',
    tableName: 'course'
  });
  return course;
};
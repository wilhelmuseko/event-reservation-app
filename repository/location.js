const { Sequelize, DataTypes } = require('sequelize');
const db = require('../config/postgres');

const location = db.define(
  'location',
  {
    id: {
      type: DataTypes.UUIDV4,
      primaryKey: true,
      defaultValue: Sequelize.UUIDV4,
    },
    name: DataTypes.STRING,
    address: DataTypes.STRING,
  },
  {
    freezeTableName: true,
    timestamps: false,
  }
);

module.exports = location;

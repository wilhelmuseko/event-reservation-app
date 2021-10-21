const { Sequelize, DataTypes } = require('sequelize');
const db = require('../config/postgres');
const event = require('./event');

const location = db.define(
  'location',
  {
    id: {
      type: DataTypes.UUIDV4,
      primaryKey: true,
      defaultValue: Sequelize.UUIDV4,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    freezeTableName: true,
    timestamps: false,
  }
);

location.hasMany(event, {
  foreignKey: 'location_id',
});
event.belongsTo(location, {
  foreignKey: 'location_id',
});

module.exports = location;

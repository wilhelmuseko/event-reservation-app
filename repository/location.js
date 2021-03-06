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
    building_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    street_address: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    city: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    state: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    unit_no: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    postal_code: {
      type: DataTypes.STRING,
      allowNull: true,
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

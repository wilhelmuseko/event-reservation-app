const { Sequelize, DataTypes } = require('sequelize');
const db = require('../config/postgres');
const eventTicket = db.define(
  'event_ticket',
  {
    id: {
      type: DataTypes.UUIDV4,
      primaryKey: true,
      defaultValue: Sequelize.UUIDV4,
    },
    event_id: {
      type: DataTypes.UUIDV4,
      allowNull: false,
    },
    type: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    quota: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    price: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
  },
  {
    freezeTableName: true,
    timestamps: false,
  }
);

module.exports = eventTicket;

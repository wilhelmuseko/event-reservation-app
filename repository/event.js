const { Sequelize, DataTypes } = require('sequelize');
const db = require('../config/postgres');
const eventTicket = require('./event_ticket');
const event = db.define(
  'event',
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
    start_date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    end_date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    location_id: {
      type: DataTypes.UUIDV4,
      allowNull: false,
    },
  },
  {
    freezeTableName: true,
    timestamps: false,
  }
);

event.hasMany(eventTicket, {
  foreignKey: 'event_id',
});
eventTicket.belongsTo(event, {
  foreignKey: 'event_id',
});

module.exports = event;

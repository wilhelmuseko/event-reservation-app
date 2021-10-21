const { Sequelize, DataTypes } = require('sequelize');
const db = require('../config/postgres');

const ticketPurchaseDetail = db.define(
  'ticket_purchase_detail',
  {
    id: {
      type: DataTypes.UUIDV4,
      primaryKey: true,
      defaultValue: Sequelize.UUIDV4,
    },
    ticket_purchase_id: {
      type: DataTypes.UUIDV4,
      allowNull: false,
    },
    event_ticket_id: {
      type: DataTypes.UUIDV4,
      allow_null: false,
    },
    quantity: {
      type: DataTypes.INTEGER,
      allow_null: false,
    },
  },
  {
    freezeTableName: true,
    timestamps: false,
  }
);

module.exports = ticketPurchaseDetail;

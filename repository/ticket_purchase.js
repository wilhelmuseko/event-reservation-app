const { Sequelize, DataTypes } = require('sequelize');
const db = require('../config/postgres');
const ticketPurchaseDetail = require('./ticket_purchase_detail');

const ticketPurchase = db.define(
  'ticket_purchase',
  {
    id: {
      type: DataTypes.UUIDV4,
      primaryKey: true,
      defaultValue: Sequelize.UUIDV4,
    },
    customer_id: {
      type: DataTypes.UUIDV4,
      allowNull: false,
    },
    date_of_purchase: {
      type: DataTypes.DATE,
      allow_null: false,
      defaultValue: Sequelize.NOW,
    },
  },
  {
    freezeTableName: true,
    timestamps: false,
  }
);

ticketPurchase.hasMany(ticketPurchaseDetail, {
  foreignKey: 'ticket_purchase_id',
});
ticketPurchaseDetail.belongsTo(ticketPurchase, {
  foreignKey: 'ticket_purchase_id',
});

module.exports = ticketPurchase;

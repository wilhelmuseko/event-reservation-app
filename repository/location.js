const Sequelize = require('sequelize');
const db = require('../config/postgres');

const location = db.define(
  'location',
  {
    id: {
      type: Sequelize.UUIDV4,
      primaryKey: true,
    },
    name: Sequelize.STRING,
    address: Sequelize.STRING,
  },
  {
    freezeTableName: true,
    timestamps: false,
  }
);

module.exports = location;

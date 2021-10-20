const Sequelize = require('sequelize');
const db = new Sequelize('event_reservation_database', 'postgres', 'admin', {
  dialect: 'postgres',
  host: 'localhost',
});

module.exports = db;

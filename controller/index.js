const location = require('./location');
const event = require('./event');
const eventTicket = require('./event_ticket');
const transactionController = require('./transaction');
const controller = {};

controller.location = location;
controller.event = event;
controller.eventTicket = eventTicket;
controller.transaction = transactionController;

module.exports = controller;

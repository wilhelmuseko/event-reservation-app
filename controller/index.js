const location = require('./location');
const event = require('./event');
const eventTicket = require('./event_ticket');
const controller = {};

controller.location = location;
controller.event = event;
controller.eventTicket = eventTicket;

module.exports = controller;

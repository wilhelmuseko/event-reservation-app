const location = require('./location');
const event = require('./event');
const eventTicket = require('./event_ticket');
const services = {};

services.location = location;
services.event = event;
services.eventTicket = eventTicket;
module.exports = services;

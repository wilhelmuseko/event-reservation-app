const location = require('./location');
const event = require('./event');
const eventTicket = require('./event_ticket');
const transactionService = require('./transaction');
const services = {};

services.location = location;
services.event = event;
services.eventTicket = eventTicket;
services.transaction = transactionService;
module.exports = services;

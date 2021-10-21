const location = require('./location');
const event = require('./event');
const eventTicket = require('./event_ticket');
const repository = {};

repository.location = location;
repository.event = event;
repository.eventTicket = eventTicket;
module.exports = repository;

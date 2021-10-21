const location = require('./location');
const event = require('./event');
const eventTicket = require('./event_ticket');
const customer = require('./customer');
const ticketPurchase = require('./ticket_purchase');
const ticketPurchaseDetail = require('./ticket_purchase_detail');
const repository = {};

repository.location = location;
repository.event = event;
repository.eventTicket = eventTicket;
repository.customer = customer;
repository.ticketPurchase = ticketPurchase;
repository.ticketPurchaseDetail = ticketPurchaseDetail;

module.exports = repository;

const location = require('./location');
const event = require('./event');
const services = {};

services.location = location;
services.event = event;
module.exports = services;

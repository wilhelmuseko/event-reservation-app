create schema if not exists event_reservation;

create table event_reservation."event"(
	id uuid primary key,
	"name" text not null unique,
	start_date timestamp not null,
	end_date timestamp not null
);

create table event_reservation."location"(
	id uuid primary key,
	"name" text not null,
	address text not null
);

create table event_reservation.event_location(
	id uuid primary key,
	event_id uuid not null unique references event_reservation."event",
	location_id uuid not null references event_reservation."location"
);

create table event_reservation.ticket_type(
	id uuid primary key,
	"type" text not null unique,
	quota int4 not null,
	price int8 not null
);

create table event_reservation.event_ticket_type(
	id uuid primary key,
	event_id uuid unique references event_reservation."event",
	ticket_type_id uuid unique references event_reservation."ticket_type"
);

create table event_reservation.customer(
	id uuid primary key,
	"name" text not null,
	date_of_birth date not null,
	phone_number text not null unique
);

create table event_reservation.ticket_purchase(
	id uuid primary key,
	customer_id uuid not null references event_reservation.customer,
	date_of_purchase timestamp
);

create table event_reservation.ticket_purchase_detail(
	id uuid primary key,
	ticket_purchase_id uuid not null references event_reservation.ticket_purchase,
	event_ticket_type_id uuid not null references event_reservation.event_ticket_type,
	quantity int4
);





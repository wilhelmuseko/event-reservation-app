drop database if exists event_reservation_database;
create database event_reservation_database;
\c event_reservation_database;

create table "event"(
	id uuid primary key,
	"name" text not null unique,
	start_date timestamp not null,
	end_date timestamp not null
);

create table "location"(
	id uuid primary key,
	"name" text not null,
	address text not null
);

create table event_location(
	id uuid primary key,
	event_id uuid not null unique references "event",
	location_id uuid not null references "location"
);

create table ticket_type(
	id uuid primary key,
	"type" text not null unique,
	quota int4 not null,
	price int8 not null
);

create table event_ticket_type(
	id uuid primary key,
	event_id uuid unique references "event",
	ticket_type_id uuid unique references "ticket_type"
);

create table customer(
	id uuid primary key,
	"name" text not null,
	date_of_birth date not null,
	phone_number text not null unique
);

create table ticket_purchase(
	id uuid primary key,
	customer_id uuid not null references customer,
	date_of_purchase timestamp
);

create table ticket_purchase_detail(
	id uuid primary key,
	ticket_purchase_id uuid not null references ticket_purchase,
	event_ticket_type_id uuid not null references event_ticket_type,
	quantity int4
);

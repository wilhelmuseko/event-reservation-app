drop database if exists event_reservation_database;
create database event_reservation_database;
\c event_reservation_database;
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

create table "location"(
	id uuid primary key default uuid_generate_v4(),
	building_name text not null,
	street_address text not NULL,
	city text NOT null,
	state text NOT NULL,
	unit_no text NULL,
	postal_code text null
);

create table "event"(
	id uuid primary key default uuid_generate_v4(),
	"name" text not null,
	start_date timestamp not null,
	end_date timestamp not NULL,
	description text NULL,
	location_id uuid NOT NULL REFERENCES "location"
);

create table event_ticket(
	id uuid primary key default uuid_generate_v4(),
	event_id uuid NOT null references "event",
	"type" text not null unique,
	quota int4 not null,
	price int8 not NULL,
	unique(event_id, "type")
);

create table customer(
	id uuid primary key default uuid_generate_v4(),
	first_name text not null,
	last_name text 	null,
	date_of_birth date not null,
	phone_number text not null UNIQUE,
	street_address text not NULL,
	city text NOT null,
	state text NOT NULL,
	unit_no text NULL,
	postal_code text null
);

create table ticket_purchase(
	id uuid primary key default uuid_generate_v4(),
	customer_id uuid not null references customer,
	date_of_purchase timestamp DEFAULT now()
);

create table ticket_purchase_detail(
	id uuid primary key default uuid_generate_v4(),
	ticket_purchase_id uuid not null references ticket_purchase,
	event_ticket_id uuid not null references event_ticket,
	quantity int4 NOT null
);

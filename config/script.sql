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
	"type" text not null,
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

INSERT INTO "location" (building_name,street_address,city,state,unit_no,postal_code)
VALUES
  ('Ut Semper Corporation','Ap #756-7631 Accumsan Rd.','Melilla','Austria',11,'3343'),
  ('Aliquam Enim Foundation','129-5074 Duis Rd.','Lossiemouth','Peru',6,'243515'),
  ('Quis Diam Incorporated','821-145 Facilisis Avenue','Veenendaal','Netherlands',1,'730336'),
  ('Ac LLP','Ap #480-1494 Eget, Avenue','Dublin','Costa Rica',8,'48184'),
  ('A Arcu Limited','7229 Eleifend. St.','North Shore','Indonesia',10,'308173');
 
INSERT INTO customer (first_name,last_name,date_of_birth,phone_number,street_address,city,state,unit_no,postal_code)
VALUES
  ('Lucas Payne','Cullen Fields','2021-09-12','1-595-542-0144','Ap #756-7631 Accumsan Rd.','Melilla','Austria',11,'3343'),
  ('Scott Bryant','Alana Greene','2022-10-11','1-890-349-8154','129-5074 Duis Rd.','Lossiemouth','Peru',6,'243515'),
  ('Ina Pace','Emily Shields','2022-07-24','1-853-721-7431','821-145 Facilisis Avenue','Veenendaal','Netherlands',1,'730336'),
  ('Nola Ratliff','Vera Wyatt','2021-03-01','1-667-144-4357','Ap #480-1494 Eget, Avenue','Dublin','Costa Rica',8,'48184'),
  ('Ina Terry','Leonard Haney','2022-07-19','(278) 257-5589','7229 Eleifend. St.','North Shore','Indonesia',10,'308173');
 
# Technical specification: Ticket reservation application
## Objective
This document provide technical approach and API documentation for this project.

## Technical approach
### Database structure
![Database diagram](database_diagram.png)

Please check ASSUMPTIONS.md for some constraints and validations applied to each entity.

----------

### Project structure
- event-reservation-app (root)
  - common_utils
  - config
  - controller
  - error_utils
  - repository
  - routes
  - services.js
  - app.js
  - api.js
  - response_api.js

----------

### Module available
event
: this module will handle retrieving and creating event related data.

location
: this module will handle retrieving and creating location related data.

ticket
: this module will handle creating ticket for event.

transaction
: this module will handle creating customer and purchasing event ticket.

----------

## API Documentation
## General API response

Error resource not found

```python
{
    "message": "Resource not found",
    "code": 404,
    "errorCode": "NOT_FOUND",
    "error": true
}
```
----------

## Location
URL
: /api/location

Methods
: GET

Request data
: None

Success response
```python
{
    "message": "Location list",
    "error": false,
    "code": 200,
    "results": {
        "data": [
            {
                "id": "c45ad8f7-1f1a-4fc8-8f09-909fdf588465",
                "building_name": "Ut Semper Corporation",
                "street_address": "Ap #756-7631 Accumsan Rd.",
                "city": "Melilla",
                "state": "Austria",
                "unit_no": "11",
                "postal_code": "3343"
            },
            {
                "id": "cf9f116d-6170-4bf5-b14b-339713ba2428",
                "building_name": "Aliquam Enim Foundation",
                "street_address": "129-5074 Duis Rd.",
                "city": "Lossiemouth",
                "state": "Peru",
                "unit_no": "6",
                "postal_code": "243515"
            },
            {
                "id": "a3c8984c-5f70-4ef6-b054-a56a513e15ce",
                "building_name": "Quis Diam Incorporated",
                "street_address": "821-145 Facilisis Avenue",
                "city": "Veenendaal",
                "state": "Netherlands",
                "unit_no": "1",
                "postal_code": "730336"
            }
        ]
    }
}
```
Error response
```python
{
    "message": "Internal server error.",
    "code": 500,
    "errorCode": "INTERNAL_SERVER_ERROR",
    "error": true
}
```
----------

URL
: /api/location/:id

Methods
: GET

Request data
: None

Success response
```python
{
    "message": "Location data",
    "error": false,
    "code": 200,
    "results": {
        "data": {
            "id": "c45ad8f7-1f1a-4fc8-8f09-909fdf588465",
            "building_name": "Ut Semper Corporation",
            "street_address": "Ap #756-7631 Accumsan Rd.",
            "city": "Melilla",
            "state": "Austria",
            "unit_no": "11",
            "postal_code": "3343"
        }
    }
}
```
Error response
```python
{
    "message": "Internal server error.",
    "code": 500,
    "errorCode": "INTERNAL_SERVER_ERROR",
    "error": true
}
```
----------

URL
: /api/location/create

Methods
: POST

Request data
```python
{
    "building_name": "1",
    "street_address": "123",
    "city": "Jakarta",
    "state": "123",
    "unit_no": "",
    "postal_code": ""
}
```

Success response
```python
{
    "message": "Location data saved to database.",
    "error": false,
    "code": 201,
    "results": {
        "data": {
            "id": "b7ff3202-da9b-44c5-9a99-8c0fdbccd64b",
            "building_name": "1",
            "street_address": "123",
            "city": "Jakarta",
            "state": "123",
            "unit_no": "",
            "postal_code": ""
        }
    }
}
```
Error response
```python
Various validation error, below are some examples
{
    "message": "Internal server error.",
    "code": 500,
    "errorCode": "INTERNAL_SERVER_ERROR",
    "error": true
}

{
    "message": "Building name is required.",
    "code": 400,
    "errorCode": "VALIDATION_ERROR",
    "error": true
}
```
----------
## Event

URL
: /api/event/get_info

Methods
: GET

Request data
: None

Success response
```python
{
    "message": "Event list",
    "error": false,
    "code": 200,
    "results": {
        "data": [
            {
                "id": "37db8022-9b45-474b-8153-c2f319c3cd05",
                "name": "Test",
                "start_date": "2021-11-09T17:00:00.000Z",
                "end_date": "2021-11-10T17:00:00.000Z",
                "location": {
                    "id": "c45ad8f7-1f1a-4fc8-8f09-909fdf588465",
                    "building_name": "Ut Semper Corporation",
                    "street_address": "Ap #756-7631 Accumsan Rd.",
                    "city": "Melilla",
                    "state": "Austria",
                    "unit_no": "11",
                    "postal_code": "3343"
                },
                "event_tickets": [
                    {
                        "id": "2ca83a70-a0c7-4e95-ba57-490ee7975e40",
                        "event_id": "37db8022-9b45-474b-8153-c2f319c3cd05",
                        "type": "VVVVVIPPPP",
                        "quota": 5,
                        "price": "10000"
                    },
                    {
                        "id": "a4d2e92a-1192-4df4-bafb-07586367e779",
                        "event_id": "37db8022-9b45-474b-8153-c2f319c3cd05",
                        "type": "VIP",
                        "quota": 1,
                        "price": "10000"
                    },
                    {
                        "id": "5375429f-bbc1-478b-95f0-1e2ac0e95d77",
                        "event_id": "37db8022-9b45-474b-8153-c2f319c3cd05",
                        "type": "REGULER",
                        "quota": 1,
                        "price": "1"
                    },
                    {
                        "id": "186ebd93-72ba-4a38-9536-a2d7a89f84bf",
                        "event_id": "37db8022-9b45-474b-8153-c2f319c3cd05",
                        "type": "VVVVVIPPP",
                        "quota": 10,
                        "price": "10000"
                    },
                    {
                        "id": "7f4f0b77-55e5-485a-bbfe-09c05cdd158c",
                        "event_id": "37db8022-9b45-474b-8153-c2f319c3cd05",
                        "type": "ASDF",
                        "quota": 5,
                        "price": "10000"
                    }
                ]
            },
        ]
    }
}
```
Error response
```python
{
    "message": "Internal server error.",
    "code": 500,
    "errorCode": "INTERNAL_SERVER_ERROR",
    "error": true
}
```
----------

URL
: /api/event/get_info/:id

Methods
: GET

Request data
: None

Success response
```python
{
    "message": "Event Data",
    "error": false,
    "code": 200,
    "results": {
        "data": {
            "id": "37db8022-9b45-474b-8153-c2f319c3cd05",
            "name": "Test",
            "start_date": "2021-11-09T17:00:00.000Z",
            "end_date": "2021-11-10T17:00:00.000Z",
            "location": {
                "id": "c45ad8f7-1f1a-4fc8-8f09-909fdf588465",
                "building_name": "Ut Semper Corporation",
                "street_address": "Ap #756-7631 Accumsan Rd.",
                "city": "Melilla",
                "state": "Austria",
                "unit_no": "11",
                "postal_code": "3343"
            },
            "event_tickets": [
                {
                    "id": "186ebd93-72ba-4a38-9536-a2d7a89f84bf",
                    "event_id": "37db8022-9b45-474b-8153-c2f319c3cd05",
                    "type": "VVVVVIPPP",
                    "quota": 10,
                    "price": "10000"
                },
                {
                    "id": "a4d2e92a-1192-4df4-bafb-07586367e779",
                    "event_id": "37db8022-9b45-474b-8153-c2f319c3cd05",
                    "type": "VIP",
                    "quota": 1,
                    "price": "10000"
                },
                {
                    "id": "5375429f-bbc1-478b-95f0-1e2ac0e95d77",
                    "event_id": "37db8022-9b45-474b-8153-c2f319c3cd05",
                    "type": "REGULER",
                    "quota": 1,
                    "price": "1"
                },
                {
                    "id": "2ca83a70-a0c7-4e95-ba57-490ee7975e40",
                    "event_id": "37db8022-9b45-474b-8153-c2f319c3cd05",
                    "type": "VVVVVIPPPP",
                    "quota": 5,
                    "price": "10000"
                },
                {
                    "id": "7f4f0b77-55e5-485a-bbfe-09c05cdd158c",
                    "event_id": "37db8022-9b45-474b-8153-c2f319c3cd05",
                    "type": "ASDF",
                    "quota": 5,
                    "price": "10000"
                }
            ]
        }
    }
}
```
Error response
```python
{
    "message": "Internal server error.",
    "code": 500,
    "errorCode": "INTERNAL_SERVER_ERROR",
    "error": true
}
```
----------

URL
: /api/event/create

Methods
: POST

Request data
```python
{
    "start_date": "2021-10-25 08:00:00",
    "end_date": "2021-10-25 10:00:10",
    "location_id": "c45ad8f7-1f1a-4fc8-8f09-909fdf588465",
    "description": "1123",
    "name": "Name"
}
```

Success response
```python
{
    "message": "Event saved to database.",
    "error": false,
    "code": 201,
    "results": {
        "data": {
            "id": "e5ef6a14-a4c2-4600-aeee-921bfe202fcf",
            "name": "Name",
            "description": "1123",
            "start_date": "2021-10-24T18:00:00.000Z",
            "end_date": "2021-10-24T20:00:10.000Z",
            "location_id": "c45ad8f7-1f1a-4fc8-8f09-909fdf588465",
            "location": {
                "id": "c45ad8f7-1f1a-4fc8-8f09-909fdf588465",
                "building_name": "Ut Semper Corporation",
                "street_address": "Ap #756-7631 Accumsan Rd.",
                "city": "Melilla",
                "state": "Austria",
                "unit_no": "11",
                "postal_code": "3343"
            },
            "event_tickets": []
        }
    }
}
```
Error response
```python
Various validation error, below are some examples
{
    "message": "Internal server error.",
    "code": 500,
    "errorCode": "INTERNAL_SERVER_ERROR",
    "error": true
}

{
    "message": "Location id c45ad8f7-1f1a-4fc8-8f09-909fdf588461 does not exist in database.",
    "code": 400,
    "errorCode": "VALIDATION_ERROR",
    "error": true
}
```
----------

## Ticket

URL
: /api/event/ticket/create

Methods
: POST

Request data
```python
[
    {
        "event_id": "2336e5dd-2a4f-4109-9270-6d362d74bdd2",
        "type": "VVIP",
        "quota": "5",
        "price": "10000"
    }
]
```

Success response
```python
{
    "message": "Event ticket saved to database.",
    "error": false,
    "code": 201,
    "results": {
        "data": [
            {
                "id": "15e20908-5d6c-4984-95e0-ca2fe63b499c",
                "event_id": "2336e5dd-2a4f-4109-9270-6d362d74bdd2",
                "type": "VVIP",
                "quota": 5,
                "price": "10000",
                "event": {
                    "id": "2336e5dd-2a4f-4109-9270-6d362d74bdd2",
                    "name": "Name",
                    "description": "1123",
                    "start_date": "2021-10-24T18:00:00.000Z",
                    "end_date": "2021-10-24T20:00:10.000Z",
                    "location_id": "c45ad8f7-1f1a-4fc8-8f09-909fdf588465"
                }
            }
        ]
    }
}
```
Error response
```python
Various validation error, below are some examples
{
    "message": "Internal server error.",
    "code": 500,
    "errorCode": "INTERNAL_SERVER_ERROR",
    "error": true
}

{
    "message": "Event id 2336e5dd-2a4f-4109-9270-6d362d74bdd1 does not exist in database.",
    "code": 400,
    "errorCode": "VALIDATION_ERROR",
    "error": true
}
```
----------

## Transaction

URL
: /api/transaction/get_info

Methods
: GET

Request data
: None

Success response
```python
{
    "message": "Purchase list",
    "error": false,
    "code": 200,
    "results": {
        "data": [
            {
                "id": "11f11caa-8ecd-4463-8c36-1ad1b3ff4788",
                "date_of_purchase": "2021-10-22T03:20:14.050Z",
                "customer": {
                    "first_name": "Krista",
                    "last_name": "Natalia",
                    "date_of_birth": "1991-12-25",
                    "phone_number": "086143135",
                    "street_address": "Jalan kakap raya",
                    "city": "Tangerang",
                    "state": "Indonesia",
                    "unit_no": null,
                    "postal_code": null
                },
                "ticket_purchase_details": [
                    {
                        "id": "298c2cb1-35e6-4e2a-a2fa-6ba86aca5468",
                        "quantity": 2,
                        "event_ticket": {
                            "id": "7f4f0b77-55e5-485a-bbfe-09c05cdd158c",
                            "type": "ASDF",
                            "quota": 5,
                            "price": "10000",
                            "event": {
                                "name": "Test",
                                "description": "test",
                                "start_date": "2021-11-09T17:00:00.000Z",
                                "end_date": "2021-11-10T17:00:00.000Z",
                                "location": {
                                    "id": "c45ad8f7-1f1a-4fc8-8f09-909fdf588465",
                                    "building_na": "Ut Semper Corporation",
                                    "street_addr": "Ap #756-7631 Accumsan Rd.",
                                    "city": "Melilla",
                                    "state": "Austria",
                                    "unit_no": "11",
                                    "postal_code": "3343"
                                }
                            }
                        }
                    }
                ]
            }
        ]
    }
}
```
Error response
```python
{
    "message": "Internal server error.",
    "code": 500,
    "errorCode": "INTERNAL_SERVER_ERROR",
    "error": true
}
```
----------

URL
: /api/transaction/create

Methods
: POST

Request data
```python
{
    "customer": {
        "first_name": "John",
        "last_name": "Du",
        "date_of_birth": "1988-12-25",
        "phone_number": "086143135",
        "street_address": "Jalanan",
        "city": "Jakarta",
        "state": "Indonesia"
    },
    "event": {
        "id": "37db8022-9b45-474b-8153-c2f319c3cd05",
        "tickets": [
            {
                "id": "7f4f0b77-55e5-485a-bbfe-09c05cdd158c",
                "quantity": 5
            }
        ]
    }
}
```

Success response
```python
{
    "message": "Ticket purchase saved to database.",
    "error": false,
    "code": 201,
    "results": {
        "data": [
            {
                "id": "9fec9541-22a1-4464-bf90-3adafcb6a12f",
                "date_of_purchase": "2021-10-22T03:53:35.619Z",
                "customer": {
                    "first_name": "Krista",
                    "last_name": "Natalia",
                    "date_of_birth": "1991-12-25",
                    "phone_number": "086143135",
                    "street_address": "Jalan kakap raya",
                    "city": "Tangerang",
                    "state": "Indonesia",
                    "unit_no": null,
                    "postal_code": null
                },
                "ticket_purchase_details": [
                    {
                        "id": "22371e7b-f3fe-4c69-ac4f-a87ddadd40e2",
                        "quantity": 2,
                        "event_ticket": {
                            "id": "7f4f0b77-55e5-485a-bbfe-09c05cdd158c",
                            "type": "ASDF",
                            "quota": 5,
                            "price": "10000",
                            "event": {
                                "name": "Test",
                                "description": "test",
                                "start_date": "2021-11-09T17:00:00.000Z",
                                "end_date": "2021-11-10T17:00:00.000Z",
                                "location": {
                                    "id": "c45ad8f7-1f1a-4fc8-8f09-909fdf588465",
                                    "building_na": "Ut Semper Corporation",
                                    "street_addr": "Ap #756-7631 Accumsan Rd.",
                                    "city": "Melilla",
                                    "state": "Austria",
                                    "unit_no": "11",
                                    "postal_code": "3343"
                                }
                            }
                        }
                    }
                ]
            }
        ]
    }
}
```
Error response
```python
Various validation error, below are some examples.
{
    "message": "Internal server error.",
    "code": 500,
    "errorCode": "INTERNAL_SERVER_ERROR",
    "error": true
}

{
    "message": "Event is required.",
    "code": 400,
    "errorCode": "VALIDATION_ERROR",
    "error": true
}
```
----------

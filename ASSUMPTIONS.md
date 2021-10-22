# Assumptions

## Flow
- Location must be created first.
- User can create multiple tickets.
----------


## Constraints and validations

### Create location

1. building_name length between 1 - 50, required
2. street_address length between 1 - 250, required
3. city length between 1 - 50, required
4. state length between 1 - 50, required
5. unit_no max length 20, not required
6. postal_code max length 16, not required

### Create event
1. start_date > now, required
2. end_date > now, required
3. start_date < end_date
4. start_date and end_date must be correct time format (YYYY-MM-DD HH:MM:SS)
5. name length between 1 - 50, required
6. location must valid location, required
7. description is not required

### Create ticket

1. event_id must be valid id, required
2. type length between 1 - 16, required
3. quota > 0
4. price >= 0
5. type and event_id unique together

### Create transaction
#### Customer

1. first_name length between 1 - 250, required
2. last_name max length 250, not required
3. date_of_birth must be correct date format (YYYY-MM-DD), required
4. phone_number length between 4 - 15, required
5. street_address length between 1 - 250, required
6. city length between 1 - 50, required
7. state length between 1 - 50, required
8. unit_no max length 20, not required
9. postal_code max length 16, not required

#### Transaction
1. If quota less than 1, cannot purchase
2. ticket quantity > 0
3. ticket type must be chosen
4. event without ticket cannot be reserved
5. If event end date passed, cannot be reserved

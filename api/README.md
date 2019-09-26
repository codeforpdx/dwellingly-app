How to set up Dwelling Flask Testing Backend.
NOTE: no database setup here. Backend uses list-based live data

# Setup Python on your system

[Link to Guide](https://realpython.com/installing-python/ 'Setup Python')

# Run

    pip3 install --no-cache-dir -r api/requirements.txt

# Run

    cd api
    flask run

###Established Endpoints

#### ENDPOINT: USERS

| method | route           | action                 |
| :----- | :-------------- | :--------------------- |
| POST   | `v1/users/`     | Creates a new user     |
| GET    | `v1/users/`     | Gets all users         |
| GET    | `v1/users/:uid` | Gets a single user     |
| PATCH  | `v1/users/:uid` | Updates a single user  |
| PUT    | `v1/users/:uid` | Archives a single user |
| DELETE | `v1/users/:uid` | Deletes a single user  |

```javascript
  {
        "name": "Default User",
        "password": "userPassword",
        "username": "defaultUser",
        "email": "user1@dwellingly.com",
        "archived": "false",
        "uid": "user0",
        "phone":'555-555-5555',
        "role": {
                    "isAdmin": "true",
                    "isPropertyManager": "false",
                    "isStaff": "false"
                }
        }
```

#### ENDPOINT: PROPERTIES

| method | route                | action                     |
| :----- | :------------------- | :------------------------- |
| POST   | `v1/properties/`     | Creates a new property     |
| GET    | `v1/properties/`     | Gets all properties        |
| GET    | `v1/properties/:uid` | Gets a single property     |
| PATCH  | `v1/properties/:uid` | Updates a single property  |
| PUT    | `v1/properties/:uid` | Archives a single property |
| DELETE | `v1/properties/:uid` | Deletes a single property  |

```javascript
     {
    "id": "property1",
    "name": "Garden Blocks",
    "address": "1654 NE 18th Ave.",
    "zipCode": "97218",
    "city": "Portland",
    "state": "OR"
  },
```

<br>

#### ENDPOINT: EMERGENCY NUMBERS

| method | route                      | action                             |
| :----- | :------------------------- | :--------------------------------- |
| POST   | `v1/emergencyNumbers/`     | Creates a new emergency number     |
| GET    | `v1/emergencyNumbers/`     | Gets all emergency numbers         |
| GET    | `v1/emergencyNumbers/:uid` | Gets a single emergency number     |
| PATCH  | `v1/emergencyNumbers/:uid` | Updates a single emergency number  |
| PUT    | `v1/emergencyNumbers/:uid` | Archives a single emergency number |
| DELETE | `v1/emergencyNumbers/:uid` | Deletes a single emergency number  |

```javascript
    {
        "id": "00000001",
        "name": "Test Number 1",
        "type": "user",
        "userid": "user1",
        "propertyid":"none",
        "number": "555-55-1234"
    },
```

<br>

#### ENDPOINT: TENANTS

| method | route             | action                   |
| :----- | :---------------- | :----------------------- |
| POST   | `v1/tenants/`     | Creates a new tenant     |
| GET    | `v1/tenants/`     | Gets all tenants         |
| GET    | `v1/tenants/:uid` | Gets a single tenant     |
| PATCH  | `v1/tenants/:uid` | Updates a single tenant  |
| PUT    | `v1/tenants/:uid` | Archives a single tenant |
| DELETE | `v1/tenants/:uid` | Deletes a single tenant  |

```javascript
    {
    "id": "tenent1",
    "dateCreated": "Thu Aug 23 2018 16:40:35 GMT-0700 (Pacific Daylight Time)",
    "dateUpdated": "Thu Aug 23 2018 15:54:48 GMT-0700 (Pacific Daylight Time)",
    "lastName": "Smith",
    "firstName": "Will",
    "phone": "503-555-1234",
    "lease": "LEASE2",
    "propertyid": "property1"
    },
```

<br>

#### ENDPOINT: TICKETS

| method | route             | action                   |
| :----- | :---------------- | :----------------------- |
| POST   | `v1/tickets/`     | Creates a new ticket     |
| GET    | `v1/tickets/`     | Gets all tickets         |
| GET    | `v1/tickets/:uid` | Gets a single ticket     |
| PATCH  | `v1/tickets/:uid` | Updates a single ticket  |
| PUT    | `v1/tickets/:uid` | Archives a single ticket |
| DELETE | `v1/tickets/:uid` | Deletes a single ticket  |

```javascript
 {
    "id": "ticket1",
    "issue": "Unpaid Rent",
    "tenant": {
            "tenent_id": "defaultUser"
    },
    "sender": {
      "name": "Donald Davis",
      "number": "541-123-4567",
      "email": "DD@dwellingly.com"
    },
    "sent": "Sat Oct 06 2018 11:00:08 GMT-0700 (Pacific Daylight Time)",
    "status": "New",
    "urgency": "High",
    "notes": [
      {
        "id": "K-0089ttxqQX-1",
        "userID": "defaultUser",
        "sent": "Sat Oct 06 2018 11:00:08 GMT-0700 (Pacific Daylight Time)",
        "message": "Thanks, Tom."
      },
      {
        "id": "K-0089ttxqQX-2",
        "userID": "defaultUser3",
        "sent": "Today 3:25pm",
        "message":
          "I plan to meet with Megan today. Thank you for contacting JOIN with this issue."
      },
      {
        "id": "K-0089ttxqQX-3",
        "name": "Tara Mckenzie",
        "sent": "Today 12:40pm",
        "message":
          "This is the third time we have had to deal with late rent. Please speak to tenant ASAP."
      }
    ]
  }
```

<br>

#### ENDPOINT: LEASES

| method | route            | action                  |
| :----- | :--------------- | :---------------------- |
| POST   | `v1/leases/`     | Creates a new lease     |
| GET    | `v1/leases/`     | Gets all leases         |
| GET    | `v1/leases/:uid` | Gets a single lease     |
| PATCH  | `v1/leases/:uid` | Updates a single lease  |
| PUT    | `v1/leases/:uid` | Archives a single lease |
| DELETE | `v1/leases/:uid` | Deletes a single lease  |

```javascript
     {
        "id" :"LEASE1",
        "propertyId": "property-01",
        "dateStart": "Sat Oct 06 2018 11:00:08 GMT-0700 (Pacific Daylight Time)",
        "dateEnd": "Thu Dec 06 2018 11:00:08 GMT-0700 (Pacific Daylight Time)",
        "unit": "1D",
        "dateUpdated": "Thu Sep 06 2018 11:00:08 GMT-0700 (Pacific Daylight Time)"
      },
```

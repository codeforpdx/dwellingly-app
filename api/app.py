from flask import Flask, request
from flask_restful import Resource, Api, reqparse
from flask_jwt import JWT, jwt_required, current_identity

# from security import authenticate, identity

app = Flask(__name__)
app.config['PROPAGATE_EXCEPTIONS'] = True # To allow flask propagating exception even if debug is set to false on app
app.secret_key = 'dwellingly'
api = Api(app)

# jwt = JWT(app, authenticate, identity)

userList = [
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
        },
        {
            "name": "Default User2",
            "password": "userPassword",
            "username": "defaultUser2",
            "email": "user2@dwellingly.com",
            "archived": "false",
            "uid": "user1",
             "role": {
                    "isAdmin": "false",
                    "isPropertyManager": "true",
                    "isStaff": "false"
                    }
        },
        {
            "name": "Default User3",
            "password": "userPassword",
            "username": "defaultUser3",
            "email": "user3@dwellingly.com",
            "archived": "false",
            "uid": "user2",
             "role": {
                    "isAdmin": "false",
                    "isPropertyManager": "false",
                    "isStaff": "true"
                    }
        }
]


propertyList= [
     {
    "id": "property1",
    "name": "Garden Blocks",
    "address": "1654 NE 18th Ave.",
    "zipCode": "97218",
    "city": "Portland",
    "state": "OR"
  },
  {
    "id": "property2",
    "name": "Magnolia Park",
    "address": "2200 SE Main St.",
    "zipCode": "12340",
    "city": "Portland",
    "state": "OR"
  },
  {
    "id": "property3",
    "name": "Mountain View",
    "address": "311 Sandy Blvd.",
    "zipCode": "97218",
    "city": "Portland",
    "state": "OR"
  }
]

emergencyList = [
    {
        "id": "00000001",
        "name": "Test Number 1",
        "type": "user",
        "userid": "user1",
        "propertyid":"none",
        "number": "555-55-1234"
    },
      {
        "id": "00000002",
        "name": "Test Number 2",
        "type": "property",
        "userid": "none",
        "propertyid":"property1",
        "number": "555-55-1234"
    }
]

tenentsList = [
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
    {
    "id": "tenent2",
    "dateCreated": "Thu Aug 24 2018 16:40:35 GMT-0700 (Pacific Daylight Time)",
    "dateUpdated": "Thu Aug 24 2018 15:54:48 GMT-0700 (Pacific Daylight Time)",
    "lastName": "Bluth",
    "firstName": "George",
    "phone": "503-555-1235",
    "lease": "LEASE1",
    "propertyid": "property2"
    }
]

ticketsList = [
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
]

leaseList = [
     {
        "id" :"LEASE1",
        "propertyId": "property-01",
        "dateStart": "Sat Oct 06 2018 11:00:08 GMT-0700 (Pacific Daylight Time)",
        "dateEnd": "Thu Dec 06 2018 11:00:08 GMT-0700 (Pacific Daylight Time)",
        "unit": "1D",
        "dateUpdated": "Thu Sep 06 2018 11:00:08 GMT-0700 (Pacific Daylight Time)"
      },
      {
        "id" :"LEASE2",
        "propertyId": "property-01",
        "dateStart": "Sat Oct 06 2018 11:00:08 GMT-0700 (Pacific Daylight Time)",
        "dateEnd": "Thu Dec 06 2018 11:00:08 GMT-0700 (Pacific Daylight Time)",
        "unit": "283",
        "dateUpdated": "Thu Sep 06 2018 11:00:08 GMT-0700 (Pacific Daylight Time)"
      },
]

# | method | route           | action                 |
# | :----- | :-------------- | :--------------------- |
# | POST   | `v1/users/`     | Creates a new user     |
# | GET    | `v1/users/`     | Gets all users         |
# | GET    | `v1/users/:uid` | Gets a single user     |
# | PATCH  | `v1/users/:uid` | Updates a single user  |
# | PUT    | `v1/users/:uid` | Archives a single user |
# | DELETE | `v1/users/:uid` | Deletes a single user  |

class User(Resource):

    def get(self, uid):
        user = next(filter(lambda x: x["uid"] == uid, userList), None)
        return {"user": user}, 200 if user else 404

    def patch(self, uid):
        user = next(filter(lambda x: x["uid"] == uid, userList), None)
        parser = reqparse.RequestParser()
        parser.add_argument('name', help="need a email")
        parser.add_argument('password', required=True, help="need a password")
        parser.add_argument('username', help="need a username")
        parser.add_argument('email', help="need a email")

        request_data = parser.parse_args()

        if user:
            user.update(request_data)
        return {"user": user}, 200

    def put(self, uid):
        for user in userList:
            if user["uid"] == uid:
                if user["archived"] == "false":
                    user["archived"] = "true"
                else:
                    user["archived"] = "false"
                return user, 201

        return {"message": "User not found"}, 404

    def delete(self, uid):
        global userList
        userList = next(filter(lambda x: x["uid"] != uid, userList), None)
        return {"message": "user deleted"}

class Users(Resource):
    def get(self):
        return {"users": userList}

    def post(self):
         uid = "user" + str(len(userList)) 
         request_data = request.get_json()

         new_user = {
            "name": request_data["name"],
            "password": request_data["password"],
            "username": request_data["username"],
            "email": request_data["email"],
            "archived": "false",
            "uid":uid
            }
         userList.append(new_user)

         return new_user, 201

# | method | route                | action                     |
# | :----- | :------------------- | :------------------------- |
# | POST   | `v1/properties/`     | Creates a new property     |
# | GET    | `v1/properties/`     | Gets all properties        |
# | GET    | `v1/properties/:id` | Gets a single property     |
# | PATCH  | `v1/properties/:id` | Updates a single property  |
# | DELETE | `v1/properties/:id` | Deletes a single property  |


# single property resource
class Property(Resource):

    def get(self,id):
        property = next(filter(lambda x: x["id"] == id, propertyList), None)
        return {"property": property}, 200 if property else 404

    def patch(self,id):
        property = next(filter(lambda x: x["id"] == id, propertyList), None)
        # request_data = request.get_json()
        #   "id": "property-01",
        # "name": "Garden Blocks",
        # "address": "1654 NE 18th Ave.",
        # "zipCode": "97218",
        # "city": "Portland",
        # "state": "OR"

        parser = reqparse.RequestParser()
        parser.add_argument('name', help="need a name")
        parser.add_argument('address', help="address incomplete")
        parser.add_argument('city', help="address incomplete")
        parser.add_argument('zipCode', help="address incomplete")
        parser.add_argument('state', help="address incomplete")

        request_data = parser.parse_args()

        if property:
            property.update(request_data)
        return {"property": property}, 200

    def delete(self, id):
        global propertyList
        propertyList = next(filter(lambda x: x["id"] != id, propertyList), None)
        return {"message": "property deleted"}


# multiple property resources
class Properties(Resource):
    def get(self):
        return {"properties": propertyList}, 200 if propertyList else 404

    def post(self):
        id = "property" + str(len(userList)) 
        request_data = request.get_json()

        new_property = {
          "id":id,
          "name": request_data["name"],
          "address": request_data["address"],
          "zipCode": request_data["zipCode"],
          "city": request_data["city"],
          "state": request_data["state"]
          }
        propertyList.append(new_property)

        return new_property, 201

# | method | route                      | action                             |
# | :----- | :------------------------- | :--------------------------------- |
# | POST   | `v1/emergencyNumbers/`     | Creates a new emergency number     |
# | GET    | `v1/emergencyNumbers/`     | Gets all emergency numbers         |
# | GET    | `v1/emergencyNumbers/:uid` | Gets a single emergency number     |
# | PATCH  | `v1/emergencyNumbers/:uid` | Updates a single emergency number  |
# | PUT    | `v1/emergencyNumbers/:uid` | Archives a single emergency number |
# | DELETE | `v1/emergencyNumbers/:uid` | Deletes a single emergency number  |


# single emergency number resource
class EmergencyNumbers(Resource):

    def get(self,id):
        item = next(filter(lambda x: x["id"] == id, emergencyList), None)
        return {"Emergency Number": item}, 200 if item else 404

        #  "id": "00000001",
        # "name": "Test Number 1",
        # "type": "user",
        # "userid": "user1",
        # "number": "555-55-1234"
    def patch(self,id):
        item = next(filter(lambda x: x["id"] == id, emergencyList), None)

        parser = reqparse.RequestParser()
        parser.add_argument('name', help="need a name")
        parser.add_argument('type', help="need type")
        parser.add_argument('userid', help="need userid")
        parser.add_argument('propertyid', help="need propertyid")
        parser.add_argument('number', help="need number")

        request_data = parser.parse_args()

        if item:
            item.update(request_data)
        return {"Emergency Number": item}, 200

    def delete(self, id):
        global emergencyList
        emergencyList = next(filter(lambda x: x["id"] != id, emergencyList), None)
        return {"message": "Emergency Number deleted"}


# multiple propert resources
class Emergency(Resource):
    def get(self):
        return {"Emergency Numbers": emergencyList}, 200 if emergencyList else 404

    def post(self):
        id = "00000000" + str(len(userList)) 
        request_data = request.get_json()

        #  "id": "00000001",
        # "name": "Test Number 1",
        # "type": "user",
        # "userid": "user1",
        # "number": "555-55-1234"

        new_emergency= {
          "id":id,
          "name": request_data["name"],
          "type": request_data["type"],
          "userid": request_data["userid"],
          "propertyid": request_data["propertyid"],
          "number": request_data["number"]
          }
        emergencyList.append(new_emergency)

        return new_emergency, 201


# single tenent resource
class Tenent(Resource):

    def get(self,id):
        item = next(filter(lambda x: x["id"] == id, tenentsList), None)
        return {"Tenent": item}, 200 if item else 404

    # "dateCreated": "Thu Aug 23 2018 16:40:35 GMT-0700 (Pacific Daylight Time)",
    # "dateUpdated": "Thu Aug 23 2018 15:54:48 GMT-0700 (Pacific Daylight Time)",
    # "lastName": "Smith",
    # "firstName": "Will",
    # "phone": "503-555-1234",
    # "lease": "LEASE-00000002",
    # "property": "property1"

    def patch(self,id):
        item = next(filter(lambda x: x["id"] == id, tenentsList), None)

        parser = reqparse.RequestParser()
        parser.add_argument('dateUpdated', help="need a last name")
        parser.add_argument('lastName', help="need a last name")
        parser.add_argument('firstName', help="need a First name")
        parser.add_argument('phone', help="need phone")
        parser.add_argument('lease', help="need leaseid")
        parser.add_argument('propertyid', help="need propertyid")

        request_data = parser.parse_args()

        if item:
            item.update(request_data)
        return {"Tenent": item}, 200

    def delete(self, id):
        global tenentsList
        tenentsList = next(filter(lambda x: x["id"] != id, tenentsList), None)
        return {"message": "tenent deleted"}


# multiple propert resources
class Tenents(Resource):
    def get(self):
        return {"Tenents": tenentsList}, 200 if tenentsList else 404

    def post(self):
        id = "tenent" + str(len(userList)) 
        request_data = request.get_json()
        dateCreated = "Thu Aug 23 2018 16:40:35 GMT-0700 (Pacific Daylight Time)"
        dateUpdated = "Thu Aug 23 2018 15:54:48 GMT-0700 (Pacific Daylight Time)"
        #hard coded because not looking up DateTime right now
        
    # "dateCreated": "Thu Aug 23 2018 16:40:35 GMT-0700 (Pacific Daylight Time)",
    # "dateUpdated": "Thu Aug 23 2018 15:54:48 GMT-0700 (Pacific Daylight Time)",
    # "lastName": "Smith",
    # "firstName": "Will",
    # "phone": "503-555-1234",
    # "lease": "LEASE-00000002",
    # "propertyid": "property1"

        new_tenent= {
          "id":id,
          "dateCreated": dateCreated,
          "dateUpdated": dateUpdated,
          "lastName": request_data["lastName"],
          "firstName": request_data["firstName"],
          "phone": request_data["phone"],
          "lease": request_data["lease"],
          "propertyid": request_data["propertyid"]
          }
        tenentsList.append(new_tenent)

        return new_tenent, 201


# single Lease resource
class Lease(Resource):

    def get(self,id):
        item = next(filter(lambda x: x["id"] == id, leaseList), None)
        return {"Lease": item}, 200 if item else 404

        # "id" :"LEASE1",
        # "propertyId": "property-01",
        # "dateStart": "Sat Oct 06 2018 11:00:08 GMT-0700 (Pacific Daylight Time)",
        # "dateEnd": "Thu Dec 06 2018 11:00:08 GMT-0700 (Pacific Daylight Time)",
        # "unit": "1D",
        # "dateUpdated": "Thu Sep 06 2018 11:00:08 GMT-0700 (Pacific Daylight Time)"

    def patch(self,id):
        item = next(filter(lambda x: x["id"] == id, leaseList), None)

        parser = reqparse.RequestParser()
        parser.add_argument('propertyId', help="need a property")
        parser.add_argument('dateStart', help="need start date")
        parser.add_argument('dateEnd', help="need end date")
        parser.add_argument('unit', help="need unit")
        parser.add_argument('dateUpdated', help="need Update")

        request_data = parser.parse_args()

        if item:
            item.update(request_data)
        return {"Lease": item}, 200

    def delete(self, id):
        global leaseList
        leaseList = next(filter(lambda x: x["id"] != id, leaseList), None)
        return {"message": "lease deleted"}

# multiple propert resources
class Leases(Resource):
    def get(self):
        return {"Leases": leaseList}, 200 if leaseList else 404

    def post(self):
        id = "LEASE" + str(len(leaseList)) 
        request_data = request.get_json()
        dateStart = "Sat Oct 06 2018 11:00:08 GMT-0700 (Pacific Daylight Time)"
        dateEnd = "Thu Dec 06 2018 11:00:08 GMT-0700 (Pacific Daylight Time)"
        dateUpdated = "Thu Sep 06 2018 11:00:08 GMT-0700 (Pacific Daylight Time)"

        new_lease= {
          "id":id,
          "propertyId": request_data["propertyId"],
          "unit": request_data["unit"],
          "dateStart": dateStart,
          "dateEnd": dateEnd,
          "dateUpdated": dateUpdated
          }
        leaseList.append(new_lease)

        return new_lease, 201


class Ticket(Resource):

    def get(self,id):
        item = next(filter(lambda x: x["id"] == id, ticketsList), None)
        return {"Ticket": item}, 200 if item else 404


    def patch(self,id):
        item = next(filter(lambda x: x["id"] == id, ticketsList), None)

        parser = reqparse.RequestParser()
        parser.add_argument('issue')
        parser.add_argument('tennent', help="need tennent")
        parser.add_argument('sender', help="need sender")
        parser.add_argument('status', help="need status")
        parser.add_argument('urgancy')
        parser.add_argument('notes')
        request_data = parser.parse_args()

        if item:
            item.update(request_data)
        return {"Tickets": item}, 200

    def delete(self, id):
        global ticketsList
        ticketsList = next(filter(lambda x: x["id"] != id, ticketsList), None)
        message = "Ticket " + id + " deleted"
        return {"message": message}


# multiple propert resources
class Tickets(Resource):
    def get(self):
        return {"Tickets": ticketsList}, 200 if ticketsList else 404

    def post(self):
        id = "ticket" + str(len(userList)) 
        request_data = request.get_json()
        sentDate = "Sat Oct 06 2018 11:00:08 GMT-0700 (Pacific Daylight Time)" #fix this

        new_ticket= {
          "id":id,
          "sent": sentDate,
          "status": "New",
          "urgency": request_data["urgency"],
          "issue": request_data["issue"],
          "tennent": request_data["tennent"],
          "sender": request_data["sender"],
          "notes": request_data["notes"]
          }
        ticketsList.append(new_ticket)

        return new_ticket, 201




#connects the resouces to the url 
api.add_resource(Users, "/v1/users")
api.add_resource(User, "/v1/users/<string:uid>")
api.add_resource(Properties, "/v1/properties")
api.add_resource(Property, "/v1/properties/<string:id>")
api.add_resource(Emergency, "/v1/emergencyNumbers")
api.add_resource(EmergencyNumbers, "/v1/emergencyNumbers/<string:id>")
api.add_resource(Tenent, "/v1/tenants")
api.add_resource(Tenents, "/v1/tenants/<string:id>")
api.add_resource(Lease, "/v1/leases")
api.add_resource(Leases, "/v1/leases/<string:id>")
api.add_resource(Tickets, "/v1/tickets")
api.add_resource(Ticket, "/v1/tickets/<string:id>")

if __name__ == '__main__':
    app.run(debug=True)  # important to mention debug=True
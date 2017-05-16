# Multiupdate BDM
```sh
URI: /clients/bdm
Method: POST
data: {
        "bdm" : {
        "name" : "testbdm1",
        "email" : "testbdm1@etouch.net"
        },
        "ids": ["5910b79fbc82a033cc2bfbb4",
                "5910b79fbc82a033cc2bfc27"]
}
```
# Get Role based Clients data
```sh
URI: clients/data/isr OR clients/data/bdm
Method: GET
```
# Add New Client
```sh
URI: /clients/add
Method: POST
data: {
  "newClient": {
    "firstName": "John",
    "lastName": "Smith",
    "etouchSl": "enginnering",
    "title": "Architect",
    "managementLevel": "Non Manager",
    "email": "john.smith@anna.com",
    "city": "Fremont",
    "state": "CA",
    "phone": "2345678902",
    "extension": "023",
    "supervisor": "",
    "company": "Intuit",
    "sector": "",
    "industry": "Software",
    "status": "",
    "linkedInUrl": "http://www.intuit.com"
  }
}

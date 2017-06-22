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
```
# User call records for chart
```sh
URI: /userdata/callreport
Method: POST
data: {
    "bdm" : ["testbdm1@etouch.net"],
    "isr" : ["testisr1@etouch.net"],
    "fromDate": "Thu Jun 1 2017 00:00:00 GMT-0700 (Pacific Daylight Time)",
    "toDate": "Fri Jun 30 2017 23:59:59 GMT-0700 (Pacific Daylight Time)",
    "groupBy": "day"
}
```
# Delete Clients
```sh
URI: /clients
Method: DELETE
data: {
	  "ids": ["593ed85a022df823e80f5f7d", "593ed85a022df823e80f5f7e"]
}
```
# Clientwise User call records for chart
```sh
URI: /userdata/clientreport
Method: POST
data: {
    "bdm" : ["testbdm1@etouch.net"],
    "isr" : ["testisr1@etouch.net"],
    "fromDate": "Thu Jun 1 2017 00:00:00 GMT-0700 (Pacific Daylight Time)",
    "toDate": "Fri Jun 30 2017 23:59:59 GMT-0700 (Pacific Daylight Time)"
}
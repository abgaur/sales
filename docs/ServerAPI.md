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
# DB Scripts

* Create Stages collection

```sh
db.stages.insert({ displayOrder : "1", key : "assigned", value: "Assigned"})
db.stages.insert({ displayOrder : "2", key : "inProgress", value: "In Progress"})
db.stages.insert({ displayOrder : "3", key : "closed", value: "Closed"})
```
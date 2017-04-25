# DB Scripts

* Create Statuses collection

```sh
db.statuses.insert({ displayOrder : "1", key : "assigned", value: "Assinged"})
db.statuses.insert({ displayOrder : "2", key : "inProgress", value: "In Progress"})
db.statuses.insert({ displayOrder : "3", key : "closed", value: "Closed"})
```
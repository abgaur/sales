# DB Scripts

* Create Stages collection

```sh
db.stages.insert({ displayOrder : "1", key : "meetingFixed", value: "Meeting Fixed"})
db.stages.insert({ displayOrder : "2", key : "notInterested", value: "Not Interested"})
db.stages.insert({ displayOrder : "3", key : "callBack", value: "Call Back"})
db.stages.insert({ displayOrder : "4", key : "followUp", value: "Follow Up"})
db.stages.insert({ displayOrder : "5", key : "emailSent", value: "Email Sent"})
db.stages.insert({ displayOrder : "6", key : "voiceMail", value: "Voice Mail"})
```
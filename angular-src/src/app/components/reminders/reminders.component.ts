import { Component, OnInit } from '@angular/core';
import { FlashMessagesService} from 'angular2-flash-messages';
import { RemindersService } from '../../services/reminders.service'
import { Observable } from "rxjs/Rx";
import { ClientService } from '../../services/client.service'

@Component({
  selector: 'app-reminders',
  templateUrl: './reminders.component.html',
  styleUrls: ['./reminders.component.css']
})
export class RemindersComponent implements OnInit {
  reminders: any;
  constructor(private remindersService: RemindersService) { 
    this.reminders = [
      {
        id: "1",
        reminderDate: "today",
        
      },
      {
        id: "2",
        reminderDate: "todaytoday"
      },
      {
        id: "3",
        reminderDate: "todaytodaytoday"
      },
      {
        id: "4",
        reminderDate: "todaytodaytodaytoday"
      }
    ]

  }

  getReminders() {
    this.remindersService.getReminders().subscribe( data => {
        console.log('got data from service');
        //this.gridOptions.api.setRowData(data);
    });
  }

  ngOnInit() {
  }

  openReminder(evt, rem) {
    console.dir(rem);
  }

}

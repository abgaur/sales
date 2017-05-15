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
  clients: Array<any> = [];
  selectedClient: any;
  constructor(private remindersService: RemindersService,
    private clientService: ClientService) { 
    this.getReminders();
  }

  getReminders() {
      this.remindersService.getReminders().subscribe(data => {
          console.log(data);
        this.clients = data;        
    });
  }

  ngOnInit() {
  }

  openReminder(evt, rem) {
     this.clientService.getDataById(rem._id).subscribe((data) => {
        this.selectedClient = data;
        this.selectedClient.comments = [];
      });    
  }

}

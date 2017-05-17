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
  isLoading: Boolean = false;

  constructor(private remindersService: RemindersService,
    private clientService: ClientService) { 
    
  }

  getReminders() {
      this.isLoading = true;
      this.remindersService.getReminders().subscribe(data => {
        this.isLoading = false;
        this.clients = data;        
    });
  }

  ngOnInit() {
      this.getReminders();
  }

  openReminder(evt, rem) {
     this.clientService.getDataById(rem._id).subscribe((data) => {
        this.selectedClient = data;
        this.selectedClient.comments = [];
      });    
  }

}

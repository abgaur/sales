import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ClientService } from '../../services/client.service';
import { ValidateService } from '../../services/validate.service';
import { NotificationComponent } from '../notification/notification.component';
import { NotificationService } from '../notification/notification.service';
import * as NotificationEnumType from '../notification/notification-types';
import { FlashMessagesService} from 'angular2-flash-messages';

@Component({
  selector: 'app-new-client',
  templateUrl: './new-client.component.html',
  styleUrls: ['./new-client.component.css']
})
export class NewClientComponent implements OnInit {

	 @Output() clientUpdated: EventEmitter<any> = new EventEmitter();

	 private notificationType = NotificationEnumType.NotificationType;

     firstName: String;
     lastName: String;
     etouchSl: String;
     title: String;
     
     managementLevel: String;
     email: String;
     city: String;
     state: String;
     
     phone: String;
     extension: String;
     supervisor: String;
     company: String;
     
     sector: String;
     industry: String;
     status: String;
     linkedInUrl: String;

	  constructor( private clientService: ClientService,
	  	private flashMessage: FlashMessagesService,
	  	  private notificationService: NotificationService,
	  	  private validateService: ValidateService) { }

	  ngOnInit() {
	  }

  private updateClientFailure(err: any){
    this.notificationService.show(
          'edit-popup-notification',
          'Error occurred while updating the client.', 
          null,
          5000, 
          this.notificationType.ERROR
        );
  }

	    onClientSubmit(){

		  let objClient = {
		  newClient: {
			   firstName: this.firstName,
		       lastName: this.lastName,
		       etouchSl: this.etouchSl,
		       title: this.title,
		       
		       managementLevel: this.managementLevel,
		       email: this.email,
		       city: this.city,
		       state: this.state,
		       
		       phone: this.phone,
		       extension: this.extension,
		       supervisor: this.supervisor,
		       company: this.company,
		       
		       sector: this.sector,
		       industry: this.industry,
		       status: this.status,
		       linkedInUrl: this.linkedInUrl,
		    }	
		  };


     if(!this.validateService.validateEmail(objClient.newClient.email)) {
       this.notificationService.show(
	          'new-client-notification', 
	          'Please Type Valid Email', 
	          null,
	          5000, 
	          this.notificationType.ERROR
	        );
      // this.flashMessage.show('Please user valid email', {cssClass: 'alert-danger', timeout: 3000});
      return false;
    }

    this.clientService.addClient(objClient).subscribe((data) => {
	      if(data.success) {

	     this.clientUpdated.emit(data);
	        this.notificationService.show(
	          'new-client-notification', 
	          'New Client Added.', 
	          null,
	          5000, 
	          this.notificationType.SUCCESS
	        );
      }else{
        this.updateClientFailure(null);
      }

  });

}
}

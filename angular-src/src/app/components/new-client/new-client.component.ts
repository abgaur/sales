import { Component, OnInit } from '@angular/core';
import { ClientService } from '../../services/client.service';
import { FlashMessagesService} from 'angular2-flash-messages';

@Component({
  selector: 'app-new-client',
  templateUrl: './new-client.component.html',
  styleUrls: ['./new-client.component.css']
})
export class NewClientComponent implements OnInit {

     rainKingContactId: String;
     salutation: String;
     firstName: String;
     lastName: String;
     nickname: String;
     etouchSl: String;
     title: String;
     managementLevel: String;
     email: String;
     address1: String;
     address2: String;
     city: String;
     state: String;
     zip: String;
     country: String;
     phone: String;
     extension: String;
     supervisor: String;
     fax: String;
     hasGatekeeper: String;
     executive: String;
     rainKingCompanyId: String;
     company: String;
     website: String;
     sector: String;
     industry: String;
     duns: String;
     allEmployees: String;
     itEmployees: String;
     managers: String;
     revenue: String;
     itBudget: String;
     fiscalYearEnd: String;
     rank: String;
     lastUpdatedDate: String;
     notes: String;
     tags: String;
     status: String;
     linkedInUrl: String;
     twitterUrl: String;

	  constructor( private clientService: ClientService,
	  	private flashMessage: FlashMessagesService) { }

	  ngOnInit() {
	  }

	    onClientSubmit(){

		  const user = {
		       rainKingContactId: this.rainKingContactId,
		       salutation: this.salutation,
		       firstName: this.salutation,
		       lastName: this.lastName,
		       nickname: this.nickname,
		       etouchSl: this.etouchSl,
		       title: this.title,
		       managementLevel: this.managementLevel,
		       email: this.email,
		       address1: this.address1,
		       address2: this.address2,
		       city: this.city,
		       state: this.state,
		       zip: this.zip,
		       country: this.country,
		       phone: this.phone,
		       extension: this.extension,
		       supervisor: this.supervisor,
		       fax: this.fax,
		       hasGatekeeper: this.hasGatekeeper,
		       executive: this.executive,
		       rainKingCompanyId: this.rainKingCompanyId,
		       company: this.company,
		       website: this.website,
		       sector: this.sector,
		       industry: this.industry,
		       duns: this.duns,
		       allEmployees: this.allEmployees,
		       itEmployees: this.itEmployees,
		       managers: this.managers,
		       revenue: this.revenue,
		       itBudget: this.itBudget,
		       fiscalYearEnd: this.fiscalYearEnd,
		       rank: this.rank,
		       lastUpdatedDate: this.lastUpdatedDate,
		       notes: this.notes,
		       tags: this.tags,
		       status: this.status,
		       linkedInUrl: this.linkedInUrl,
		       twitterUrl: this.twitterUrl,
		    };

   console.log("Data Check:", JSON.stringify(user));


  //   this.clientService.addClient(user).subscribe((data) => {
	 //      if(data.success) {
	 //        this.flashMessage.show('New Client Added', {cssClass: 'alert-success', timeout: 3000});
	 //        // this.router.navigate(['/profile']);
	 //      } else {
	 //         this.flashMessage.show('Something happened, check logs', {cssClass: 'alert-danger', timeout: 3000});
	 //      }
	 // })

  }

}

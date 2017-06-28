import { Component, OnInit } from '@angular/core';
import { ReportService} from '../../services/report.service';
import { UserService} from '../../services/user.service';
import * as moment from 'moment';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  data: any = null;

  constructor(private reportService: ReportService, private userService: UserService) { }

  ngOnInit() {
  	let currentDate = moment();
	  let fromDate = currentDate.clone().startOf('isoWeek');
    let toDate = currentDate.clone().endOf('isoWeek');
    let dateText = fromDate.format('DD-MMM-YYYY') + ' to '+ toDate.format('DD-MMM-YYYY');

    let currentUser = JSON.parse(localStorage.getItem('user'));

  	this.userService.getBdms().subscribe((data) => {
      let bdmEmails = data.map((d) => d.email);
      let filter = {
	    bdm: bdmEmails,
	    isr: [ currentUser.email ],
	    fromDate,
	    toDate,
	    groupBy: "day"
	  };

      this.reportService.getCallsReportForISR(filter).subscribe(
        data => {
          this.data = {
          	items: data,
          	filter: {
          		fromDate,
			    toDate,
			    type: { groupBy: "day" }
          	}

          }
        },
        err => {
          console.log(err);
        }
      );
    });

	
  }

}

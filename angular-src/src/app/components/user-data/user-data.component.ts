import { Component, Input, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { AuthService } from '../../services/auth.service'
import { ReportService} from '../../services/report.service';

@Component({
  selector: 'app-user-data',
  templateUrl: './user-data.component.html',
  styleUrls: ['./user-data.component.css']
})
export class UserDataComponent implements OnInit {

  private filterDates: any;
  private selectedBdm: any;
  private bdmSelected: any;
  private isrSelected: any;
  private bdms: Array<any> = [];
  private isrs: Array<any> = [];
  private data = null;

  constructor(private authService: AuthService, private reportService: ReportService, private userService: UserService) { }

  ngOnInit() {
    let currentUser = JSON.parse(localStorage.getItem('user'));

    this.userService.getBdms().subscribe((data) => {
      this.bdms = data;
      if(currentUser.role === 'isr'){
        this.bdmSelected = this.bdms[0];
      }else{
        this.bdmSelected = currentUser;
      }
      this.fetchData();
    });
    this.userService.getIsrs().subscribe((data) => {
      this.isrs = data;
      if(currentUser.role === 'isr'){
        this.isrSelected = currentUser;
      }else{
        this.isrSelected = this.isrs[0];
      }
      this.fetchData();
    });
  }

  bdmSelection(event){
    this.bdmSelected = event;
    this.fetchData();
  }

  isrSelection(event){
    this.isrSelected = event;
    this.fetchData();
  }

  ngOnChanges(){}

  sendDates(event) {
    this.filterDates = event;
    this.fetchData();
  }

  fetchData(){
    if(this.filterDates.fromDate &&  this.filterDates.toDate && this.bdmSelected && this.isrSelected ){

      let filter = {
        bdm: [ this.bdmSelected.email ],
        isr: [ this.isrSelected.email ],
        fromDate: this.filterDates.fromDate,
        toDate: this.filterDates.toDate,
        groupBy: this.filterDates.type.groupBy
      }

      this.reportService.getCallsReportForISR(filter).subscribe(
        data => {
          this.data = { 
            items: data,
            filter: this.filterDates
          };
        },
        err => {
          console.log(err);
        }
      );
    }

    
  }

}

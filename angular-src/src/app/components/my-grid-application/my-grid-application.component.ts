import { Component, OnInit } from '@angular/core';
import { GridOptions } from 'ag-grid';
import { RedComponentComponent } from '../red-component/red-component.component';
import { DashboardService } from '../../services/dashboard.service';
import { FlashMessagesService} from 'angular2-flash-messages';

@Component({
  selector: 'app-my-grid-application',
  templateUrl: './my-grid-application.component.html',
  styleUrls: ['./my-grid-application.component.css']
})
export class MyGridApplicationComponent implements OnInit {

  private gridOptions: GridOptions;

    constructor(private dashboardService: DashboardService) {
        this.gridOptions = {};
        // this.gridOptions.columnDefs = [
        //     {
        //         headerName: "ID",
        //         field: "id",
        //         width: 100
        //     },
        //     {
        //         headerName: "Value",
        //         field: "value",
        //         cellRendererFramework: RedComponentComponent,
        //         width: 100
        //     },
        // ];

        this.gridOptions.columnDefs = [
            {
                headerName: "First Name",
                field: "firstName",
                width: 200,
                sort: 'asc',
                filter: 'text'
            },
             {
                headerName: "Last Name",
                field: "lastName",
                width: 200,
                filter: 'text',
                getQuickFilterText: function(params) {
                    return params.value.name;
                }
            },
             {
                headerName: "Title",
                field: "title",
                width: 200,
                filter: 'text'
            },
            {
                headerName: "Email",
                field: "email",
                width: 200
            },
             {
                headerName: "phone",
                field: "phone",
                width: 200,

            },
            {
                headerName: "company",
                field: "company",               
                width: 200
            },
            {
                headerName: "Supervisor Name",
                field: "supervisor",
                width: 200
            },
            
             {
                headerName: "ManagementLevel",
                field: "managementLevel",
                width: 200
            },
             {
                headerName: "Etouch SL",
                field: "etouchSl",
                width: 200
            }
        ];
        // setting up features for grid
        this.gridOptions.enableSorting = true;
        this.gridOptions.enableFilter = true;
        this.gridOptions.enableColResize = true;
        //this.gridOptions.quickFilterText = true;
        this.gridOptions.rowData = [];
        this.getSalesData();       
    }

  ngOnInit() {
  }

  getSalesData() {

     this.dashboardService.getSalesData().subscribe( data => {
        // console.log('got data from service');
        // console.log(data);
        this.gridOptions.api.setRowData(data);
        //this.gridOptions.rowData = data;
      });

  }

  // quick filter 
  onFilterChange(event) {
    console.log('ggg'+event.target.value);
    // this.values +=  this.values += event.target.value + ' | '; + ' | ';
    this.gridOptions.api.setQuickFilter(event.target.value);
  }

  onPrintQuickFilterTexts() {
    // this.gridOptions.api.forEachNode((rowNode, index)=> {
    //     console.log('Row ' + index + ' quick filter text is ' + rowNode.quickFilterAggregateText);
    // });
}

  firstName: String;
  lastName: String;
  title: String;
  email: String
  phone: String;
  company: String;
  supervisor: String;
  managementLevel: String;
  etouchSl: String;

  onMemberSubmit() {
    console.log("member Submit");
    const user = {
          firstName: this.firstName,
          lastName: this.lastName,
          title: this.title,
          email: this.email,
          phone: this.phone,
          company: this.company,
          supervisor: this.supervisor,
          managementLevel: this.managementLevel,
          etouchSl: this.etouchSl
    };

    // if(!this.validateService.validateRegister(user)) {
    //   console.log('Please fill all fields');
    //   this.flashMessage.show('Please fill all fields', {cssClass: 'alert-danger', timeout: 3000});
    //   return false;
    // }

    //  if(!this.validateService.validateEmail(user.email)) {
    //   console.log('Please user valid email');
    //   this.flashMessage.show('Please user valid email', {cssClass: 'alert-danger', timeout: 3000});
    //   return false;
    // }

    // Get User
    this.dashboardService.updateProfile(user).subscribe( (data) => {
      if(data.success) {
        // this.flashMessage.show('You are registered and can log in', {cssClass: 'alert-success', timeout: 3000});
        // this.router.navigate(['/login']);
      } else {
        // this.flashMessage.show('Something happened, check logs', {cssClass: 'alert-danger', timeout: 3000});
        // this.router.navigate(['/register']);
      }
    })

  }

}

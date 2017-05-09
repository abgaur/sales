import { Component, OnInit } from '@angular/core';
import { GridOptions } from 'ag-grid';
import { RedComponentComponent } from '../red-component/red-component.component';
import { EditTaskComponent } from '../edit-task/edit-task.component';
import { FlashMessagesService} from 'angular2-flash-messages';
import { DashboardService } from '../../services/dashboard.service'
import { CompleterService, CompleterData, CompleterItem} from 'ng2-completer';
import { PopupComponent } from '../popup/popup.component';
import { Observable } from "rxjs/Rx";
import { ClientService } from '../../services/client.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-my-grid-application',
  templateUrl: './my-grid-application.component.html',
  styleUrls: ['./my-grid-application.component.css']
})
export class MyGridApplicationComponent implements OnInit {

    private gridOptions: GridOptions;
    private isrName: string;
   
    private searchStr: string;
    private dataService: CompleterData;
    private selectedClient: any;


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

    constructor(private dashboardService: DashboardService,
        private flashMessage: FlashMessagesService,
        private completerService: CompleterService,
        private clientService: ClientService,
        private userService: UserService
    ) {
        var self = this;

        this.userService.getUsers().subscribe( data => {
            console.dir(data);
            self.dataService =  completerService.local(data, "name", "name").descriptionField("email");
        });
    
        this.gridOptions = {};
        this.gridOptions = <GridOptions>{
            context: {
                componentParent: this
            }
        };
        this.gridOptions.columnDefs = [
            {
                headerName: "Actions",
                width: 150,
                field: "_id",
                cellRendererFramework: EditTaskComponent,
                headerCheckboxSelection: true,
                headerCheckboxSelectionFilteredOnly: true,
                checkboxSelection: true
                //cellRenderer: this.createEditButton;
            },

            {
                headerName: "First Name",
                field: "firstName",
                width: 100,
                sort: 'asc',
                filter: 'text',
                // headerCheckboxSelection: true,
                // headerCheckboxSelectionFilteredOnly: true,
                // checkboxSelection: true
            },
             {
                headerName: "Last Name",
                field: "lastName",
                width: 100,
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
                headerName: "Assigned To",
                field: "assignedTo",
                width: 120,
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
                width: 100
            }
        ];
        // setting up features for grid
        this.gridOptions.enableSorting = true;
        this.gridOptions.rowHeight =30
        this.gridOptions.enableFilter = true;
        this.gridOptions.enableColResize = true;
        this.gridOptions.rowSelection = 'multiple';
        this.gridOptions.suppressRowClickSelection = true;
        //this.gridOptions.defaultColDef.checkboxSelection = this.isfirstColumn;
        //this.gridOptions.quickFilterText = true;
        this.gridOptions.rowData = [];
        this.getSalesData();       
    }

  ngOnInit() {
  }

  isFirstColumn(params) {
        var displayedColumns = params.columnApi.getAllDisplayedColumns();
        var thisIsFirstColumn = displayedColumns[0] === params.column;
        return thisIsFirstColumn;
   }

   selectClient(id) {
       // this.selectedClient = id;   
       this.clientService.getDataById(id).subscribe((data) => {
        this.selectedClient = data;
        this.selectedClient.comments = [];
      });    
    }


  getSalesData() {
      console.log("get sales data");
     this.dashboardService.getSalesData().subscribe( data => {
        console.log('got data from service');
        this.gridOptions.api.setRowData(data);
    });

  }

  assignTo() {

    var assignToBody = {
        ids: [],
        assignTo: this.isrName
    };    
    assignToBody.ids = this.gridOptions.api.getSelectedNodes().map(function(rowNode) {return rowNode.data._id;});
    console.log(assignToBody);
    

    this.dashboardService.setAssignedTo(assignToBody).subscribe( (data) => {
      if(data.success) {
        this.flashMessage.show('Tasks are assigned', {cssClass: 'alert-success', timeout: 3000});
        this.getSalesData();
        
      } else {
        this.flashMessage.show('Something happened, check logs', {cssClass: 'alert-danger', timeout: 3000});
      }
    })
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

   console.log("Data Check:", user)

  }

  // quick filter 
  onFilterChange(event) {
    console.log('ggg'+event.target.value);
    // this.values +=  this.values += event.target.value + ' | '; + ' | ';
    this.gridOptions.api.setQuickFilter(event.target.value);
  }

  // using for testing, or now please dont delete
  onPrintQuickFilterTexts() {
    // this.gridOptions.api.forEachNode((rowNode, index)=> {
    //     console.log('Row ' + index + ' quick filter text is ' + rowNode.quickFilterAggregateText);
    // });
}

public onAssignSelected(selected: CompleterItem) {
    console.log(selected);
        if (selected) {
            this.isrName = selected.description;
        } else {
            this.isrName = "";
        }
    }


}

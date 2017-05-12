import { Component, OnInit } from '@angular/core';
import { GridOptions } from 'ag-grid';
import { RedComponentComponent } from '../red-component/red-component.component';
import { EditTaskComponent } from '../edit-task/edit-task.component';
import { FlashMessagesService} from 'angular2-flash-messages';
import { DashboardService } from '../../services/dashboard.service'
import { MyTasksService } from  '../../services/my-tasks.service';
import { PopupComponent } from '../popup/popup.component';
import { CompleterService, CompleterData, CompleterItem} from 'ng2-completer';
import { Observable } from "rxjs/Rx";
import { ClientService } from '../../services/client.service';
import { UserService } from '../../services/user.service';


@Component({
  selector: 'app-mytasks',
  templateUrl: './mytasks.component.html',
  styleUrls: ['./mytasks.component.css']
})
export class MytasksComponent implements OnInit {
  private gridOptions: GridOptions;
  private isrName: string;
 
  private searchStr: string;
  private dataService: CompleterData;
  private selectedClient: any;
  private bdmSelected: any;

    constructor(private dashboardService: DashboardService,
        private flashMessage: FlashMessagesService,
        private completerService: CompleterService,
        private myTasksService: MyTasksService,
        private clientService: ClientService,
        private userService: UserService
    ) {
        var self = this;

        this.userService.getUsers().subscribe( data => {
            
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
                
            },

            {
                headerName: "First Name",
                field: "firstName",
                width: 100,
                sort: 'asc',
                filter: 'text'                
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
                headerName: "BDM",
                field: "bdm.name",
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
        this.gridOptions.rowData = [];
        this.getMyTasks();       
    }

  ngOnInit() {
  } 

  selectClient(id) {

       // this.selectedClient = id;   
       this.clientService.getDataById(id).subscribe((data) => {
       this.selectedClient = data;
       this.selectedClient.comments = [];
      });    
   }


  getMyTasks() {
    this.myTasksService.getMyTasks().subscribe( data => {
        this.gridOptions.api.setRowData(data);
    });
  }

  assignTo() {

    var assignToBody = {
        ids: [],
        assignTo: this.isrName
    };    
    assignToBody.ids = this.gridOptions.api.getSelectedNodes().map(function(rowNode) {return rowNode.data._id;});
    
    this.dashboardService.setAssignedTo(assignToBody).subscribe( (data) => {
      if(data.success) {
        this.flashMessage.show('Tasks are assigned', {cssClass: 'alert-success', timeout: 3000});
        this.getMyTasks();
      } else {
        this.flashMessage.show('Something happened, check logs', {cssClass: 'alert-danger', timeout: 3000});
      }
    })
  }

  // quick filter 
  onFilterChange(event) {
    // this.values +=  this.values += event.target.value + ' | '; + ' | ';
    this.gridOptions.api.setQuickFilter(event.target.value);
  }

  // using for testing, or now please dont delete
  onPrintQuickFilterTexts() {
    // this.gridOptions.api.forEachNode((rowNode, index)=> {
    
    // });
    }

    public onAssignSelected(selected: CompleterItem) {
        
        if (selected) {
            this.isrName = selected.description;
        } else {
            this.isrName = "";
        }
    }
 
    bdmSelection(bdm) {
        this.bdmSelected = bdm;
    }

    assignToBdm() {
        if(!this.bdmSelected) {
            this.flashMessage.show('Please select BDM to Assign Clients', {cssClass: 'alert-danger', timeout: 4000});
            return false;
        }
        var assignToBdmBody = {
            ids: [],
            bdm: this.bdmSelected
        };    
        assignToBdmBody.ids = this.gridOptions.api.getSelectedNodes().map(function(rowNode) {return rowNode.data._id;});
        
        if(assignToBdmBody.ids!==null && assignToBdmBody.ids.length>0) {
            this.myTasksService.assignToBdm(assignToBdmBody).subscribe( (data) => {
                if(data.success) {
                    this.flashMessage.show('Tasks are assigned', {cssClass: 'alert-success', timeout: 3000});
                    this.getMyTasks();
                } else {
                    this.flashMessage.show('Something happened, please try again', {cssClass: 'alert-danger', timeout: 3000});
                }
            })        
        } else {
            this.flashMessage.show('Please select atleast one Client', {cssClass: 'alert-danger', timeout: 4000});
        }
       

    }





}

import { Component, OnInit, OnChanges, Input, Output, EventEmitter } from '@angular/core';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-bdm-filter',
  templateUrl: './bdm-filter.component.html',
  styleUrls: ['./bdm-filter.component.css']
})
export class BdmFilterComponent implements OnInit {
  bdms: Array<any> = [];
  @Input() cssClass: String = '';
  @Input() showAllOption: Boolean = false;
  @Input() selectedItem: any = null;
  @Input() items: Array<any> = [];
  @Output() changed: EventEmitter<any> = new EventEmitter<any>();

  constructor(private userService: UserService) { }

  ngOnInit() {
  	/*this.userService.getBdms().subscribe((data) => {
  		this.items = data;
  		if(this.showAllOption) this.bdms.unshift({ name: "All", email: 'All' });
  		this.ngOnChanges();
  	});*/
  }

  ngOnChanges() {
  	if(this.selectedItem && this.items.length > 0){
		    this.selectedItem = this.items.filter(item => item.email === this.selectedItem.email)[0];
    }
    
    if(this.showAllOption && this.items[0] && this.items[0].name !== "All"){
        this.items.unshift({ name: "All" });
    }
  }

  itemSelected() {
  	if(this.selectedItem){
  		this.changed.emit(this.selectedItem);
  	}
  }
}

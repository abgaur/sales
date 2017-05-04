import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BdmFilterComponent } from './bdm-filter.component';

describe('BdmFilterComponent', () => {
  let component: BdmFilterComponent;
  let fixture: ComponentFixture<BdmFilterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BdmFilterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BdmFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

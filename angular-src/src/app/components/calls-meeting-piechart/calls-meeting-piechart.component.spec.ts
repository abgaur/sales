import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CallsMeetingPiechartComponent } from './calls-meeting-piechart.component';

describe('CallsMeetingPiechartComponent', () => {
  let component: CallsMeetingPiechartComponent;
  let fixture: ComponentFixture<CallsMeetingPiechartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CallsMeetingPiechartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CallsMeetingPiechartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

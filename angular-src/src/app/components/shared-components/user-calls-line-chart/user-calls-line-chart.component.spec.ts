import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserCallsLineChartComponent } from './user-calls-line-chart.component';

describe('UserCallsLineChartComponent', () => {
  let component: UserCallsLineChartComponent;
  let fixture: ComponentFixture<UserCallsLineChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserCallsLineChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserCallsLineChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

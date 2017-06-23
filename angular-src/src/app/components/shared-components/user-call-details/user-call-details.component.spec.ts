import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserCallDetailsComponent } from './user-call-details.component';

describe('UserCallDetailsComponent', () => {
  let component: UserCallDetailsComponent;
  let fixture: ComponentFixture<UserCallDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserCallDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserCallDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

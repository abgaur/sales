import { TestBed, inject } from '@angular/core/testing';

import { MyTasksService } from './my-tasks.service';

describe('MyTasksService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MyTasksService]
    });
  });

  it('should ...', inject([MyTasksService], (service: MyTasksService) => {
    expect(service).toBeTruthy();
  }));
});

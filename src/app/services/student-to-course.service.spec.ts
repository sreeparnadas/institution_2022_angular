import { TestBed } from '@angular/core/testing';

import { StudentToCourseService } from './student-to-course.service';

describe('StudentToCourseService', () => {
  let service: StudentToCourseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StudentToCourseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

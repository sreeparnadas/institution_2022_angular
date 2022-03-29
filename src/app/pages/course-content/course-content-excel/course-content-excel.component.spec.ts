import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseContentExcelComponent } from './course-content-excel.component';

describe('CourseContentExcelComponent', () => {
  let component: CourseContentExcelComponent;
  let fixture: ComponentFixture<CourseContentExcelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CourseContentExcelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CourseContentExcelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

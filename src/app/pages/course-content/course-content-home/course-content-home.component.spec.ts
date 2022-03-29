import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseContentHomeComponent } from './course-content-home.component';

describe('CourseContentHomeComponent', () => {
  let component: CourseContentHomeComponent;
  let fixture: ComponentFixture<CourseContentHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CourseContentHomeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CourseContentHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

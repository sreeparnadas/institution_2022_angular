import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExcelDateFunctionComponent } from './excel-date-function.component';

describe('ExcelDateFunctionComponent', () => {
  let component: ExcelDateFunctionComponent;
  let fixture: ComponentFixture<ExcelDateFunctionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExcelDateFunctionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExcelDateFunctionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

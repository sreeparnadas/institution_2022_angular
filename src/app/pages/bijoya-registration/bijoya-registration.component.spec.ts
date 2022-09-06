import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BijoyaRegistrationComponent } from './bijoya-registration.component';

describe('BijoyaRegistrationComponent', () => {
  let component: BijoyaRegistrationComponent;
  let fixture: ComponentFixture<BijoyaRegistrationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BijoyaRegistrationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BijoyaRegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

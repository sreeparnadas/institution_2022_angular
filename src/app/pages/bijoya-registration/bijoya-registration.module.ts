import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BijoyaRegistrationRoutingModule } from './bijoya-registration-routing.module';
import { BijoyaRegistrationComponent } from './bijoya-registration.component';


@NgModule({
  declarations: [
    BijoyaRegistrationComponent
  ],
  imports: [
    CommonModule,
    BijoyaRegistrationRoutingModule
  ]
})
export class BijoyaRegistrationModule { }

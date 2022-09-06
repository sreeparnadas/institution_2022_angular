import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BijoyaRegistrationRoutingModule } from './bijoya-registration-routing.module';
import { BijoyaRegistrationComponent } from './bijoya-registration.component';

import {FocusTrapModule} from 'primeng/focustrap';
import {StyleClassModule} from 'primeng/styleclass';


@NgModule({
  declarations: [
    BijoyaRegistrationComponent
  ],
  imports: [
    CommonModule,
    BijoyaRegistrationRoutingModule,

    FocusTrapModule,
    StyleClassModule
  ]
})
export class BijoyaRegistrationModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BijoyaRegistrationRoutingModule } from './bijoya-registration-routing.module';
import { BijoyaRegistrationComponent } from './bijoya-registration.component';

import {FocusTrapModule} from 'primeng/focustrap';
import {StyleClassModule} from 'primeng/styleclass';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIcon, MatIconModule } from '@angular/material/icon';



@NgModule({
  declarations: [
    BijoyaRegistrationComponent
  ],
  imports: [
    CommonModule,
    BijoyaRegistrationRoutingModule,

    FocusTrapModule,
    StyleClassModule,

    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
  ]
})
export class BijoyaRegistrationModule { }

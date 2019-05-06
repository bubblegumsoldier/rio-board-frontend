// Angular
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

import { ProfileComponent } from './profile.component';


// Components Routing
import { SettingsRoutingModule } from './settings-routing.module';
import { PaymentComponent } from './payment.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    SettingsRoutingModule,
  ],
  declarations: [
    ProfileComponent,
    PaymentComponent
  ]
})
export class SettingsModule { }

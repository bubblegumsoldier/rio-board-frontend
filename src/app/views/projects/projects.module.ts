// Angular
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

import { ProjectComponent } from './project.component';
import { NewProjectComponent } from './new-project.component';

import { TooltipModule } from 'ngx-bootstrap/tooltip';

// Components Routing
import { ProjectsRoutingModule } from './projects-routing.module';
import { GridsterModule } from 'angular-gridster2';
import { RouteReuseStrategy } from '@angular/router';
import { CustomReuseStrategy } from './customReuseStrategy';
import { AddComponentComponent } from './add-component.component';
import { PasswordShareComponent } from './password-share/password-share.component';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { SecretInputComponent } from './password-share/secret-input.component';
import { ClipboardModule } from 'ngx-clipboard';
import { PasswordShareLoginComponent } from './password-share/password-share-login.component';



@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ProjectsRoutingModule,
    GridsterModule,
    TooltipModule.forRoot(),
    TabsModule,
    ClipboardModule
  ],
  declarations: [
    ProjectComponent,
    NewProjectComponent,
    AddComponentComponent,
    PasswordShareComponent,
    SecretInputComponent,
    PasswordShareLoginComponent
  ],
  providers: [
    {provide: RouteReuseStrategy, useClass: CustomReuseStrategy}
  ]
})
export class ProjectsModule { }

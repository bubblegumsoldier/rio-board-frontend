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

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ProjectsRoutingModule,
    GridsterModule,
    TooltipModule.forRoot()
  ],
  declarations: [
    ProjectComponent,
    NewProjectComponent,
    AddComponentComponent
  ],
  providers: [
    {provide: RouteReuseStrategy, useClass: CustomReuseStrategy}
  ]
})
export class ProjectsModule { }

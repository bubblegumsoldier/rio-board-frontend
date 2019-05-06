// Angular
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

import { ProjectComponent } from './project.component';
import { NewProjectComponent } from './new-project.component';


// Components Routing
import { ProjectsRoutingModule } from './projects-routing.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ProjectsRoutingModule,
  ],
  declarations: [
    ProjectComponent,
    NewProjectComponent
  ]
})
export class ProjectsModule { }

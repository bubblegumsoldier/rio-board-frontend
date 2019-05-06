import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NewProjectComponent } from './new-project.component';
import { ProjectComponent } from './project.component';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Projects'
    },
    children: [
      {
        path: '',
        redirectTo: 'new'
      },
      {
        path: 'new',
        component: NewProjectComponent,
        data: {
          title: 'New'
        }
      },
      {
        path: ':projectId',
        component: ProjectComponent,
        data: {
          title: 'Project'
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProjectsRoutingModule {}

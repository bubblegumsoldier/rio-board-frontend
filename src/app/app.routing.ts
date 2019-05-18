import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Import Containers
import { DefaultLayoutComponent } from './containers';

import { P404Component } from './views/error/404.component';
import { P500Component } from './views/error/500.component';
import { LoginComponent } from './views/login/login.component';
import { RegisterComponent } from './views/register/register.component';
import { AuthGuard } from './guards/auth.guard';
import { AntiAuthGuard } from './guards/anti-auth.guard';
import { ExternalLayoutComponent } from './containers/external-layout';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  },
  {
    path: 'ext',
    component: ExternalLayoutComponent,
    data: {
      title: 'Home'
    },
    children: [
      {
        path: 'projects',
        loadChildren: './views/projects/projects.module#ProjectsModule'
      }
    ]
  },
  {
    path: '404',
    component: P404Component,
    data: {
      title: 'Page 404'
    }
  },
  {
    path: '500',
    component: P500Component,
    data: {
      title: 'Page 500'
    }
  },
  {
    path: 'login',
    component: LoginComponent,
    data: {
      title: 'Login Page'
    },
    canActivate: [AntiAuthGuard]
  },
  {
    path: 'register',
    component: RegisterComponent,
    data: {
      title: 'Register Page'
    },
    canActivate: [AntiAuthGuard]
  },
  {
    path: '',
    component: DefaultLayoutComponent,
    data: {
      title: 'Home'
    },
    canActivate: [AuthGuard],
    children: [
      {
        path: 'dashboard',
        loadChildren: './views/dashboard/dashboard.module#DashboardModule'
      },
      {
        path: 'settings',
        loadChildren: './views/settings/settings.module#SettingsModule'
      },
      {
        path: 'projects',
        loadChildren: './views/projects/projects.module#ProjectsModule'
      }
    ]
  },
  { path: '**', component: P404Component }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes, {paramsInheritanceStrategy: "always"}) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}

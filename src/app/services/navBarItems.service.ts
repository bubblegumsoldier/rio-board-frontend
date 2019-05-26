import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserService } from './user.service';
import { NavData } from '../_nav';
import { Project } from '../models/Project';
import { ProjectsService } from './projects.service';

@Injectable({ providedIn: 'root' })
export class NavBarItemsService {
    private projectsItem :NavData = {name: "Projects", url: "/projects", icon: "fa fa-cubes"};
    public navItems: NavData[] = [
      {
        title: true,
        name: 'Project Management'
      },
      {
        name: 'Dashboard',
        url: '/dashboard',
        icon: 'icon-speedometer'
      },
      this.projectsItem,
      {
        title: true,
        name: 'Settings'
      },
      {
        name: 'Settings',
        url: '/settings',
        icon: 'fa fa-cog',
        children: [
          {
            name: 'Profile',
            url: '/settings/profile',
            icon: 'icon-user'
          },
          {
            name: 'Billing',
            url: '/settings/payment',
            icon: 'fa fa-dollar'
          }
        ]
      },
      {
        name: "Legal",
        icon: 'fa fa-balance-scale',
        children: [
          {
            name: "Terms of Service",
            url: "https://project-sheets.com/terms-of-service",
            icon: "fa fa-external-link"
          },
          {
            name: "Data Protection",
            url: "https://project-sheets.com/data-protection",
            icon: "fa fa-external-link"
          },
          {
            name: "Impressum",
            url: "https://project-sheets.com/impressum",
            icon: "fa fa-external-link"
          }
        ]
      }
    ];

    constructor(private http :HttpClient, private user :UserService, private projects :ProjectsService)
    {
      this.projects.updatedProjects.subscribe(() => {this.sync()});
    }

    public sync()
    {
      this.projects.getProjects().then((allProjects) => {
            this.projectsItem.children = [];
            allProjects.forEach(element => {
                console.log(element);
                this.projectsItem.children.push({
                    name: element.name,
                    url: '/projects/' + element.id,
                    icon: 'fa fa-cube'
                });
            });
            this.projectsItem.children.push({
              name: "Add New Project",
              url: "/projects/new",
              icon: "fa fa-plus"
            });
            console.log(this.projectsItem.children);
        }).catch(e => {console.log(e)});
    }
}

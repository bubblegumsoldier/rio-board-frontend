import { Component, OnInit } from '@angular/core';
import { ProjectsService } from '../../services/projects.service';
import { Project } from '../../models/Project';
@Component({
  templateUrl: 'dashboard.component.html',
  styleUrls: ['./dashboard.component.sass']
})
export class DashboardComponent implements OnInit {

  projects :Project[] = [];

  constructor(private projectsService :ProjectsService)
  {

  }

  ngOnInit(): void {
    this.projectsService.getProjects().then((projects: Project[]) => {
      this.projects = projects;
    }).catch(e => {
      console.log(e);
    })
  }
}

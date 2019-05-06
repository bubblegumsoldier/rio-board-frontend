import { Component, OnInit } from '@angular/core';
import { Project } from '../../models/Project';
import { ProjectsService } from '../../services/projects.service';
import { Router } from '@angular/router';

@Component({
  templateUrl: 'new-project.component.html'
})
export class NewProjectComponent implements OnInit {

  project :Project = new Project();

  error :string = "";
  success :string = "";
  loading :boolean = false;

  constructor(private projects :ProjectsService, private router :Router) {
    this.project.name = "Project-Name";
  }

  ngOnInit()
  {

  }

  submit()
  {
    if(this.project.name.length <= 0)
    {
      this.error = "Project Name must not be empty.";
      return;
    }
    this.projects.createProject(this.project).then((success) => {
      console.log(success);
      this.router.navigate(['/projects', success.id]);
    }).catch((error) => {
      this.error = error.message;
    })
  }
}

import { Component, OnInit } from '@angular/core';

import {ActivatedRoute} from '@angular/router';

import { GridsterConfig, GridsterItem }  from 'angular-gridster2';
import { Project } from '../../models/Project';
import { ProjectService } from '../../services/project.service';



@Component({
  templateUrl: 'project.component.html'
})
export class ProjectComponent implements OnInit {

  options: GridsterConfig;
  dashboard: Array<GridsterItem>;

  projectId :number;

  project :Project;

  constructor(private route :ActivatedRoute, private projectService :ProjectService) {
    // this.route.params.subscribe(params => {
    //   this.ngOnInit();
    // });
  }

  ngOnInit() {
    let projectId :number = parseInt(this.route.snapshot.paramMap.get("projectId"));
      console.log(projectId);
      this.projectService.getProject(projectId).then(project => {
        this.project = project;
      });
  }

  componentAdded()
  {
    this.ngOnInit();
  }
}

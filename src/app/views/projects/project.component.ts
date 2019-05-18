import { Component, OnInit } from '@angular/core';

import {ActivatedRoute} from '@angular/router';

import { GridsterConfig, GridsterItem }  from 'angular-gridster2';
import { Project } from '../../models/Project';
import { ProjectService } from '../../services/project.service';
import { ExternalAccessService } from '../../services/externalAccess.service';



@Component({
  templateUrl: 'project.component.html'
})
export class ProjectComponent implements OnInit {

  options: GridsterConfig;
  dashboard: Array<GridsterItem>;

  projectId :number;

  project :Project;
  authenticationService: any;

  mode :string = "read";

  constructor(private route :ActivatedRoute, private projectService :ProjectService, private externalAccessService :ExternalAccessService) {
    this.route.params.subscribe(params => {
      this.project = null;
      setTimeout(_ => {
        this.ngOnInit();
      }, 100);
    });
  }

  ngOnInit() {
    let projectId :number = parseInt(this.route.snapshot.paramMap.get("projectId"));
      console.log(projectId);
      this.projectService.getProject(projectId).then(project => {
        this.project = project;
      });
    if(this.externalAccessService.givenProjectSecurityToken)
    {
      if(this.project.publicAccess === 0)
      {
        //security error?!
        //reset project!
        this.project = new Project();
      }else if(this.project.publicAccess === 1)
      {
        this.mode = "read";
      }else if(this.project.publicAccess === 2)
      {
        this.mode = "write";
      }
    }else
    {
      this.mode = "write";
    }
  }

  componentAdded()
  {
    this.ngOnInit();
  }
}

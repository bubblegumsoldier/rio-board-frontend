import { Component, OnInit } from '@angular/core';

import {ActivatedRoute} from '@angular/router';

@Component({
  templateUrl: 'project.component.html'
})
export class ProjectComponent implements OnInit {

  projectId :number;

  constructor(private route :ActivatedRoute) {

  }

  ngOnInit()
  {
    this.projectId = this.route.snapshot.params['projectId'];
  }

  submit()
  {

  }
}

import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { Project } from '../../../models/Project';
import { SimpleLink } from '../../../models/SimpleLink';
import { LinkShareComponentService } from '../../../services/linkShareComponent.service';
import { ModalDirective } from 'ngx-bootstrap/modal';

@Component({
  templateUrl: 'progress.component.html',
  selector:"app-progress",
  styleUrls: ['./progress.component.sass']
})
export class ProgressComponent implements OnInit {

    @Input() mode = "write";
    _project :Project;
    @ViewChild('warningModal') public warningModal: ModalDirective;

    @Input()
    public set project(project :Project)
    {
        this._project = project;
        this.lastSavedState = JSON.parse(JSON.stringify(project.progressComponent));
        this.selectedStage = project.progressComponent.progress;
    }

    public get project() :Project
    {
        return this._project;
    }

    lastSavedState = null;
    currentMode = 0;

    selectedStage :number = 0;


    constructor(private linkShareComponentService :LinkShareComponentService)
    {

    }

    active = 0;

    loading :boolean = false;

    error :string = "";

    startWriteMode()
    {
      this.lastSavedState = JSON.parse(JSON.stringify(this.project.progressComponent));
      this.currentMode = 1;
    }

    ngOnInit(): void {

    }

    get mayWrite()
    {
        return this.mode === "write";
    }

    save()
    {

    }

    onUpdate()
    {

    }

    onSaved()
    {
      this.currentMode = 0;
      this.selectedStage = this.project.progressComponent.progress;
    }

    onCancel()
    {
      this.currentMode = 0;
      this.project.progressComponent = this.lastSavedState;
      this.selectedStage = this.project.progressComponent.progress;
    }

    hideComponent()
    {

    }
}

import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { Project } from '../../../models/Project';
import { SimpleLink } from '../../../models/SimpleLink';
import { ProgressComponentService } from '../../../services/progressComponent.service';
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


    constructor(private progressComponentService :ProgressComponentService)
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
      this.progressComponentService.updateProgress(this.project).then(_ => {
      }).catch(e => {
        console.log(e);
      });
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
        console.log("hide!");
        this.warningModal.hide();
        this.project.progressComponent.active = false;
        this.onUpdate();
        console.log("update could still be called");
    }
}

import { Component, OnInit, Input, ViewChild, Output, EventEmitter } from '@angular/core';
import { Project } from '../../../models/Project';
import { ProgressComponent } from '../../../models/ProgressComponent';
import { ProgressItem } from '../../../models/ProgressItem';

import * as BalloonEditor from '@ckeditor/ckeditor5-build-balloon';
import { ChangeEvent } from '@ckeditor/ckeditor5-angular/ckeditor.component';
import { ProgressComponentService } from '../../../services/progressComponent.service';

@Component({
  templateUrl: 'edit-progress.component.html',
  selector:"app-edit-progress"
})
export class EditProgressComponent implements OnInit {

  _progressComponent :ProgressComponent;

  public Editor = BalloonEditor;

  @Output() onCancel :EventEmitter<void> = new EventEmitter<void>();
  @Output() onSaved :EventEmitter<void> = new EventEmitter<void>();

  @Input() project :Project;

  error :string = "";

  defaultDescription :string = "<p>Put your phase description here and inform your customer about what is happening right now.</p><p>You can also add some <b>next steps</b> like so:</p><ul><li>First next step</li><li>Second next step</li><li>and so on...</li></ul><p><b>Have fun!</b></p>";

  constructor(private progressComponentService :ProgressComponentService)
  {

  }

  @Input()
  set progressComponent(progressComponent :ProgressComponent)
  {
    this._progressComponent = progressComponent;
    if(!progressComponent.progressItems || progressComponent.progressItems.length <= 0)
    {
      this.onTabAdd();
    }
  }

  get progressComponent() :ProgressComponent
  {
    return this._progressComponent;
  }

  ngOnInit()
  {

  }

  onTabAdd()
  {
    let progressItem :ProgressItem = new ProgressItem("Phase " + (this.progressComponent.progressItems.length + 1));
    progressItem.description = this.defaultDescription;
    this.progressComponent.progressItems.push(progressItem);
  }

  onRemove(i :number)
  {
    this.progressComponent.progressItems.splice(i, 1);
  }

  setProgress(i :number)
  {
    this.progressComponent.progress = i;
  }

  cancel()
  {
    this.onCancel.emit();
  }

  save()
  {
    this.error = "";
    this.progressComponentService.updateProgress(this.project).then(_ => {
      this.onSaved.emit();
    }).catch(e => {
      this.error = "Something went wrong while saving. Please try again later.";
      console.log(e);
    });
  }

  descriptionChanged(i, { editor }: ChangeEvent)
  {
    this.progressComponent.progressItems[i].description = editor.getData();
  }

}

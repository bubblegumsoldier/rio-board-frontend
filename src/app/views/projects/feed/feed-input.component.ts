import { Component, OnInit, Input, ViewChild, ViewEncapsulation, Output, EventEmitter } from '@angular/core';
import { Project } from '../../../models/Project';
import { FeedMessage } from '../../../models/FeedMessage';
import { LinkShareComponentService } from '../../../services/linkShareComponent.service';
import { ModalDirective } from 'ngx-bootstrap/modal';

import * as BalloonEditor from '@ckeditor/ckeditor5-build-balloon';
import { ChangeEvent } from '@ckeditor/ckeditor5-angular/ckeditor.component';

import { AppLitteralsConfig } from '../../../helpers/app-litterals'

@Component({
  templateUrl: 'feed-input.component.html',
  selector:"app-feed-input",
  styleUrls: ['./feed-input.component.sass'],
  encapsulation: ViewEncapsulation.None
})
export class FeedInputComponent implements OnInit {
  currentText :string = "";

  public Editor = BalloonEditor;

  public AppLitteralsConfig: any = AppLitteralsConfig;

  @Output() onSend :EventEmitter<FeedMessage> = new EventEmitter<FeedMessage>();

  public uploadedFiles: Array<any> = [];

  ngOnInit()
  {

  }

  onFileStackUploadComplete(file :any) {
    if (file.success) {
      this.uploadedFiles.push(file.data);
    }
    console.log(this.uploadedFiles);
  }

  onSendClicked()
  {
    let feedMessage :FeedMessage = new FeedMessage();
    feedMessage.message = this.currentText;
    feedMessage.attachment = JSON.stringify(this.uploadedFiles);
    this.onSend.emit(feedMessage);
    this.currentText = "";
    this.uploadedFiles = [];
  }
}

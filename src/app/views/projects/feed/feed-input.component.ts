import { Component, OnInit, Input, ViewChild, ViewEncapsulation } from '@angular/core';
import { Project } from '../../../models/Project';
import { SimpleLink } from '../../../models/SimpleLink';
import { LinkShareComponentService } from '../../../services/linkShareComponent.service';
import { ModalDirective } from 'ngx-bootstrap/modal';

import * as BalloonEditor from '@ckeditor/ckeditor5-build-balloon';
import { ChangeEvent } from '@ckeditor/ckeditor5-angular/ckeditor.component';

@Component({
  templateUrl: 'feed-input.component.html',
  selector:"app-feed-input",
  styleUrls: ['./feed-input.component.sass'],
  encapsulation: ViewEncapsulation.None
})
export class FeedInputComponent implements OnInit {
  currentText :string = "";

  public Editor = BalloonEditor;

  descriptionChanged({ editor }: ChangeEvent)
  {
    this.currentText = editor.getData();
  }

  ngOnInit()
  {

  }
}

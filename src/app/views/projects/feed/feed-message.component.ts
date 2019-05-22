import { Component, OnInit, Input, ViewChild, ViewEncapsulation } from '@angular/core';
import { Project } from '../../../models/Project';
import { SimpleLink } from '../../../models/SimpleLink';
import { LinkShareComponentService } from '../../../services/linkShareComponent.service';
import { ModalDirective } from 'ngx-bootstrap/modal';

@Component({
  templateUrl: 'feed-message.component.html',
  selector:"app-feed-message",
  styleUrls: ['./feed-message.component.sass']
})
export class FeedMessage implements OnInit {

  @ViewChild('warningModal') public warningModal: ModalDirective;

  ngOnInit()
  {

  }
}

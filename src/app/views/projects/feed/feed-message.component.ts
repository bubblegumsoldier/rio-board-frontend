import { Component, OnInit, Input, ViewChild, ViewEncapsulation, Output, EventEmitter } from '@angular/core';
import { Project } from '../../../models/Project';
import { FeedMessage } from '../../../models/FeedMessage';
import { LinkShareComponentService } from '../../../services/linkShareComponent.service';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { UserIdToNameService } from '../../../services/userIdToName.service';


@Component({
  templateUrl: 'feed-message.component.html',
  selector:"app-feed-message",
  styleUrls: ['./feed-message.component.sass']
})
export class FeedMessageComponent implements OnInit {

  @Input() mode = "write";

  @Input() feedMessage :FeedMessage;

  @ViewChild('warningModal') public warningModal: ModalDirective;

  @Output() onDelete :EventEmitter<void> = new EventEmitter<void>();

  currentName :string = "(loading...)";

  constructor(private userIdToNameService :UserIdToNameService)
  {

  }

  ngOnInit()
  {
    this.userIdToNameService.getNameForUserId(this.feedMessage.userId).then(name => {
      this.currentName = name.firstName + " " + name.lastName;
    });
  }

  get mayWrite()
  {
    return this.mode == "write";
  }

  isImage(attachment) :boolean
  {
    return attachment.mimetype.toLowerCase().startsWith("image");
  }

  deleteMessage()
  {
    this.onDelete.emit();
  }

  get attachments()
  {
    let attachments = JSON.parse(this.feedMessage.attachment);
    if(attachments)
    {
      return attachments;
    }
    return []
  }
}

import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { FeedComponent } from '../../../models/FeedComponent';
import { FeedMessage } from '../../../models/FeedMessage';

import { UserIdToNameService } from '../../../services/userIdToName.service';

@Component({
  templateUrl: 'feed-preview.component.html',
  selector:"app-feed-preview",
  styleUrls: ['./feed-preview.component.sass']
})
export class FeedPreviewComponent implements OnInit {
  @Input() feedComponent :FeedComponent;

  currentName :string = "(loading...)";

  constructor(private userIdToNameService :UserIdToNameService)
  {

  }

  ngOnInit()
  {
    this.userIdToNameService.getNameForUserId(this.lastMessage.userId).then(name => {
      this.currentName = name.firstName + " " + name.lastName;
    });
  }

  get hasMessage() :boolean
  {
    return this.feedComponent.feedMessages && this.feedComponent.feedMessages.length > 0;
  }

  get lastMessage() :FeedMessage
  {
    let sortedMessages = this.feedComponent.feedMessages.slice(0).sort((first :FeedMessage, second :FeedMessage) => {
      let date1 = Date.parse(first.createdAt);
      let date2 = Date.parse(second.createdAt);
      return date1 < date2 ? 1 : -1;
    });
    return sortedMessages[0];
  }
}

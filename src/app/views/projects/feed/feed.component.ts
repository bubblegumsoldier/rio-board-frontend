import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { Project } from '../../../models/Project';
import { FeedComponentService } from '../../../services/feedComponent.service';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { FeedMessage } from '../../../models/FeedMessage';

@Component({
  templateUrl: 'feed.component.html',
  selector:"app-feed",
  styleUrls: ['./feed.component.sass']
})
export class FeedComponent implements OnInit {

    @Input() mode = "write";
    _project :Project;
    @ViewChild('warningModal') public warningModal: ModalDirective;

    @Input()
    public set project(project :Project)
    {
        this._project = project;
        this.updatePages();
    }

    public get project() :Project
    {
        return this._project;
    }

    currentPage :number = 0;
    pages :number = 0;
    maxPerPage :number = 5;

    constructor(private feedComponentService :FeedComponentService)
    {

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

    switchPage(i)
    {
      this.currentPage = i;
    }

    onUpdate()
    {
      this.feedComponentService.updateFeedComponent(this.project).then(_ => {

      }).catch(_ => {

      });
    }

    hideComponent()
    {
        console.log("hide!");
        this.warningModal.hide();
        this.project.feedComponent.active = false;
        this.onUpdate();
        console.log("update could still be called");
    }

    get pageArray()
    {
      return new Array(this.pages);
    }

    currentSortedMessages() :FeedMessage[]
    {
      let sortedMessages = this.project.feedComponent.feedMessages.slice(0).sort((first :FeedMessage, second :FeedMessage) => {
        let date1 = Date.parse(first.createdAt);
        let date2 = Date.parse(second.createdAt);
        return date1 < date2 ? 1 : -1;
      });
      let start = this.currentPage * this.maxPerPage;
      let end = Math.min(this.maxPerPage + start - 1, this.project.feedComponent.feedMessages.length-1);
      console.log(start, end);
      return sortedMessages.slice(start, end+1);
    }

    updatePages()
    {
      if(!this.project.feedComponent.feedMessages)
      {
        this.pages = 1;
        return;
      }
      this.pages = Math.ceil(this.project.feedComponent.feedMessages.length / this.maxPerPage);
    }

    onSend(msg :FeedMessage)
    {
      this.feedComponentService.addMessage(msg, this.project).then(_ => {
        this.feedComponentService.updateFeedComponentInProject(this.project);
      }).catch(e => {
        console.log(e);
      })
    }

    onDeleteMessage(i :number)
    {
      let feedMessage = this.currentSortedMessages()[i];
      this.feedComponentService.deleteMessage(feedMessage, this.project).then(_ => {
        this.feedComponentService.updateFeedComponentInProject(this.project);
      }).catch(e => {
        console.log(e);
      });
    }
}

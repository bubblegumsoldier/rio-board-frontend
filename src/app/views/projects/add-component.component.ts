import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Project } from '../../models/Project';
import { PasswordShareService } from '../../services/passwordShare.service';
import { LinkShareComponentService } from '../../services/linkShareComponent.service';
import { ProgressComponentService } from '../../services/progressComponent.service';
import { FeedComponentService } from '../../services/feedComponent.service';

@Component({
  templateUrl: 'add-component.component.html',
  selector:"app-add-component"
})
export class AddComponentComponent implements OnInit {
    @Input() project :Project;
    @Output() onComponentAdded :EventEmitter<void> = new EventEmitter<void>();

    constructor(
        private passwordShareService :PasswordShareService,
        private linkShareComponentService :LinkShareComponentService,
        private progressComponentService :ProgressComponentService,
        private feedComponentService :FeedComponentService
      )
     {

     }

    ngOnInit(): void {

    }

    onPasswordShareAdd()
    {
      this.project.passwordShareComponent = {
        active: true,
        encryptedText: "",
        password: ""
      }
      this.passwordShareService.addToProject(this.project).then(_ => {
        this.onComponentAdded.emit();
      }).catch(e => {
        console.log(e);
      });
    }

    onLinkShareAdd()
    {
      this.linkShareComponentService.addToProject(this.project).then(_ => {
        this.onComponentAdded.emit();
      }).catch(e => {
        console.log(e);
      });
    }

    onProgressAdd()
    {
      this.progressComponentService.addToProject(this.project).then(_ => {
        this.onComponentAdded.emit();
      }).catch(e => {
        console.log(e);
      });
    }

    onFeedAdd()
    {
      this.feedComponentService.addToProject(this.project).then(_ => {
        this.onComponentAdded.emit();
      }).catch(e => {
        console.log(e);
      });
    }

}

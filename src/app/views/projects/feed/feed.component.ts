import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { Project } from '../../../models/Project';
import { SimpleLink } from '../../../models/SimpleLink';
import { LinkShareComponentService } from '../../../services/linkShareComponent.service';
import { ModalDirective } from 'ngx-bootstrap/modal';

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
    }

    public get project() :Project
    {
        return this._project;
    }


    constructor(private linkShareComponentService :LinkShareComponentService)
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

    addLink()
    {
        let newSimpleLink = new SimpleLink();
        newSimpleLink.title = "";
        newSimpleLink.description = "";
        newSimpleLink.link = "";
        this.project.linkShareComponent.simpleLinks.push(newSimpleLink);
    }

    hideComponent()
    {
        console.log("hide!");
        this.warningModal.hide();
        this.project.linkShareComponent.active = false;
        //this.onUpdate();
        console.log("update could still be called");
    }
}

import { Component, OnInit, Input } from '@angular/core';
import { Project } from '../../../models/Project';
import { SimpleLink } from '../../../models/SimpleLink';
import { LinkShareComponentService } from '../../../services/linkShareComponent.service';

@Component({
  templateUrl: 'link-share.component.html',
  selector:"app-link-share",
  styleUrls: ['./link-share.component.sass']
})
export class LinkShareComponent implements OnInit {
    
    @Input() mode = "write";
    _project :Project;

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

    active = 0;

    loading :boolean = false;

    error :string = "";

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

    onUpdate()
    {
        this.linkShareComponentService.updateLinkShare(this.project).then(_ => {
            console.log("updated linkShareComponent");
        }).catch(e => {
            console.log(e);
        })
    }

    onDelete(e :number)
    {

        this.project.linkShareComponent.simpleLinks.splice(e, 1);
        this.onUpdate();
    }
}

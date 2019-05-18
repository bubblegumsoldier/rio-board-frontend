import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Project } from '../models/Project';
import { UserService } from './user.service';
import { map } from 'rxjs/operators';
import { LinkShareComponent } from '../models/LinkShareComponent';
import { SimpleLink } from '../models/SimpleLink';

@Injectable({ providedIn: 'root' })
export class LinkShareComponentService {
    constructor(private http :HttpClient, private user :UserService)
    {

    }

    public addToProject(project :Project) :Promise<any>
    {
        let userId = this.user.getCurrent().id;
        let linkShareComponent :LinkShareComponent = new LinkShareComponent();
        linkShareComponent.active = true;
        return this.http.post<any>('http://localhost:3000/users/' + userId + '/projects/' + project.id + "/linkShareComponent?extended=true", linkShareComponent)
            .toPromise()
            .then(linkShareComponent => {project.linkShareComponent = linkShareComponent;});
    }

    public updateLinkShare(project :Project) :Promise<any>
    {
        let userId = this.user.getCurrent().id;
        return this.http.put<any>('http://localhost:3000/users/' + userId + '/projects/' + project.id + "/linkShareComponent?extended=true", project.linkShareComponent)
            .toPromise();
    }

    getClassification(link :SimpleLink) :string 
    {
        if(link.link.startsWith("https://drive.google.com"))
        {
            return "Google-Drive";
        }
        if(link.link.indexOf(".sharepoint.com") > -1)
        {
            return "One-Drive";
        }
        return "Link";
    }
}

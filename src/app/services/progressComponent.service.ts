import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Project } from '../models/Project';
import { UserService } from './user.service';
import { map } from 'rxjs/operators';
import { ProgressComponent } from '../models/ProgressComponent';
import { SimpleLink } from '../models/SimpleLink';

import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class ProgressComponentService {
    constructor(private http :HttpClient, private user :UserService)
    {

    }

    public addToProject(project :Project) :Promise<any>
    {
        let userId = this.user.getCurrent().id;
        let progressComponent :ProgressComponent = new ProgressComponent();
        progressComponent.active = true;
        return this.http.post<any>(environment.apiUrl + '/users/' + userId + '/projects/' + project.id + "/progressComponent?extended=true", progressComponent)
            .toPromise()
            .then(progressComponent => {project.progressComponent = progressComponent;});
    }

    public updateProgress(project :Project) :Promise<any>
    {
        let userId = this.user.getCurrent().id;
        return this.http.put<any>(environment.apiUrl + '/users/' + userId + '/projects/' + project.id + "/progressComponent?extended=true", project.progressComponent)
            .toPromise();
    }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Project } from '../models/Project';
import { UserService } from './user.service';
import { map } from 'rxjs/operators';

import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class ProjectService {
    constructor(private http :HttpClient, private user :UserService)
    {

    }

    public getProject(projectId :number) :Promise<Project>
    {
        let userId = this.user.getCurrent().id;
        return this.http.get<Project>(environment.apiUrl + '/users/' + userId + '/projects/' + projectId + "?extended=true").toPromise();
    }
}

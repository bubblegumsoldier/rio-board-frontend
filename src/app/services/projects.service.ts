import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Project } from '../models/Project';
import { UserService } from './user.service';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class ProjectsService {
    constructor(private http :HttpClient, private user :UserService)
    {

    }

    public getProjects() :Promise<any>
    {
        let userId = this.user.getCurrent().id;
        return this.http.get('http://localhost:3000/users/' + userId + '/projects').toPromise();
    }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Project } from '../models/Project';
import { UserService } from './user.service';
import { map } from 'rxjs/operators';

import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class PasswordShareService {
    constructor(private http :HttpClient, private user :UserService)
    {

    }

    public addToProject(project :Project) :Promise<any>
    {
        let userId = this.user.getCurrent().id;
        let passwordShare = {
            password: "",
            encryptedText: "",
            active: true
        }
        return this.http.post<any>(environment.apiUrl + '/users/' + userId + '/projects/' + project.id + "/passwordShareComponent", passwordShare)
            .toPromise()
            .then(passwordShareComponent => {project.passwordShareComponent = passwordShareComponent;});
    }
}

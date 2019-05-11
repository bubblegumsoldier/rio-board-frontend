import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Project } from '../models/Project';
import { UserService } from './user.service';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class PasswordShareComponentService {
    constructor(private http :HttpClient, private user :UserService)
    {

    }

    public updatePasswordShare(oldEncryptedPW :string, passwordShare :any ,project :Project) :Promise<any>
    {
        let userId = this.user.getCurrent().id;
        return this.http.post<Project>(JSON.stringify(passwordShare), 'http://localhost:3000/users/' + userId + '/projects/' + project.id + "/" + "passwordShareComponent?password=" + encodeURI(oldEncryptedPW))
        .toPromise()
        .then(added => {
            project.passwordShareComponent = added;
        })
        ;
    }

    public requestDecrypt(encryptedPassword :string, projectId :string) :Promise<any>
    {
        let userId = this.user.getCurrent().id;
        return this.http.get<Project>('http://localhost:3000/users/' + userId + '/projects/' + projectId + "/" + "passwordShareComponent")
        .toPromise();
    }
}

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
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
        const httpOptions = {
            headers: new HttpHeaders({
              'Content-Type':  'application/json',
              'Authorization': 'my-auth-token'
            })
          };
          
        let userId = this.user.getCurrent().id;
        return this.http.put<Project>('http://localhost:3000/users/' + userId + '/projects/' + project.id + "/" + "passwordShareComponent?password=" + encodeURI(oldEncryptedPW), JSON.stringify(passwordShare), httpOptions)
        .toPromise()
        ;
    }

    public requestDecrypt(encryptedPassword :string, projectId :string) :Promise<any>
    {
        let userId = this.user.getCurrent().id;
        return this.http.get<Project>('http://localhost:3000/users/' + userId + '/projects/' + projectId + "/" + "passwordShareComponent?password=" + encodeURI(encryptedPassword))
        .toPromise();
    }

    public delete(projectId :string) :Promise<any>
    {
        let userId = this.user.getCurrent().id;
        return this.http.delete<Project>('http://localhost:3000/users/' + userId + '/projects/' + projectId + "/" + "passwordShareComponent").toPromise();
    }
}

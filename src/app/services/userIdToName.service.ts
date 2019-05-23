import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class UserIdToNameService {
    constructor(private http :HttpClient)
    {

    }

    public getNameForUserId(userId :string) :Promise<{firstName :string, lastName: string}>
    {
        return new Promise<{firstName :string, lastName: string}>((resolve, reject) => {
          if(userId == "-1")
          {
            return resolve({
              firstName: "Unknown",
              lastName: "User"
            });
          }
          this.http.get<any>("http://localhost:3000/users/" + userId + "/name").toPromise()
          .then(v => {resolve(v)}).catch(e => {reject(e)});
        });
    }
}

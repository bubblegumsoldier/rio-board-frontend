import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, concat } from 'rxjs/operators';
import { User } from '../models/User';
import { Observable } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { ExternalAccessService } from './externalAccess.service';

@Injectable({ providedIn: 'root' })
export class UserService {
    constructor(private http: HttpClient, private route :ActivatedRoute, private router :Router, private externalAccess :ExternalAccessService) { }

    getAll() {
        return this.http.get<User[]>(`http://localhost:3000/users`);
    }

    getCurrent()
    {
        if(this.externalAccess.givenUserId)
        {
            return {
                id: this.externalAccess.givenUserId
            };
        }
        return JSON.parse(localStorage.getItem("currentUser"));
    }

    syncCurrent() :Observable<User>
    {
        return this.http.get<User>('http://localhost:3000/users/own').pipe(map((result) => {
            console.log(result);
            localStorage.setItem("currentUser", JSON.stringify(result));
            return result;
        }));
    }

    updateCurrent(newUser)
    {
        return Promise.all([this.http.put<User>('http://localhost:3000/users/own', newUser).toPromise(), this.syncCurrent().toPromise()]);
    }

    register(newUser)
    {
        return this.http.post<void>('http://localhost:3000/users/', newUser).toPromise();
    }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, concat } from 'rxjs/operators';
import { User } from '../models/User';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class UserService {
    constructor(private http: HttpClient) { }

    getAll() {
        return this.http.get<User[]>(`http://localhost:3000/users`);
    }

    getCurrent()
    {
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
}

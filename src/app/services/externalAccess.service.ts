import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

import { User } from '../models/User';
import { ActivatedRoute } from '@angular/router';
import { AuthenticationService } from './authentication.service';

@Injectable({ providedIn: 'root' })
export class ExternalAccessService {

    static TOKEN_PARAM_KEY = "C_PT";
    static USER_ID_PARAM_KEY = "U_ID";

    constructor(private route :ActivatedRoute, private authenticationService :AuthenticationService) {
        
    }

    get givenProjectSecurityToken() :string
    {
        return this.route.snapshot.queryParamMap.get(ExternalAccessService.TOKEN_PARAM_KEY);
    }

    get givenUserId() :string
    {
        return this.route.snapshot.queryParamMap.get(ExternalAccessService.USER_ID_PARAM_KEY);
    }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Project } from '../models/Project';
import { UserService } from './user.service';
import { map } from 'rxjs/operators';
import { FeedComponent } from '../models/FeedComponent';
import { FeedMessage } from '../models/FeedMessage';

import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class FeedComponentService {
    constructor(private http :HttpClient, private user :UserService)
    {

    }

    public addToProject(project :Project) :Promise<any>
    {
        let userId = this.user.getCurrent().id;
        let feedComponent :FeedComponent = new FeedComponent();
        feedComponent.active = true;
        return this.http.post<any>(environment.apiUrl + '/users/' + userId + '/projects/' + project.id + "/feedComponent?extended=true", feedComponent)
            .toPromise()
            .then(feedComponent => {project.feedComponent = feedComponent;});
    }

    public updateFeedComponentInProject(project :Project) :Promise<any>
    {
      let userId = this.user.getCurrent().id;
      return this.http.get<FeedComponent>(environment.apiUrl + '/users/' + userId + '/projects/' + project.id + '/feedComponent?extended=true')
        .toPromise()
        .then((feedComponent :FeedComponent) => {
          project.feedComponent = feedComponent;
      });
    }

    public updateFeedComponent(project :Project) :Promise<any>
    {
      let userId = this.user.getCurrent().id;
      return this.http.post<FeedComponent>(environment.apiUrl + '/users/' + userId + '/projects/' + project.id + '/feedComponent?extended=true', project)
        .toPromise()
        .then((feedComponent :FeedComponent) => {
          project.feedComponent = feedComponent;
      });
    }

    addMessage(message :FeedMessage, project :Project) :Promise<any>
    {
      let userId = this.user.getCurrent().id;
      return this.http.post<FeedMessage>(environment.apiUrl + '/users/' + userId + '/projects/' + project.id + '/feedComponent/feedMessages', message)
        .toPromise()
        .then((m :FeedMessage) => {
          project.feedComponent.feedMessages.push(m);
        });
    }

    deleteMessage(message :FeedMessage, project :Project) :Promise<any>
    {
      let userId = this.user.getCurrent().id;
      return this.http.delete<any>(environment.apiUrl + '/users/' + userId + '/projects/' + project.id + '/feedComponent/feedMessages/' + message.id)
        .toPromise();
    }
}

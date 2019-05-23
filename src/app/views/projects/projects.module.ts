// Angular
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

import { ProjectComponent } from './project.component';
import { NewProjectComponent } from './new-project.component';

import { TooltipModule } from 'ngx-bootstrap/tooltip';

// Components Routing
import { ProjectsRoutingModule } from './projects-routing.module';
import { GridsterModule } from 'angular-gridster2';
import { RouteReuseStrategy } from '@angular/router';
import { CustomReuseStrategy } from './customReuseStrategy';
import { AddComponentComponent } from './add-component.component';
import { PasswordShareComponent } from './password-share/password-share.component';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { SecretInputComponent } from './password-share/secret-input.component';
import { ClipboardModule } from 'ngx-clipboard';
import { PasswordShareLoginComponent } from './password-share/password-share-login.component';
import { LinkShareComponent } from './link-share/link-share.component';
import { SimpleLinkComponent } from './link-share/simple-link.component';
import { EditSimpleLinkEditComponent } from './link-share/simple-link-edit.component';

import { ModalModule } from 'ngx-bootstrap/modal';
import { ProgressComponent } from './progress-component/progress.component';
import { EditProgressComponent } from './progress-component/edit-progress.component';

import { CKEditorModule } from '@ckeditor/ckeditor5-angular';

import { NgxMasonryModule } from 'ngx-masonry';
import { FeedComponent } from './feed/feed.component';
import { FeedInputComponent } from './feed/feed-input.component';
import { FeedMessageComponent } from './feed/feed-message.component';
import { FileStackComponent } from './filestack/file-stack.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ProjectsRoutingModule,
    GridsterModule,
    TooltipModule.forRoot(),
    TabsModule,
    ClipboardModule,
    ModalModule.forRoot(),
    CKEditorModule,
    NgxMasonryModule
  ],
  declarations: [
    ProjectComponent,
    NewProjectComponent,
    AddComponentComponent,
    PasswordShareComponent,
    SecretInputComponent,
    PasswordShareLoginComponent,
    LinkShareComponent,
    SimpleLinkComponent,
    EditSimpleLinkEditComponent,
    ProgressComponent,
    EditProgressComponent,
    FeedInputComponent,
    FeedComponent,
    FeedMessageComponent,
    FileStackComponent
  ],
  providers: [
    {provide: RouteReuseStrategy, useClass: CustomReuseStrategy}
  ]
})
export class ProjectsModule { }

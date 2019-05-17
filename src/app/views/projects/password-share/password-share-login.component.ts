import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Project } from '../../../models/Project';
import { PasswordShareComponentService } from '../../../services/passwordShareComponent.service';
import { PasswordCrypterService } from '../../../services/passwordCrypter.service';

@Component({
  templateUrl: 'password-share-login.component.html',
  selector:"app-password-share-login"
})
export class PasswordShareLoginComponent implements OnInit {
    
    @Output() onLogin :EventEmitter<any> = new EventEmitter<any>();
    password :string = "";

    loading :boolean = false;

    error :string = "";

    _project :Project;
    
    @Input()
    public set project(project: Project)
    {
        console.log("project was set ");
        console.log(project);
        this._project = project;
    }

    public get project() :Project
    {
        return this._project;
    }

    constructor(
        private passwordShareComponentService :PasswordShareComponentService,
        private passwordCrypter :PasswordCrypterService
        )
    {

    }

    ngOnInit(): void {
        
    }

    get notYetInitialized()
    {
        return this.project.passwordShareComponent.password && this.project.passwordShareComponent.password.length == 0
    }

    onDecrypt() 
    {
        this.error = "";
        if(this.password.length <= 0)
        {
            this.error = "Please enter a password";
            return;
        }
        let encryptedPW = this.passwordCrypter.getSHA512(this.password)
        if(this.notYetInitialized)
        {
            this.onLogin.emit({
                password: encryptedPW,
                encryptedText: "[]",
                cleanPassword: this.password
            });
            return;
        }
        this.loading = true;
        this.passwordShareComponentService.requestDecrypt(encryptedPW, this.project.id)
            .then(this.onSuccessfullyRetrieved.bind(this))
            .catch(this.onRetrievalError.bind(this));
    }

    onSuccessfullyRetrieved(data)
    {
        this.loading = false;
        data.cleanPassword = this.password;
        this.onLogin.emit(data);
    }

    onRetrievalError(e)
    {
        console.log(e);
        this.loading = false;
        this.error = "Couldn't log in with given credentials";
    }
}

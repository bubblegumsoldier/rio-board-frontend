import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { PasswordCrypterService } from '../../../services/passwordCrypter.service';
import { Project } from '../../../models/Project';
import { PasswordShareComponentService } from '../../../services/passwordShareComponent.service';
import { ModalDirective } from 'ngx-bootstrap/modal';

@Component({
  templateUrl: 'password-share.component.html',
  selector:"app-password-share",
  styleUrls: ['password-share.component.sass']
})
export class PasswordShareComponent implements OnInit {
    
    @Input() mode = "write";
    _project :Project;

    @ViewChild('warningModal') public warningModal: ModalDirective;

    @Input()
    public set project(project :Project)
    {
        this._project = project;
    }

    public get project() :Project
    {
        return this._project;
    }


    constructor(private passwordCrypter :PasswordCrypterService, private passwordShareService :PasswordShareComponentService)
    {

    }

    decryptedPasswords :any[] = undefined;

    active = 0;

    newPassword1 :string = "";
    newPassword2 :string = "";

    loading :boolean = false;

    error :string = "";

    lastUsedPassword = "";

    get decrypted() :boolean
    {
        return !!this.decryptedPasswords;
    }

    ngOnInit(): void {
        
    }

    keys(o) 
    {
        return Object.keys(o);
    }

    get mayWrite()
    {
        return this.mode === "write";
    }

    onLogin(e)
    {
        this.lastUsedPassword = e.cleanPassword;
        if(e.encryptedText.length <= 0)
        {
            this.decryptedPasswords = [];
            this.addTab();
            return;
        }
        this.decryptedPasswords = JSON.parse(this.passwordCrypter.decryptPasswordShare(e.encryptedText, this.lastUsedPassword));
    }

    addTab()
    {
        this.decryptedPasswords.push({
            title: "New Tab",
            items: []
        })
    }

    onTabSelectAny()
    {
        
    }

    removeItem(i, itemIndex)
    {
        this.decryptedPasswords[i].items.splice(itemIndex, 1);
    }

    addItem(i)
    {
        this.decryptedPasswords[i].items.push({
            key: "Username",
            value: "Some-Username",
            type: "text"
        });
    }

    toggleItemType(i, itemIndex)
    {
        this.decryptedPasswords[i].items[itemIndex].type = this.decryptedPasswords[i].items[itemIndex].type == "password" ? "text" : "password";
    }

    save()
    {
        this.loading = true;
        this.error = "";
        let encryptionPassword = this.lastUsedPassword;
        if(this.newPassword1.length > 0)
        {
            if(this.newPassword1 != this.newPassword2)
            {
                this.error = "Passwords do not match";
                this.loading = false;
                return;
            }
            encryptionPassword = this.newPassword1;
        }
        let oldEncryptedPassword = this.passwordCrypter.getSHA512(this.lastUsedPassword);
        let newEncryptedPassword = this.passwordCrypter.getSHA512(encryptionPassword);
        let encryptedStuff = this.passwordCrypter.encryptPasswordShare(this.decryptedPasswords, encryptionPassword);
        let passwordShareComponent = {
            password: newEncryptedPassword,
            encryptedText: encryptedStuff
        };
        
        this.passwordShareService.updatePasswordShare(oldEncryptedPassword, passwordShareComponent, this.project).then(_ => {
            this.successShown = true;
            setTimeout(_ => {
                this.successShown = false;
            }, 8000);
            this.loading = false;
        }).catch(_ => {
            this.loading = false;
        });
    }

    successShown = false;

    hideComponent()
    {
        console.log("hide!");
        this.warningModal.hide();
        this.passwordShareService.delete(this.project.id).then(_ => {
            console.log("setting password share component to null");
            this.project.passwordShareComponent = {};
        }).catch(e => {
            console.log(e);
        });
    }
}

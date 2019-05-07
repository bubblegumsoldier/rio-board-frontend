import { Component, OnInit, Input } from '@angular/core';
import { PasswordCrypterService } from '../../../services/passwordCrypter.service';

@Component({
  templateUrl: 'password-share.component.html',
  selector:"app-password-share"
})
export class PasswordShareComponent implements OnInit {
    
    @Input() mode = "write";

    constructor(private passwordCrypter :PasswordCrypterService)
    {

    }

    decryptedPasswords :[any] = undefined;

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
        this.lastUsedPassword = e.password;
        this.decryptedPasswords = [
            {
                title: "Tab-1",
                items: [
                    {
                        key: "Username",
                        value: "h.muessemann@gmx.de",
                        type: "text"
                    },
                    {
                        key: "Password",
                        value: "ABCDERF123",
                        type: "password"
                    }
                ]
            }
        ];
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
        let encryptedStuff = this.passwordCrypter.encryptPasswordShare(this.decryptedPasswords, encryptionPassword);
        
        let decryptedStuff = this.passwordCrypter.decryptPasswordShare(encryptedStuff, encryptionPassword);
    }
}

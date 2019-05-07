import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  templateUrl: 'password-share-login.component.html',
  selector:"app-password-share-login"
})
export class PasswordShareLoginComponent implements OnInit {
    
    @Output() onLogin :EventEmitter<any> = new EventEmitter<any>();
    password :string = "";

    loading :boolean = false;

    error :string = "";

    ngOnInit(): void {
        
    }

    onDecrypt() 
    {
        this.error = "";
        if(this.password.length <= 0)
        {
            this.error = "Please enter a password";
            return;
        }
        this.loading = true;
        //TODO LOGIC
        setTimeout(_ => {
            this.loading = false;
            this.onLogin.emit({
                password: this.password
            });
        }, 3000);
    }

}

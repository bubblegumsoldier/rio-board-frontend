import { Component, Input, OnInit } from '@angular/core';
import { User } from '../../models/User';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';

import * as EmailValidator from 'email-validator';

@Component({
  selector: 'app-dashboard',
  templateUrl: 'register.component.html'
})
export class RegisterComponent implements OnInit{
  ngOnInit(): void {

  }

  email :string = "";
  password :string = "";
  password2 :string = "";
  firstName :string = "";
  lastName :string = "";

  constructor(private userService :UserService, private router :Router)
  {

  }

  public errorMsg = "";

  onRegister()
  {
    this.errorMsg = "";
    if(this.firstName.length < 1 || this.lastName.length < 1)
    {
      this.errorMsg = "Name is too short";
      return;
    }
    if(this.password.length < 6)
    {
      this.errorMsg = "Password is too short.";
      return;
    }
    if(this.password != this.password2)
    {
      this.errorMsg = "Passwords do not match.";
      return;
    }
    if(!EmailValidator.validate(this.email))
    {
      this.errorMsg = "E-Mail is not properly formatted";
      return;
    }
    this.userService.register({
      password: this.password,
      email: this.email,
      firstname: this.firstName,
      lastname: this.lastName
    }).then(() => {
      this.router.navigate(["/login"], {queryParams: {
        hasMessage: "Successfully created account. You can log in now."
      }});
    }).catch((e) => {
      console.log(e);
      this.errorMsg = e;
    });
  }

  getErrorText()
  {
    return this.errorMsg;
  }

}

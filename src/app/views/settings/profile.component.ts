import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';

@Component({
  templateUrl: 'profile.component.html'
})
export class ProfileComponent implements OnInit {

    email :string = "";
    firstname :string = "";
    lastname :string = "";

    currentPassword :string = "";
    newPassword1 :string = "";
    newPassword2 :string = "";

    loading :boolean = false;

    error: string = "";
    success: string = "";

  constructor(private user :UserService) {

  }

  ngOnInit()
  {
    this.email = this.user.getCurrent().email;
    this.firstname = this.user.getCurrent().firstname;
    this.lastname = this.user.getCurrent().lastname;
  }

  submit()
  {
      if(this.newPassword1 != this.newPassword2)
      {
        this.error = "Passwords do not match";
        return;
      }
      this.loading = true;
      let pwDict = {};
      if(this.currentPassword.length > 0)
      {
          pwDict["currentPassword"] = this.currentPassword;
          pwDict["password"] = this.newPassword1;
      }
      this.user.updateCurrent({
          email: this.email,
          firstname: this.firstname,
          lastname : this.lastname,
          ...pwDict
      }).then((success) => {
        this.error = "";
        this.success = "Successfully saved changes";
        this.loading = false;
      }, (error) => {
          this.error = error;
          this.success = "";
          this.loading = false;
      });
  }
}

import { Component } from '@angular/core';
import { AuthenticationService } from '../../services/authentication.service';
import { ParamMap, Router, ActivatedRoute, RouterStateSnapshot } from '@angular/router';


@Component({
  selector: 'app-dashboard',
  templateUrl: 'login.component.html'
})
export class LoginComponent {
  email :string = '';
  password: string = '';
  static HAS_ERROR_QUERY_PARAM = "hasError";
  static HAS_MESSAGE_QUERY_PARAM = "hasMessage";

  static ERROR_MESSAGES = {
    "1": "Username or password is wrong."
  }
  
  constructor(private authenticationService :AuthenticationService, private route: ActivatedRoute, private router :Router) {}

  login()
  {
    console.log("Login attempt for email " + this.email);
    this.authenticationService.login(this.email, this.password).subscribe(_ => {
      this.router.navigate(["/"]);
    }, err => {
      var url = window.location.href.replace("hasMessage", "oldMessage");
      if(url.indexOf("hasError") < 0)
      {
        if (url.indexOf('?') > -1){
          url += '&' + LoginComponent.HAS_ERROR_QUERY_PARAM + '=1'
        }else{
          url += '?' + LoginComponent.HAS_ERROR_QUERY_PARAM + '=1'
        }
      }
      window.location.href = url;
    });
  }

  keyDownFunction(event) {
    if(event.keyCode == 13) {
      this.login();
    }
  }

  get hasError()
  {
    return this.route.snapshot.queryParamMap.keys.includes(LoginComponent.HAS_ERROR_QUERY_PARAM);
  }

  get hasMessage()
  {
    return this.route.snapshot.queryParamMap.keys.includes(LoginComponent.HAS_MESSAGE_QUERY_PARAM);
  }

  getErrorText() :string
  {
    return LoginComponent.ERROR_MESSAGES[this.route.snapshot.queryParamMap.get(LoginComponent.HAS_ERROR_QUERY_PARAM)];
  }

  getMessageText() :string
  {
    return this.route.snapshot.queryParamMap.get(LoginComponent.HAS_MESSAGE_QUERY_PARAM);
  }
}

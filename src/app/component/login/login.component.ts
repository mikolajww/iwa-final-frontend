import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../service/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private auth:AuthService, private router:Router) { }

  ngOnInit() {
  }

  login(usernameOrEmail:HTMLInputElement, password:HTMLInputElement) {
    if(usernameOrEmail != null && password != null) {
      this.auth.login(usernameOrEmail.value,password.value).subscribe(r => {
          console.log(`recieved access key ${r.accessToken}`);
          let roles = [];
          roles.push([].concat.apply([], r.roles));
          localStorage.setItem("accessKey",r.accessToken);
          localStorage.setItem("roles",JSON.stringify(roles));
          console.log(localStorage.getItem('roles'));
          this.router.navigateByUrl('/home');
        },
        err => {
          console.log('incorrect credentials');
          this.router.navigateByUrl('/login');
        });
    }

    //
  }

}

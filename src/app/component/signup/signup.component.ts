import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../service/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor(private auth: AuthService, private router: Router) {
  }

  ngOnInit() {
  }

  signup(name: HTMLInputElement, username: HTMLInputElement, email: HTMLInputElement, pass: HTMLInputElement) {
    if (email != null && pass != null && name != null && username != null) {
      this.auth.signup(name.value, username.value, email.value, pass.value).subscribe(r => {
        console.log(r);
        if (r.success) {
          this.auth.login(username.value, pass.value).subscribe(r => {
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
      });
    }
  }
}

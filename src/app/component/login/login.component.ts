import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../service/auth.service";
import {Router} from "@angular/router";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
declare var jQuery:any;
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm:FormGroup;
  constructor(private auth:AuthService, private router:Router, private fb:FormBuilder) { }

  ngOnInit() {
    jQuery('.ui.negative.message.incorrect').hide();
    this.loginForm = this.fb.group({
      usernameOrEmail:['',[Validators.required, Validators.minLength(4), Validators.maxLength(30)]],
      password:['',[Validators.required, Validators.minLength(5)]]
    });
  }

  login() {
    if(this.loginForm.valid) {
      this.auth.login(this.usernameOrEmail.value, this.password.value).subscribe(r => {
          console.log(`recieved access key ${r.accessToken}`);
          let roles = [];
          roles.push([].concat.apply([], r.roles));
          localStorage.setItem("accessKey",r.accessToken);
          localStorage.setItem("roles",JSON.stringify(roles));
          console.log(localStorage.getItem('roles'));
          this.router.navigateByUrl('/home');
        },
        err => {
          //console.log('incorrect credentials');
          //this.router.navigateByUrl('/login');
          jQuery('.ui.negative.message.incorrect').show().delay(3000).fadeOut();
          this.usernameOrEmail.setValue('');
          this.password.setValue('');
        });
    }
  }

  get password() {
    return this.loginForm.get('password');
  }

  get usernameOrEmail() {
    return this.loginForm.get('usernameOrEmail');
  }
}

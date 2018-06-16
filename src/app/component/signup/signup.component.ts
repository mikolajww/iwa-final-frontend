import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../service/auth.service";
import {Router} from "@angular/router";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  signupForm:FormGroup;
  constructor(private auth: AuthService, private router: Router, private fb:FormBuilder) {
  }

  ngOnInit() {
    this.signupForm = this.fb.group({
      name:['',[Validators.required, Validators.minLength(4), Validators.maxLength(30)]],
      username:['',[Validators.required, Validators.minLength(4), Validators.maxLength(30)],this.isUsernameUnique.bind(this)],
      email:['',[Validators.required, Validators.email],this.isEmailUnique.bind(this)],
      password:['',[Validators.required, Validators.minLength(5)]],
      agree:[false,[Validators.requiredTrue]]
    });
  }

  signup() {
    if(this.signupForm.valid) {
      console.log(this.name.value, this.username.value, this.email.value, this.password.value)
      this.auth.signup(this.name.value, this.username.value, this.email.value, this.password.value).subscribe(r => {
        console.log(r);
        if (r.success) {
          this.auth.login(this.username.value, this.password.value).subscribe(r => {
              let roles = [];
              roles.push([].concat.apply([], r.roles));
              localStorage.setItem("accessKey",r.accessToken);
              localStorage.setItem("roles",JSON.stringify(roles));
              this.router.navigateByUrl('/home');
            },
            err => {
              this.router.navigateByUrl('/login');
            });
        }
      });
    }
  }

  get email() {
    return this.signupForm.get('email');
  }
  get username() {
    return this.signupForm.get('username');
  }
  get name() {
    return this.signupForm.get('name');
  }
  get password() {
    return this.signupForm.get('password');
  }
  get agree() {
    return this.signupForm.get('agree');
  }


  isUsernameUnique(control: FormControl) {
    const q = new Promise((resolve, reject) => {
      setTimeout(() => {
        this.auth.usernameAvailable(control.value).subscribe((r) => {
          r.available?resolve(null):resolve({ 'isUsernameUnique': true });
        }, () => { resolve({ 'isUsernameUnique': true }); });
      }, 1000);
    });
    return q;
  }

  isEmailUnique(control: FormControl) {
    const q = new Promise((resolve, reject) => {
      setTimeout(() => {
        this.auth.emailAvailable(control.value).subscribe((r) => {
          r.available?resolve(null):resolve({ 'isEmailUnique': true });
        }, () => { resolve({ 'isEmailUnique': true }); });
      }, 1000);
    });
    return q;
  }
}

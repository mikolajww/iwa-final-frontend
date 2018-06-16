import { Component } from '@angular/core';
import {AuthService} from "../service/auth.service";
import {Router} from "@angular/router";
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Student Grade Manager';
  constructor(private auth:AuthService, private router:Router) {

  }
  logout() {
    this.auth.logout();
    this.router.navigateByUrl('/about');
  }

  isLoggedIn() {
    return this.auth.isLoggedIn();
  }

  getRole() {
    return this.auth.getRole();
  }

}

import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {AuthService} from "../../service/auth.service";

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

  constructor(private router:Router, private auth:AuthService) { }

  ngOnInit() {
    console.log(localStorage)
  }

  redirect(location:string) {
    this.router.navigateByUrl(`/${location}`);
  }
  isLoggedIn() {
    return this.auth.isLoggedIn();
  }
  logout() {
    this.auth.logout();
  }
}

import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable()
export class AuthService {

  readonly apiUrl = 'http://localhost:8080/api';
  constructor(private http:HttpClient) { }

  login(usernameOrEmail:string, password:string) {
    console.log(usernameOrEmail + " " + password);
    const hash = btoa(password);
    console.log("hash: " , hash);
    return this.http.post<any>(`${this.apiUrl}/auth/signin`,{"usernameOrEmail":usernameOrEmail, "password":hash})
  }

  logout() {
    if( localStorage.getItem("accessKey" )!== null) {
      localStorage.removeItem("accessKey");
      localStorage.removeItem("roles");
    }
  }

  isLoggedIn() {
    if( localStorage.getItem("accessKey" )!== null) {
      return true;
    }
    return false;
  }

  getToken() {
    localStorage.getItem("accessKey" )!== null
  }

  signup(name:string, username:string,email:string, password:string ) {
    console.log(name, username, email, password);
    const hash = btoa(password);
    console.log("hash: " , hash);
    return this.http.post<any>(`${this.apiUrl}/auth/signup`,
      {"name": name, "username": username, "email": email, "password": hash});
  }


  usernameAvailable(username:string) {
    return this.http.get<any>(`${this.apiUrl}/user/checkUsernameAvailability?username=${username}`);
  }

  emailAvailable(email:string) {
    return this.http.get<any>(`${this.apiUrl}/user/checkEmailAvailability?email=${email}`);
  }
  getRole() {
    return JSON.parse(localStorage.getItem('roles')).pop();
  }

}

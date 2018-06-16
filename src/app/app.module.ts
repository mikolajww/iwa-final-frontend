import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './component/app.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {RouterModule, Routes} from "@angular/router";
import {StudentListComponent} from "./component/student/student-list/student-list.component";
import {StudentDetailComponent} from "./component/student/student-detail/student-detail.component";
import {StudentSearchComponent} from "./component/student/student-search/student-search.component";
import {FilterPipe} from "./service/filter.pipe";
import {StudentAddComponent} from "./component/student/student-add/student-add.component";
import {StudentService} from "./service/student.service";
import {AboutComponent} from "./component/about/about.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {AuthService} from "./service/auth.service";
import {LoggedInGuard} from "./service/logged-in.guard";
import {TokenInterceptor} from './service/token-interceptor.service';
import { LoginComponent } from './component/login/login.component';
import { SignupComponent } from './component/signup/signup.component';

const routes:Routes = [
  {path: '',redirectTo:'about', pathMatch:'full'},
  {path: 'home', component:StudentListComponent, canActivate: [LoggedInGuard]},
  {path: 'about', component:AboutComponent},
  {path: 'login', component:LoginComponent},
  {path: 'signup', component:SignupComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    StudentListComponent,
    StudentDetailComponent,
    StudentSearchComponent,
    FilterPipe,
    StudentAddComponent,
    AboutComponent,
    LoginComponent,
    SignupComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes)
  ],
  providers: [StudentService, AuthService, LoggedInGuard, {
      provide: HTTP_INTERCEPTORS,
     useClass: TokenInterceptor,
      multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }

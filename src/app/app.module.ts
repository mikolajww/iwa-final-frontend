import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { StudentListComponent } from './student-list/student-list.component';
import { StudentDetailComponent } from './student-detail/student-detail.component';
import {StudentService} from './student.service';
import { StudentSearchComponent } from './student-search/student-search.component';
import { FilterPipe } from './filter.pipe';
import { StudentAddComponent } from './student-add/student-add.component';
import { HttpClientModule } from "@angular/common/http";
import { AboutComponent } from './about/about.component';
import {RouterModule, Routes} from "@angular/router";

const routes:Routes = [
  {path: '',redirectTo:'home', pathMatch:'full'},
  {path: 'home', component:StudentListComponent},
  {path: 'about', component:AboutComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    StudentListComponent,
    StudentDetailComponent,
    StudentSearchComponent,
    FilterPipe,
    StudentAddComponent,
    AboutComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(routes)
  ],
  providers: [StudentService],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './component/app.component';
import { StudentListComponent } from './component/student/student-list/student-list.component';
import { StudentDetailComponent } from './component/student/student-detail/student-detail.component';
import {StudentService} from './service/student.service';
import { StudentSearchComponent } from './component/student/student-search/student-search.component';
import { FilterPipe } from './service/filter.pipe';
import { StudentAddComponent } from './component/student/student-add/student-add.component';
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

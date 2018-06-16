import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { StudentListComponent } from './student-list/student-list.component';
import { StudentDetailComponent } from './student-detail/student-detail.component';
import {StudentService} from './student.service';
import { StudentSearchComponent } from './student-search/student-search.component';
import { FilterPipe } from './filter.pipe';
import { StudentAddComponent } from './student-add/student-add.component';


@NgModule({
  declarations: [
    AppComponent,
    StudentListComponent,
    StudentDetailComponent,
    StudentSearchComponent,
    FilterPipe,
    StudentAddComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [StudentService],
  bootstrap: [AppComponent]
})
export class AppModule { }

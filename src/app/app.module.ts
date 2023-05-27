import { TeacherService } from './services/teacher.service';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { MainComponent } from './main/main.component';
import { AddDoctorComponent } from './add-student/add-student.component';
import { DoctorListComponent } from './student-list/student-list.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { TeacherListComponent } from './teacher-list/teacher-list.component';
import { AddTeacherComponent } from './add-teacher/add-teacher.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NgApexchartsModule } from "ng-apexcharts";
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DoctorService } from './services/student.service';
import { EditDoctorComponent } from './edit-student/edit-student.component';
import { DoctorAttendanceComponent } from './student-attendance/student-attendance.component';
import { OverviewChartComponent } from './overview-chart/overview-chart.component';
import { ClassAttendanceOverviewComponent } from './class-attendance-overview/class-attendance-overview.component';
import { TeacherAttendanceComponent } from './teacher-attendance/teacher-attendance.component';
import { HolidayComponent } from './holiday/holiday.component'; 
import { AddHolidayComponent } from './add-holiday/add-holiday.component';
import { EventsComponent } from './events/events.component';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { HolidayService } from './services/holiday.service';
import { AuthGuard } from './auth.guard';
import { AddEventComponent } from './add-event/add-event.component';
import { AddRoomComponent } from './add-room/add-room.component';
import { RoomListComponent } from './room-list/room-list.component';
import { RoomService } from './services/branch.service';
import { SubjectListComponent } from './subject-list/subject-list.component';
import { AddSubjectComponent } from './add-subject/add-subject.component';
import { SubjectService } from './services/subject.service';
import { SearchFlterPipe } from './pipes/search-flter.pipe';
import { SearchHolidaysPipe } from './pipes/search-holidays.pipe';
import { SearchReceptionistsPipe } from './pipes/search-teachers.pipe';
import { EditTeacherComponent } from './edit-teacher/edit-teacher.component';
import { RouterTestingModule } from "@angular/router/testing";
import { MyProfileComponent } from './my-profile/my-profile.component';
import { RegistrationComponent } from './registration/registration.component';
import { AppointmentComponent } from './appointment/appointment.component';
import { MatSelectCountryModule } from '@angular-material-extensions/select-country';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'studentdetails', component: DoctorListComponent },
  { path: 'Addstudent', component: AddDoctorComponent, canActivate: [AuthGuard], data: { allowedRoles: ['admin'] } },
  { path: 'teachers', component: TeacherListComponent },
  { path: 'addTeacher', component: AddTeacherComponent, canActivate: [AuthGuard], data: { allowedRoles: ['admin'] } },
  { path: 'editDoctor/:cne', component: EditDoctorComponent, canActivate: [AuthGuard], data: { allowedRoles: ['admin'] } },
  { path: 'editTeacher/:cne', component: EditTeacherComponent, canActivate: [AuthGuard], data: { allowedRoles: ['admin'] } },
  { path: 'attendance', component: DoctorAttendanceComponent },
  { path: 'teachers', component: TeacherListComponent },
  { path: 'addTeacher', component: AddTeacherComponent, canActivate: [AuthGuard], data: { allowedRoles: ['admin'] } },
  { path: 'editDoctor/:cne', component: EditDoctorComponent, canActivate: [AuthGuard], data: { allowedRoles: ['admin'] } },
  { path: 'attendance/students', component: DoctorAttendanceComponent },
  { path: 'attendance/teachers', component: TeacherAttendanceComponent },
  { path: 'holiday/add', component: AddHolidayComponent, canActivate: [AuthGuard], data: { allowedRoles: ['admin'] } },
  { path: 'holiday', component: AddHolidayComponent },
  { path: 'events', component: EventsComponent },
  { path: 'addevents', component: EventsComponent },
  { path: 'branchs', component: RoomListComponent },
  { path: 'branchs/add', component: AddRoomComponent, canActivate: [AuthGuard], data: { allowedRoles: ['admin'] } },
  { path: 'subjects', component: SubjectListComponent },
  { path: 'subjects/add', component: AddSubjectComponent, canActivate: [AuthGuard], data: { allowedRoles: ['admin'] } },
  { path : 'profile',component : MyProfileComponent},
  { path : 'register',component : RegistrationComponent}
];

@NgModule({
  declarations: [
    AddEventComponent,
    AppComponent,
    SidebarComponent,
    MainComponent,
    AddDoctorComponent,
    DoctorListComponent,
    LoginComponent,
    DashboardComponent,
    TeacherListComponent,
    AddTeacherComponent,
    EditDoctorComponent,
    DoctorAttendanceComponent,
    OverviewChartComponent,
    ClassAttendanceOverviewComponent,
    SearchFlterPipe,
    TeacherAttendanceComponent,
    EventsComponent,
    AddSubjectComponent,
    SearchHolidaysPipe,
    EditTeacherComponent,
    SubjectListComponent,
    SearchReceptionistsPipe,
    EditTeacherComponent,
    MyProfileComponent,
    RegistrationComponent,
    AppointmentComponent,
    AddHolidayComponent,
    AddRoomComponent,
    RoomListComponent,
    HolidayComponent,
    NavbarComponent
  ],
  imports: [
    MatFormFieldModule,
    MatSelectModule,
    MatFormFieldModule,
    MatSelectModule,
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    RouterModule.forRoot(routes),
    ReactiveFormsModule,
    ToastrModule.forRoot(),
    BrowserAnimationsModule,
    NgApexchartsModule,
    FormsModule,
    BrowserModule,
    RouterTestingModule,
    AppRoutingModule,
    MatSelectCountryModule.forRoot('fr'),
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory,
    }),

  ],
  providers: [
    DoctorService,
    TeacherService,
    AuthGuard,
    RoomService,
    SubjectService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

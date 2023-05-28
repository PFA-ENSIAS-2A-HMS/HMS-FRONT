import { ReceptionistService } from './services/receptionist.service';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { MainComponent } from './main/main.component';
import { AddDoctorComponent } from './add-doctor/add-doctor.component';
import { DoctorListComponent } from './doctor-list/doctor-list.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ReceptionistListComponent } from './receptionist-list/receptionist-list.component';
import { AddReceptionistComponent } from './add-receptionist/add-receptionist.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NgApexchartsModule } from "ng-apexcharts";
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DoctorService } from './services/doctor.service';
import { EditDoctorComponent } from './edit-doctor/edit-doctor.component';
import { DoctorAttendanceComponent } from './student-attendance/student-attendance.component';
import { OverviewChartComponent } from './overview-chart/overview-chart.component';
import { ClassAttendanceOverviewComponent } from './class-attendance-overview/class-attendance-overview.component';
import { TeacherAttendanceComponent } from './teacher-attendance/teacher-attendance.component';
import { HospitalComponent } from './hospital/hospital.component'; 
import { AddHospitalComponent } from './add-hospital/add-hospital.component';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { HospitalService } from './services/hospital.service';
import { AuthGuard } from './auth.guard';
import { AddRoomComponent } from './add-room/add-room.component';
import { RoomListComponent } from './room-list/room-list.component';
import { RoomService } from './services/branch.service';
import { PatientListComponent } from './patient-list/patient-list.component';
import { AddPatientComponent } from './add-patient/add-patient.component';
import { SubjectService } from './services/subject.service';
import { SearchFlterPipe } from './pipes/search-flter.pipe';
import { SearchHolidaysPipe } from './pipes/search-holidays.pipe';
import { SearchReceptionistsPipe } from './pipes/search-teachers.pipe';
import { EditReceptionistComponenet } from './edit-receptionist/edit-receptionist.component';
import { RouterTestingModule } from "@angular/router/testing";
import { MyProfileComponent } from './my-profile/my-profile.component';
import { RegistrationComponent } from './registration/registration.component';
import { AppointmentComponent } from './appointment/appointment.component';
import { MatSelectCountryModule } from '@angular-material-extensions/select-country';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { AddAppointmentComponent } from './add-appointment/add-appointment.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'doctors', component: DoctorListComponent },
  { path: 'addDoctor', component: AddDoctorComponent, canActivate: [AuthGuard], data: { allowedRoles: ['admin'] } },
  { path: 'receptionists', component: ReceptionistListComponent },
  { path: 'AddReceptionist', component: AddReceptionistComponent, canActivate: [AuthGuard], data: { allowedRoles: ['admin'] } },
  { path: 'editDoctor/:cne', component: EditDoctorComponent, canActivate: [AuthGuard], data: { allowedRoles: ['admin'] } },
  { path: 'editReceptionist/:cne', component: EditReceptionistComponenet, canActivate: [AuthGuard], data: { allowedRoles: ['admin'] } },
  { path: 'attendance', component: DoctorAttendanceComponent },
  { path: 'teachers', component: ReceptionistListComponent },
  { path: 'AddReceptionist', component: AddReceptionistComponent, canActivate: [AuthGuard], data: { allowedRoles: ['admin'] } },
  { path: 'editDoctor/:cne', component: EditDoctorComponent, canActivate: [AuthGuard], data: { allowedRoles: ['admin'] } },
  { path: 'attendance/students', component: DoctorAttendanceComponent },
  { path: 'attendance/teachers', component: TeacherAttendanceComponent },
  { path: 'hospital/add', component: AddHospitalComponent, canActivate: [AuthGuard], data: { allowedRoles: ['admin'] } },
  { path: 'hospital', component: AddHospitalComponent },
  { path: 'branchs', component: RoomListComponent },
  { path: 'branchs/add', component: AddRoomComponent, canActivate: [AuthGuard], data: { allowedRoles: ['admin'] } },
  { path: 'patients', component: PatientListComponent },
  { path: 'patients/add', component: AddPatientComponent, canActivate: [AuthGuard], data: { allowedRoles: ['admin'] } },
  { path : 'profile',component : MyProfileComponent},
  { path : 'register',component : RegistrationComponent},
  { path : 'appointments',component : AppointmentComponent},
 
  
];

@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    MainComponent,
    AddDoctorComponent,
    DoctorListComponent,
    LoginComponent,
    DashboardComponent,
    ReceptionistListComponent,
    AddReceptionistComponent,
    EditDoctorComponent,
    DoctorAttendanceComponent,
    OverviewChartComponent,
    ClassAttendanceOverviewComponent,
    SearchFlterPipe,
    TeacherAttendanceComponent,
    AddPatientComponent,
    SearchHolidaysPipe,
    EditReceptionistComponenet,
    PatientListComponent,
    SearchReceptionistsPipe,
    MyProfileComponent,
    RegistrationComponent,
    AppointmentComponent,
    AddHospitalComponent,
    AddRoomComponent,
    RoomListComponent,
    HospitalComponent,
    NavbarComponent,
    AddAppointmentComponent
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
    ReceptionistService,
    AuthGuard,
    RoomService,
    SubjectService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

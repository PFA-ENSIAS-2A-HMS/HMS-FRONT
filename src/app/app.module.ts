import { ReceptionistService } from './services/receptionist.service';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
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
import { DoctorService } from './services/doctor.service';
import { OverviewChartComponent } from './overview-chart/overview-chart.component';
import { ClassAttendanceOverviewComponent } from './class-attendance-overview/class-attendance-overview.component';
import { AddHospitalComponent } from './add-hospital/add-hospital.component';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { HospitalService } from './services/hospital.service';
import { AddRoomComponent } from './add-room/add-room.component';
import { RoomListComponent } from './room-list/room-list.component';
import { PatientListComponent } from './patient-list/patient-list.component';
import { AddPatientComponent } from './add-patient/add-patient.component';
import { RouterTestingModule } from "@angular/router/testing";
import { MyProfileComponent } from './my-profile/my-profile.component';
import { RegistrationComponent } from './registration/registration.component';
import { AppointmentComponent } from './appointment/appointment.component';
import { MatSelectCountryModule } from '@angular-material-extensions/select-country';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { AddAppointmentComponent } from './add-appointment/add-appointment.component';
import { AssignRoomComponent } from './assign-room/assign-room.component';
import { InvoicesComponent } from './invoices/invoices.component';
import { AddInvoicesComponent } from './add-invoices/add-invoices.component';
import { GetstartedSidebarComponent } from './getstarted-sidebar/getstarted-sidebar.component';
import { NavbarNosearcchComponent } from './navbar-nosearcch/navbar-nosearcch.component';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';

const routes: Routes = [
  { path: '', component: HomeComponent},
  { path: 'about', component : AboutComponent},
  { path :'contact', component : ContactComponent},
  { path: 'login', component: LoginComponent },
  { path: 'doctors', component: DoctorListComponent },
  { path: 'addDoctor', component: AddDoctorComponent },
  { path: 'receptionists', component: ReceptionistListComponent },
  { path: 'AddReceptionist', component: AddReceptionistComponent },
  { path: 'invoices/add', component: AddInvoicesComponent },
  { path: 'invoices', component: InvoicesComponent },
  { path: 'hospital/add', component: AddHospitalComponent },
  { path: 'hospital', component: AddHospitalComponent },
  { path: 'rooms', component: RoomListComponent },
  { path: 'rooms/assign',component : AssignRoomComponent},
  { path: 'rooms/add', component: AddRoomComponent },
  { path: 'patients', component: PatientListComponent },
  { path: 'patients/add', component: AddPatientComponent},
  { path : 'profile',component : MyProfileComponent},
  { path : 'register',component : RegistrationComponent},
  { path : 'appointments/add',component : AddAppointmentComponent},
  { path : 'appointments',component : AppointmentComponent},
  { path: 'dashboard', component: DashboardComponent },
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
    OverviewChartComponent,
    ClassAttendanceOverviewComponent,
    AddPatientComponent,
    PatientListComponent,
    MyProfileComponent,
    RegistrationComponent,
    AppointmentComponent,
    AddHospitalComponent,
    AddRoomComponent,
    RoomListComponent,
    NavbarComponent,
    AddAppointmentComponent,
    AssignRoomComponent,
    InvoicesComponent,
    AddInvoicesComponent,
    GetstartedSidebarComponent,
    NavbarNosearcchComponent,
    HomeComponent,
    AboutComponent,
    ContactComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatDialogModule,
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
    ReceptionistService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

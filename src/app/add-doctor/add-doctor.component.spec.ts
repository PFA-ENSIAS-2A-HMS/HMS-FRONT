import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddDoctorComponent } from './add-doctor.component';
import { NavbarComponent } from '../navbar/navbar.component';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DoctorService } from '../services/doctor.service';
import { throwError } from 'rxjs';
describe('AddDoctorComponent', () => {
  let component: AddDoctorComponent;
  let fixture: ComponentFixture<AddDoctorComponent>;
  let studentService: DoctorService;
  let toastrService: ToastrService;
  
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddDoctorComponent,NavbarComponent,
        SidebarComponent],
       imports: [RouterTestingModule, 
        HttpClientTestingModule,
        ToastrModule.forRoot(),
        ReactiveFormsModule,
        FormsModule
      ],
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddDoctorComponent);
    component = fixture.componentInstance;
    studentService = TestBed.inject(DoctorService);
    toastrService = TestBed.inject(ToastrService);
    fixture.detectChanges();
  });

  
 
});



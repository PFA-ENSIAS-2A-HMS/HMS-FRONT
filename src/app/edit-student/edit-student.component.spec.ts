import { ComponentFixture, TestBed } from '@angular/core/testing';
 
import { EditDoctorComponent } from './edit-student.component';
import { NavbarComponent } from '../navbar/navbar.component';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DoctorService } from '../services/student.service';
import { ActivatedRoute } from '@angular/router';
import { Doctor } from '../models/student';

describe('EditDoctorComponent', () => {
  let component: EditDoctorComponent;
  let fixture: ComponentFixture<EditDoctorComponent>;
  let studentServiceMock: jasmine.SpyObj<DoctorService>;
  let toastrServiceMock: jasmine.SpyObj<ToastrService>;
  let activatedRouteMock: jasmine.SpyObj<ActivatedRoute>;
  let formBuilder: FormBuilder;
  beforeEach(async () => {
    studentServiceMock = jasmine.createSpyObj('DoctorService', ['findDoctorByCne', 'addDoctor']);
    toastrServiceMock = jasmine.createSpyObj('ToastrService', ['success', 'error']);
    activatedRouteMock = jasmine.createSpyObj('ActivatedRoute', ['snapshot']);

    await TestBed.configureTestingModule({
      declarations: [ EditDoctorComponent,NavbarComponent,
        SidebarComponent],
       imports: [RouterTestingModule, 
        HttpClientTestingModule,
        ToastrModule.forRoot(),
        ReactiveFormsModule,
        FormsModule
      ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditDoctorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should initialize addDoctorForm with default values', () => {
    const expectedFormValues = {
      firstname: '',
      lastname: '',
      gender: '',
      dob: '',
      mobileNumber: '',
      codeApogee: '',
      PasswordAccount: '',
      email: ''
    };

    expect(component.addDoctorForm.value).toEqual(expectedFormValues);
  });

});

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

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should initialize the form with required fields', () => {
    const addDoctorForm = component.addDoctorForm;

    expect(addDoctorForm.contains('firstname')).toBe(true);
    expect(addDoctorForm.contains('lastname')).toBe(true);
    expect(addDoctorForm.contains('gender')).toBe(true);
    expect(addDoctorForm.contains('dob')).toBe(true);
    expect(addDoctorForm.contains('mobileNumber')).toBe(true);
    expect(addDoctorForm.contains('codeApogee')).toBe(true);
    expect(addDoctorForm.contains('PasswordAccount')).toBe(true);
    expect(addDoctorForm.contains('confirmPassword')).toBe(true);
    expect(addDoctorForm.contains('email')).toBe(true);

    const firstnameControl = addDoctorForm.get('firstname');
    expect(firstnameControl?.hasError('required')).toBe(true);

    const lastnameControl = addDoctorForm.get('lastname');
    expect(lastnameControl?.hasError('required')).toBe(true);

    const genderControl = addDoctorForm.get('gender');
    expect(genderControl?.hasError('required')).toBe(true);

    const dobControl = addDoctorForm.get('dob');
    expect(dobControl?.hasError('required')).toBe(true);

    const mobileNumberControl = addDoctorForm.get('mobileNumber');
    expect(mobileNumberControl?.hasError('required')).toBe(true);

    const codeApogeeControl = addDoctorForm.get('codeApogee');
    expect(codeApogeeControl?.hasError('required')).toBe(true);

    const PasswordAccountControl = addDoctorForm.get('PasswordAccount');
    expect(PasswordAccountControl?.hasError('required')).toBe(true);

    const confirmPasswordControl = addDoctorForm.get('confirmPassword');
    expect(confirmPasswordControl?.hasError('required')).toBe(true);

    const emailControl = addDoctorForm.get('email');
    expect(emailControl?.hasError('required')).toBe(true);
  });
   it('should initialize the form with required fields', () => {
    const addDoctorForm = component.addDoctorForm;

    expect(addDoctorForm.contains('firstname')).toBe(true);
    expect(addDoctorForm.contains('lastname')).toBe(true);
    expect(addDoctorForm.contains('gender')).toBe(true);
    expect(addDoctorForm.contains('dob')).toBe(true);
    expect(addDoctorForm.contains('mobileNumber')).toBe(true);
    expect(addDoctorForm.contains('codeApogee')).toBe(true);
    expect(addDoctorForm.contains('PasswordAccount')).toBe(true);
    expect(addDoctorForm.contains('confirmPassword')).toBe(true);
    expect(addDoctorForm.contains('email')).toBe(true);

    const firstnameControl = addDoctorForm.get('firstname');
    expect(firstnameControl?.hasError('required')).toBe(true);

    const lastnameControl = addDoctorForm.get('lastname');
    expect(lastnameControl?.hasError('required')).toBe(true);

    const genderControl = addDoctorForm.get('gender');
    expect(genderControl?.hasError('required')).toBe(true);

    const dobControl = addDoctorForm.get('dob');
    expect(dobControl?.hasError('required')).toBe(true);

    const mobileNumberControl = addDoctorForm.get('mobileNumber');
    expect(mobileNumberControl?.hasError('required')).toBe(true);

    const codeApogeeControl = addDoctorForm.get('codeApogee');
    expect(codeApogeeControl?.hasError('required')).toBe(true);

    const PasswordAccountControl = addDoctorForm.get('PasswordAccount');
    expect(PasswordAccountControl?.hasError('required')).toBe(true);

    const confirmPasswordControl = addDoctorForm.get('confirmPassword');
    expect(confirmPasswordControl?.hasError('required')).toBe(true);

    const emailControl = addDoctorForm.get('email');
    expect(emailControl?.hasError('required')).toBe(true);
  });
  it('should set required validation on firstname field', () => {
    const firstnameControl = component.addDoctorForm.get('firstname');
    firstnameControl?.setValue('');
    expect(firstnameControl?.invalid).toBeTruthy();
    expect(firstnameControl?.errors?.["required"]).toBeTruthy();

    firstnameControl?.setValue('John');
    expect(firstnameControl?.valid).toBeTruthy();
  });

 
});



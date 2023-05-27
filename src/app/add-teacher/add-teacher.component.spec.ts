import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTeacherComponent } from './add-teacher.component';
import { NavbarComponent } from '../navbar/navbar.component';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ToastrModule } from 'ngx-toastr';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
describe('AddTeacherComponent', () => {
  let component: AddTeacherComponent;
  let fixture: ComponentFixture<AddTeacherComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddTeacherComponent,NavbarComponent,
        SidebarComponent],
       imports: [RouterTestingModule, 
        HttpClientTestingModule,
        ToastrModule.forRoot(),
        ReactiveFormsModule,
        FormsModule
      ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddTeacherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should validate form fields on submit', () => {
    component.addTeacherForm.setValue({
      firstname: 'John',
      lastname: 'Doe',
      gender: 'Male',
      dob: '1990-01-01',
      jod: '2021-01-01',
      mobileNumber: '1234567',
      matricule: '12345',
      PasswordAccount: 'password',
      confirmPassword: 'password',
      email: 'john.doe@example.com'
    });
    expect(component.addTeacherForm.valid).toBeTruthy();
  });
  
});

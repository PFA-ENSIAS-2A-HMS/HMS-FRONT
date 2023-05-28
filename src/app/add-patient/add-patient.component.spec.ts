import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPatientComponent } from './add-patient.component';
import { NavbarComponent } from '../navbar/navbar.component';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ToastrModule } from 'ngx-toastr';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
describe('AddSubjectComponent', () => {
  let component: AddPatientComponent;
  let fixture: ComponentFixture<AddPatientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddPatientComponent,NavbarComponent,
        SidebarComponent],
       imports: [RouterTestingModule, 
        HttpClientTestingModule,
        ToastrModule.forRoot(),
        ReactiveFormsModule,
        FormsModule
      ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddPatientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should validate form fields', () => {
    component.addSubjectForm.controls['code'].setValue('');
    component.addSubjectForm.controls['name'].setValue('Subject');
    component.addSubjectForm.controls['description'].setValue('Description');
    component.addSubjectForm.controls['filiere'].setValue('Filiere');
  
    expect(component.addSubjectForm.controls['code'].valid).toBeFalsy();
    expect(component.addSubjectForm.controls['name'].valid).toBeTruthy();
    expect(component.addSubjectForm.controls['description'].valid).toBeTruthy();
    expect(component.addSubjectForm.controls['filiere'].valid).toBeTruthy();
  });

  it('should submit the form and add a subject', () => {
    spyOn(component, 'addSubject').and.callThrough();
  
    component.addSubjectForm.controls['code'].setValue('123');
    component.addSubjectForm.controls['name'].setValue('Subject');
    component.addSubjectForm.controls['description'].setValue('Description');
    component.addSubjectForm.controls['filiere'].setValue('Filiere');
  
    component.onSubmit();
  
    expect(component.addSubject).toHaveBeenCalled();
  });
    
});

import { TeacherService } from '../services/teacher.service';
import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AbstractControl } from '@angular/forms';
import { Teacher } from '../models/teacher';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-add-teacher',
  templateUrl: './add-teacher.component.html',
  styleUrls: ['./add-teacher.component.css'],
  providers: [TeacherService]
})
export class AddTeacherComponent {
  formData: any;
  myTeacher: Teacher = {
    matricule: '',
    firstname: '',
    lastname: '',
    phone: '',
    email: '',
    gender: '',
    date_of_birth: '',
    // joining_date: '',
    password: ''
  }

  teachers: Teacher[] = [];
  addTeacherForm: FormGroup;

  constructor(private teacherService: TeacherService, private toastr: ToastrService) {
    this.addTeacherForm = new FormGroup({
      firstname: new FormControl('', [
        Validators.required,
        Validators.minLength(3)
      ]),
      lastname: new FormControl('', [
        Validators.required,
        Validators.minLength(3)
      ]),
      gender: new FormControl('', [
        Validators.required
      ]),
      dob: new FormControl('', [
        Validators.required,
        //  this.dobValidator
      ]),
      jod: new FormControl('', [
       Validators.required,
      ])
      ,
      mobileNumber: new FormControl('', [
        Validators.required,
        Validators.pattern(/^\d{7,}$/)
      ]),
      matricule: new FormControl('', [
        Validators.required
      ]),
      PasswordAccount: new FormControl('', [
        Validators.required,
        Validators.minLength(8)
      ]),
      confirmPassword: new FormControl('', [
        Validators.required,
        this.matchPassword.bind(this)
      ]),
      email: new FormControl('', [
        Validators.required,
        Validators.pattern("[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$")
      ]),

    });
  }
  matchPassword(control: AbstractControl): { [key: string]: any } | null {
    const PasswordAccount = control.parent?.get('PasswordAccount');
    const confirmPassword = control;

    if (PasswordAccount?.value !== confirmPassword.value) {
      return { passwordMismatch: true };
    }
    return null;
  }
  get firstname() {
    return this.addTeacherForm.get('firstname');
  }
  get lastname() {
    return this.addTeacherForm.get('lastname');
  }
  get gender() {
    return this.addTeacherForm.get('gender');
  }
  get dob() {
    return this.addTeacherForm.get('dob');
  }
   get jod() {
  return this.addTeacherForm.get('jod');
  }
  get mobileNumber() {
    return this.addTeacherForm.get('mobileNumber');
  }

  get matricule() {
    return this.addTeacherForm.get('matricule');
  }

  get PasswordAccount() {
    return this.addTeacherForm.get('PasswordAccount');
  }
  get confirmPassword() {
    return this.addTeacherForm.get('confirmPassword');
  }


  get email() {
    return this.addTeacherForm.get('email');
  }
  addTeacher(teacher: Teacher) {
    this.teacherService.addTeacher(teacher).subscribe((teachers: any) => {
      this.toastr.success('Teacher added successfully');
    }, (error: any) => {
      this.toastr.error('error');
    });
  }
  onSubmit(): any {
    this.formData = this.addTeacherForm.value;
    let teacher: Teacher;
    teacher = {
      matricule: this.formData?.matricule,
      firstname: this.formData?.firstname,
      lastname: this.formData?.lastname,
      phone: this.formData?.mobileNumber,
      email: this.formData?.email,
      gender: this.formData?.gender == 'Male' ? 'MALE' : 'FEMALE',
      password: this.formData?.PasswordAccount,
      date_of_birth: this.formData?.dob,
      joining_date : this.formData?.jod
    }
    this.addTeacher(teacher);
  }
}

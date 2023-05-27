import { TeacherService } from '../services/teacher.service';
import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AbstractControl } from '@angular/forms';
import { Teacher } from '../models/teacher';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-add-teacher',
  templateUrl: './edit-teacher.component.html',
  styleUrls: ['./edit-teacher.component.css'],
  providers: [TeacherService]
})
export class EditTeacherComponent {
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
  EditTeacherForm: FormGroup;

  constructor(private teacherService: TeacherService, private toastr: ToastrService,
    private route: ActivatedRoute
    ,private fb: FormBuilder) {
    this.EditTeacherForm = new FormGroup({
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
    this.getTeacherById();
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
    return this.EditTeacherForm.get('firstname');
  }
  get lastname() {
    return this.EditTeacherForm.get('lastname');
  }
  get gender() {
    return this.EditTeacherForm.get('gender');
  }
  get dob() {
    return this.EditTeacherForm.get('dob');
  }
   get jod() {
  return this.EditTeacherForm.get('jod');
  }
  get mobileNumber() {
    return this.EditTeacherForm.get('mobileNumber');
  }

  get matricule() {
    return this.EditTeacherForm.get('matricule');
  }

  get PasswordAccount() {
    return this.EditTeacherForm.get('PasswordAccount');
  }
  get confirmPassword() {
    return this.EditTeacherForm.get('confirmPassword');
  }


  get email() {
    return this.EditTeacherForm.get('email');
  }

  updateTeacher(teacher: Teacher,id : any) {
    this.teacherService.updateTeacher(teacher,id).subscribe((teachers: any) => {
     this.toastr.success('Teacher updated successfully');
    }, (error: any) => {
      this.toastr.error('error');
    });
  }
  current_id: any;
  currentTeacher : Teacher | any;
  
  getTeacherById(){
    this.current_id = this.route.snapshot.paramMap.get('cne');
    this.teacherService.findTeacherById(this.current_id).subscribe(teacher=>{
      this.currentTeacher = teacher;
      console.log(teacher);
      this.EditTeacherForm = this.fb.group({
      id : this.currentTeacher?.id,
      matricule: this.currentTeacher?.matricule,
      firstname: this.currentTeacher?.firstname,
      lastname: this.currentTeacher?.lastname,
      mobileNumber: this.currentTeacher?.phone,
      email: this.currentTeacher?.email,
      gender: this.currentTeacher?.gender,
      dob: this.currentTeacher?.date_of_birth,
      jod: this.currentTeacher?.joining_date,
      });
    });
  }
  onSubmit(): any {
    this.formData = this.EditTeacherForm.value;
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

    this.updateTeacher(teacher,this.current_id);
}
}

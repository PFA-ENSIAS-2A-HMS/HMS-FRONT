import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Doctor } from '../models/student';
import { DoctorService } from '../services/student.service';
import { ToastrService } from 'ngx-toastr';
import { FiliereService } from '../services/filiere.service';
@Component({
  selector: 'app-add-student',
  templateUrl: './add-student.component.html',
  styleUrls: ['./add-student.component.css'],
  providers: [DoctorService]
})
export class AddDoctorComponent implements OnInit {
  formData: any;
  filieres: any[] = [];
  selectedFiliereId: number  = 1;

  myDoctor: Doctor = {
    cne: '',
    firstname: '',
    lastname: '',
    phone: '',
    email: '',
    gender: '',
    date_of_birth: '',
    password: ''
  }

  students: Doctor[] = [];
  addDoctorForm: FormGroup;
  



  constructor(private filiereService: FiliereService,private studentService: DoctorService, private toastr: ToastrService) {
    this.addDoctorForm = new FormGroup({
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
      mobileNumber: new FormControl('', [
        Validators.required,
        Validators.pattern(/^\d{7,}$/)
      ]),
      codeApogee: new FormControl('', [
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
      ])
      
    });
    
  }
  

  ngOnInit() {
    this.loadFilieres();
  }

  loadFilieres() {
    this.filiereService.getFilieres().subscribe(
      (filieres: any[]) => {
        this.filieres = filieres;
        console.log('hi');
        console.log(filieres);
      },
      (error) => {
        console.error(error);
      }
    );
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
    return this.addDoctorForm.get('firstname');
  }
  get lastname() {
    return this.addDoctorForm.get('lastname');
  }
  get gender() {
    return this.addDoctorForm.get('gender');
  }
  get dob() {
    return this.addDoctorForm.get('dob');
  }

  get mobileNumber() {
    return this.addDoctorForm.get('mobileNumber');
  }

  get codeApogee() {
    return this.addDoctorForm.get('codeApogee');
  }

  get PasswordAccount() {
    return this.addDoctorForm.get('PasswordAccount');
  }

  get confirmPassword() {
    return this.addDoctorForm.get('confirmPassword');
  }

  get email() {
    return this.addDoctorForm.get('email');
  }
  addDoctor(student: Doctor) {
  
    this.studentService.addDoctor(student,this.selectedFiliereId).subscribe(students => {
      this.toastr.success('Doctor added successfully');
    }, error => {
      this.toastr.error('error');
     
    });
  }


  onFiliereChange(event: any) {
    this.selectedFiliereId = event.target.value;
  }
  onSubmit(): any {
    this.formData = this.addDoctorForm.value;
    
    let student: Doctor;
    student = {
      cne: this.formData?.codeApogee,
      firstname: this.formData?.firstname,
      lastname: this.formData?.lastname,
      phone: this.formData?.mobileNumber,
      email: this.formData?.email,
      gender: this.formData?.gender == 'Male' ? 'MALE' : 'FEMALE',
      password: this.formData?.PasswordAccount,
      date_of_birth: this.formData?.dob
    }
    let x = this.addDoctor(student);

  }
}


import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Doctor } from '../models/doctor';
import { DoctorService } from '../services/doctor.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-edit-doctor',
  templateUrl: './edit-doctor.component.html',
  styleUrls: ['./edit-doctor.component.css']
})

export class EditDoctorComponent implements OnInit {
  formData: any;
  myDoctor: Doctor = {
    cne: '',
    firstname: '',
    lastname: '',
    phone: '',
    email: '',
    gender: '',
    // dob: ,
    password: ''
  }

  students: Doctor[] = [];
  addDoctorForm: FormGroup;

  // constructor(private formBuilder: FormBuilder, private studentService: DoctorService) { }

  constructor(private studentService: DoctorService,
    private toastr: ToastrService, private route: ActivatedRoute
    , private fb: FormBuilder) {

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
      email: new FormControl('', [
        Validators.required,
        Validators.pattern("[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$")
      ])
    });
    this.getDoctorByCne();
  }
  currentDoctor: any;
  current_cne: any;
  ngOnInit(): void {
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

  get email() {
    return this.addDoctorForm.get('email');
  }
  getDoctorByCne() {
    this.current_cne = this.route.snapshot.paramMap.get('cne');
    this.studentService.findDoctorByCne(this.current_cne).subscribe(student => {
      this.currentDoctor = student;
      console.log(this.currentDoctor);
      this.addDoctorForm = this.fb.group({
        firstname: this.currentDoctor.first_name,
        lastname : this.currentDoctor.last_name,
        gender : this.currentDoctor.genre,
        dob : this.currentDoctor.date_of_birth,
        mobileNumber : this.currentDoctor.phone,
        codeApogee : this.currentDoctor.cne,
        PasswordAccount : "",
        email : this.currentDoctor.email
      });
    });
  }
  addDoctor(student : Doctor){
      this.studentService.addDoctor(student,1).subscribe(students => {
        this.toastr.success('Doctor added successfully');
      },error => {
        this.toastr.error('error');
      });

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
      gender: this.formData?.gender,
      password: this.formData?.PasswordAccount
    }
    //addDoctor();
    this.addDoctor(student);
  }

}


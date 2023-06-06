import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DoctorService } from '../services/doctor.service';
import { UserService } from '../services/user.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-doctor',
  templateUrl: './add-doctor.component.html',
  styleUrls: ['./add-doctor.component.css'],
})
export class AddDoctorComponent implements OnInit {
  addDoctorForm: FormGroup | any;
  isCreatingDoctor: boolean = false;
  constructor(
    private formBuilder: FormBuilder,
    private doctorService: DoctorService,
    private toast: ToastrService,
    private userService : UserService
  ) {
    this.addDoctorForm = this.formBuilder.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      gender: ['', Validators.required],
      dob: ['', Validators.required],
      email: ['', Validators.required],
      mobileNumber: ['', Validators.required],
      specialty: ['', Validators.required],
      location: [''],
      profile: [null] // Initialize profile field as null
    });
  }

  ngOnInit(): void {
    
  }

  // Getter for form controls
  get f() {
    return this.addDoctorForm.controls;
  }

  onSubmit(): void {
    if (this.addDoctorForm.invalid) {
      return;
    }

    const doctorData = this.transformFormDataToDoctor(this.addDoctorForm.value);
    this.isCreatingDoctor = true;
    this.doctorService.saveDoctor(doctorData).subscribe(
      () => {
        this.isCreatingDoctor = false;
        this.toast.success('Doctor added successfully');
      },
      (error) => {
        this.isCreatingDoctor = false;
        this.toast.error('Error while adding doctor');
      }
    );
  }

  selectedProfileFile: File | undefined;

  onFileChange(event: any) {
    const files = event.target.files;
    if (files && files.length > 0) {
      this.selectedProfileFile = files[0];
    }
  }
  
  private transformFormDataToDoctor(formData: any): FormData {
    const transformedData = new FormData();
    transformedData.append('firstName', formData.firstname);
    transformedData.append('phoneNumber', formData.mobileNumber);
    transformedData.append('lastName', formData.lastname);
    transformedData.append('email', formData.email);
    transformedData.append('date_of_birth', formData.dob);
    transformedData.append('gender', formData.gender);
    transformedData.append('speciality', formData.specialty);
    transformedData.append('location', formData.location);
    if (this.selectedProfileFile) {
      transformedData.append('imageFile', this.selectedProfileFile);
    }
    return transformedData;
  }
  

  saveDoctor(doctor: FormData) {
    this.doctorService.saveDoctor(doctor).subscribe(
      () => {
        this.toast.success('Doctor added successfully');
      },
      (error) => {
        this.toast.error('Error while adding doctor');
      }
    );
  }
}

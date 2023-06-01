import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Doctor } from '../models/doctor';
import { ToastrService } from 'ngx-toastr';
import { DoctorService } from '../services/doctor.service';
import { saveAs } from 'file-saver';
import { SearchService } from '../search.service';
import { MatDialog } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
declare var $: any; 
@Component({
  selector: 'app-doctor-list',
  templateUrl: './doctor-list.component.html',
  styleUrls: ['./doctor-list.component.css'],
  providers: [DoctorService]
})
export class DoctorListComponent implements OnInit {
  @ViewChild('confirmationDialog') confirmationDialogTemplate!: TemplateRef<any>;
  doctorName: string = "";
  doctorId : string = "";
  doctors: any;
  role: string | any;
  addDoctorForm: FormGroup | any;
  doctor : any;
  constructor(private doctorService: DoctorService,
    private formBuilder: FormBuilder,
    private dialog: MatDialog,
    private toastr: ToastrService, public searchService: SearchService) {
     this.getDoctors();
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
    this.getCurrentUserRole();
  }
  get f() {
    return this.addDoctorForm.controls;
  }
  confirmDelete(){
    this.deleteDoctor(this.doctorId);
    $('#confirmationModal').modal('hide');
  }

  deleteDoctor(doctorId: string) {
    this.doctorService.deleteDoctor(doctorId).subscribe(
    () => {
    this.getDoctors();
    this.toastr.success('Doctor ' + this.doctorName + ' has been deleted successfully.');
    },
    (error) => {
    this.toastr.error('An error occurred while deleting Doctor ' + this.doctorName + '. Please try again later.');
    }
    );
    }

  setDoctorNameAndId(name:string,id : string){
    this.doctorName = name;
    this.doctorId = id;
    this.getDoctorById(this.doctorId);
  }
   
  getDoctorById(doctorId : string){
    this.doctorService.getDoctorById(doctorId).subscribe( doctor => {
      this.doctor = doctor;
      this.addDoctorForm.patchValue({
        firstname: this.doctor.firstName,
        lastname: this.doctor.lastName,
        gender: this.doctor.gender,
        dob: this.doctor.date_of_birth,
        email: this.doctor.email,
        mobileNumber: this.doctor.phoneNumber,
        specialty: this.doctor.speciality,
        location: this.doctor.location
      });
    }
    );
  }
  getCurrentUserRole(){
    this.role = localStorage.getItem('role');
  }

  getDoctors(): void {
    this.doctorService.getDoctors().subscribe(doctors => {
      this.doctors = doctors;
      this.doctors.forEach((doctor: any) => {
        doctor.image_url = "http://localhost:8080/api/v1/doctors/display/" + doctor.image_url;
      });
    });
  }

  

  onSubmit(): void {
    if (this.addDoctorForm.invalid) {
      return;
    }
    const doctorData = this.transformFormDataToDoctor(this.addDoctorForm.value);
    this.doctorService.updateDoctor(doctorData,this.doctorId).subscribe(
      () => {
        this.toastr.success('Doctor updated successfully');
      },
      (error) => {
        this.toastr.error('Error while updating doctor');
      }
    );
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
    return transformedData;
  }
  

}

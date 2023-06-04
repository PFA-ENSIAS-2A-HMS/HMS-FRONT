import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Doctor } from '../models/doctor';
import { ToastrService } from 'ngx-toastr';
import { DoctorService } from '../services/doctor.service';
import { saveAs } from 'file-saver';
import { SearchService } from '../search.service';
import { MatDialog } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { environment } from 'src/config/environment';
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
        doctor.image_url = environment.serverAddress+"/api/v1/doctors/display/" + doctor.image_url;
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
        this.getDoctors();
      },
      (error) => {
        this.toastr.error('Error while updating doctor');
      }
    );
  }
  
  
  private transformFormDataToDoctor(formData: any) {
    const transformedData = {
      firstName: formData.firstname,
      phoneNumber: formData.mobileNumber,
      lastName: formData.lastname,
      email: formData.email,
      date_of_birth: formData.dob,
      gender: formData.gender,
      speciality: formData.specialty,
      location: formData.location,
      role: 'DOCTOR'
    };
    return transformedData;
  }
  
  downloadDoctorsCSV(): void {
    this.doctorService.getDoctors().subscribe(doctors => {
      const csvData = this.convertDoctorsToCSV(this.doctors);
      const blob = new Blob([csvData], { type: 'text/csv;charset=utf-8' });
      saveAs(blob, 'doctors.csv');
    });
  }

  private convertDoctorsToCSV(doctors: Doctor[]): string {
    const header = 'First Name,Last Name,Gender,Date of Birth,Email,Mobile Number,Specialty,Location\n';
    let csv = '';
    doctors.forEach(doctor => {
      const row = `${doctor.firstName},${doctor.lastName},${doctor.gender},${doctor.date_of_birth},${doctor.email},${doctor.phoneNumber},${doctor.speciality},${doctor.location}\n`;
      csv += row;
    });
    return header + csv;
  }


}

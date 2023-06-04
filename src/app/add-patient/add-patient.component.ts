import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PatientService } from '../services/patient.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-patient',
  templateUrl: './add-patient.component.html',
  styleUrls: ['./add-patient.component.css'],
})
export class AddPatientComponent implements OnInit {
  addPatientForm: FormGroup | any;

  constructor(
    private formBuilder: FormBuilder,
    private patientService : PatientService,
    private toast: ToastrService
  ) {
    this.addPatientForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      gender: ['', Validators.required],
      dob: ['', Validators.required],
      phoneNumber: ['', Validators.required],
      EmergencyContact: ['', Validators.required],
      BloodType: ['', Validators.required],
      profile: [null],
      medicalHistory: ['']
    });
  }

  ngOnInit(): void {}

  // Getter for form controls
  get f() {
    return this.addPatientForm.controls;
  }

  onSubmit(): void {
    if (this.addPatientForm.invalid) {
      return;
    }

    const patientData = this.transformFormDataToPatient(this.addPatientForm.value);
    this.patientService.savePatient(patientData).subscribe(
      () => {
        this.toast.success('Patient added successfully');
      },
      (error) => {
        this.toast.error('Error while adding patient');
      }
    );
  }

  selectedImageFile: File | undefined;

  onFileChange(event: any) {
    const files = event.target.files;
    if (files && files.length > 0) {
      this.selectedImageFile = files[0];
    }
  }

  private transformFormDataToPatient(formData: any): FormData {
    const transformedData = new FormData();
    transformedData.append('firstName', formData.firstName);
    transformedData.append('lastName', formData.lastName);
    transformedData.append('gender', formData.gender);
    transformedData.append('date_of_birth', formData.dob);
    transformedData.append('phoneNumber', formData.phoneNumber);
    transformedData.append('emergencyContact', formData.EmergencyContact);
    transformedData.append('bloodType', formData.BloodType);
    if (this.selectedImageFile) {
      transformedData.append('imageFile', this.selectedImageFile);
    }
    transformedData.append('MedicalHistory', formData.medicalHistory);
    return transformedData;
  }

  savePatient(patient: FormData) {
    this.patientService.savePatient(patient).subscribe(
      () => {
        this.toast.success('Patient added successfully');
      },
      (error) => {
        this.toast.error('Error while adding patient');
      }
    );
  }
}

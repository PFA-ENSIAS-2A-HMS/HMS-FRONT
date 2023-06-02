import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Patient } from '../models/patient';
import { ToastrService } from 'ngx-toastr';
import { PatientService } from '../services/patient.service';
import { saveAs } from 'file-saver';
import { SearchService } from '../search.service';
import { MatDialog } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { environment } from 'src/config/environment';
declare var $: any;

@Component({
  selector: 'app-patient-list',
  templateUrl: './patient-list.component.html',
  styleUrls: ['./patient-list.component.css'],
  providers: [PatientService]
})
export class PatientListComponent implements OnInit {
  @ViewChild('confirmationDialog') confirmationDialogTemplate!: TemplateRef<any>;
  patientName: string = "";
  patientId: string = "";
  patients: any;
  role: string | any;
  updatePatientForm: FormGroup | any;
  patient: any;

  constructor(private patientService: PatientService,
    private formBuilder: FormBuilder,
    private dialog: MatDialog,
    private toastr: ToastrService,
    public searchService: SearchService) {
    this.getPatients();
    
    this.updatePatientForm = this.formBuilder.group({
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

  ngOnInit(): void {
    this.getCurrentUserRole();
  }

  get f() {
    return this.updatePatientForm.controls;
  }

  confirmDelete() {
    this.deletePatient(this.patientId);
    $('#confirmationModal').modal('hide');
  }

  deletePatient(patientId: string) {
    this.patientService.deletePatient(patientId).subscribe(
      () => {
        this.getPatients();
        this.toastr.success('Patient ' + this.patientName + ' has been deleted successfully.');
      },
      (error) => {
        this.toastr.error('An error occurred while deleting Patient ' + this.patientName + '. Please try again later.');
      }
    );
  }

  setPatientNameAndId(name: string, id: string) {
    this.patientName = name;
    this.patientId = id;
    this.getPatientById(this.patientId);
  }

  getPatientById(patientId: string) {
    this.patientService.getPatientById(patientId).subscribe(patient => {
      this.patient = patient;
       console.log(this.patient);
      this.updatePatientForm.patchValue({
        firstName: this.patient.firstName,
        lastName: this.patient.lastName,
        gender: this.patient.gender,
        dob: this.patient.date_of_birth,
        phoneNumber: this.patient.phoneNumber,
        EmergencyContact: this.patient.emergencyContact,
        BloodType: this.patient.bloodType,
        medicalHistory: this.patient.medicalHistory // Update status field value
      });
    });
  }

  getCurrentUserRole() {
    this.role = localStorage.getItem('role');
  }

  getPatients(): void {
    this.patientService.getPatients().subscribe(patients => {
      this.patients = patients;
      console.log(this.patients);
      this.patients.forEach((patient: any) => {
        patient.image_url = environment.serverAddress+"/api/v1/doctors/display/" + patient.image_url;
      });
    });
  }

  onSubmit(): void {
    if (this.updatePatientForm.invalid) {
      return;
    }
    const patientData = this.transformFormDataToPatient(this.updatePatientForm.value);
    this.patientService.updatePatient(patientData, this.patientId).subscribe(
      () => {
        this.toastr.success('Patient updated successfully');
        this.getPatients();
      },
      (error) => {
        this.toastr.error('Error while updating patient');
      }
    );
  }

  private transformFormDataToPatient(formData: any) {
    const transformedData = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      gender: formData.gender,
      date_of_birth: formData.dob,
      contactNumber: formData.contactNumber,
      emergencyContact: formData.emergencyContact,
      bloodType: formData.bloodType,
      status: formData.status // Include status field
    };
    return transformedData;
  }

  downloadPatients(): void {
    this.patientService.getPatients().subscribe(patients => {
      const csvData = this.convertPatientsToCSV(this.patients);
      const blob = new Blob([csvData], { type: 'text/csv;charset=utf-8' });
      saveAs(blob, 'patients.csv');
    });
  }

  private convertPatientsToCSV(patients: any[]): string {
    const header = 'First Name,Last Name,Gender,Date of Birth,Contact Number,Emergency Contact,Blood Type,Status\n';
    let csv = '';
    patients.forEach(patient => {
      const row = `${patient.firstName},${patient.lastName},${patient.gender},${patient.date_of_birth},${patient.contactNumber},${patient.emergencyContact},${patient.bloodType},${patient.status}\n`;
      csv += row;
    });
    return header + csv;
  }
}

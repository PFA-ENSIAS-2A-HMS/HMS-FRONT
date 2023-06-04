import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Appointment } from '../models/appointment';
import { DoctorService } from '../services/doctor.service';
import { ToastrService } from 'ngx-toastr';
import { PatientService } from '../services/patient.service';
import { AppointmentService } from '../services/appointment.service';

@Component({
  selector: 'app-add-appointment',
  templateUrl: './add-appointment.component.html',
  styleUrls: ['./add-appointment.component.css']
})
export class AddAppointmentComponent implements OnInit {
  addAppointmentForm: FormGroup | any;
  patient : any;
  doctor : any;
  patients : any;
  doctors : any;

  constructor(
    private formBuilder: FormBuilder,
    private doctorService: DoctorService,
    private toastr: ToastrService,
    private patientService : PatientService,
    private appointmentService:  AppointmentService
  ) {

    this.addAppointmentForm = this.formBuilder.group({
      doctorsName : ['', Validators.required],
      patientsName : ['',Validators.required],
      dateAppointment : ['',Validators.required],
      consultancyFees : ['',Validators.required],
      timeAppointment :  ['',Validators.required],
      reason :  ['',Validators.required],
      additionalInfo :  [''],
    });
    this.getAllPatients();
    this.getAllDoctors();
  }

  get f() {
    return this.addAppointmentForm.controls;
  }

  onSubmit(){
    if (this.addAppointmentForm.invalid) {
      return;
    }
    const AppointmentData = this.transformFormDataToAppointment(this.addAppointmentForm.value);
    this.appointmentService.saveAppointment(AppointmentData).subscribe(
      () => {
        this.toastr.success('Appointment added successfully');
      },
      (error) => {
        this.toastr.error('Error while adding Appointment');
      }
    );
  }

  ngOnInit(): void {
      
  }
  getAllPatients(){
  
   this.patientService.getPatients().subscribe((data)=>{
     this.patients = data;
    
   });
  }

  getAllDoctors(){
    
    this.doctorService.getDoctors().subscribe((data)=>{
      this.doctors = data;
      
    })
  }
  transformFormDataToAppointment(appointmentForm : any){
       const Appointment = {
        doctor : this.doctor,
        patient : this.patient,
        fees : appointmentForm.consultancyFees,
        date : appointmentForm.dateAppointment,
        time : appointmentForm.timeAppointment,
        reason : appointmentForm.reason,
        additionalInfos : appointmentForm.additionalInfo
       }
       return Appointment;
  }

  getPatientById(id: any){
    this.patientService.getPatientById(id).subscribe((data)=>{
      this.patient = data;
      console.log(this.patient);
    });
  }
  getDoctorById(id:any){
    this.doctorService.getDoctorById(id).subscribe((data)=>{
      this.doctor = data;
      console.log(this.doctor);
    });
  }
  onPatientSelected() {
    const selectedPatientId = this.addAppointmentForm.get('patientsName')?.value;
    this.getPatientById(selectedPatientId);
  }
  
  onDoctorSelected() {
    const selectedDoctorId = this.addAppointmentForm.get('doctorsName')?.value;
    this.getDoctorById(selectedDoctorId);
  }
  
  
}

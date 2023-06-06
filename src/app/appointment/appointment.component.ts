import { Component, OnInit } from '@angular/core';
import { Appointment } from '../models/appointment';
import { AppointmentService } from '../services/appointment.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { saveAs } from 'file-saver';
@Component({
  selector: 'app-appointment',
  templateUrl: './appointment.component.html',
  styleUrls: ['./appointment.component.css']
})
export class AppointmentComponent implements OnInit {
  appointments: any = [];
  updateStatusForm : FormGroup | any;
  appointmentId :any;
  appointmentSelected : any;
  role : any= "";
  constructor(private appointmentService: AppointmentService,
    private formBuilder: FormBuilder,
    private toastr: ToastrService
    ) {
    this.updateStatusForm = this.formBuilder.group({
      status : Validators.required
    });
  
  }

  

  ngOnInit(): void {
    this.loadAppointments();
    this.getCurrentUserRole();
  }

  getCurrentUserRole() {
    this.role = localStorage.getItem('role');
  }
  loadAppointments() {
    this.appointmentService.getAppointments().subscribe((data) => {
      this.appointments = data;
    });
  }
  getStatusColor(status: string): string {
    switch (status) {
      case "SCHEDULED":
        return 'rgb(23, 138, 0)';
      case "CONFIRMED":
        return 'rgb(0, 123, 255)';
      case "CANCELLED":
        return 'rgb(255, 0, 0)';
      case "PENDING":
        return 'rgb(255, 165, 0)';
      case "IN_PROGRESS":
        return 'rgb(110, 255, 0)';
      case "COMPLETED":
        return 'rgb(50, 50, 50)';
      case "MISSED":
        return 'rgb(128, 128, 128)';
      default:
        return '';
    }
  }
  changeAppointmentStatus(a :any,b:any){

  }
  selectAppointmentId(id:any){
    this.appointmentId = id;
    this.getAppointmentById(this.appointmentId);
  }

  getAppointmentById(id:any){
     this.appointmentService.getAppointmentById(id).subscribe((data)=>{
      this.appointmentSelected = data;
      this.updateStatusForm.patchValue({
        status : this.appointmentSelected.status
      });
     });
  }

  onSubmit(){
    this.appointmentSelected.status = this.updateStatusForm.value.status;
    console.log(this.appointmentSelected);
    this.appointmentService.updateAppointment(this.appointmentSelected, this.appointmentId).subscribe(
      () => {
        this.toastr.success('Appointment status updated successfully');
        this.loadAppointments();
      },
      (error) => {
        this.toastr.error('Error occurred while updating appointment');
      }
    );
    
  }
  downloadAppointments() {
    // Call the service method to fetch the appointments data
    this.appointmentService.getAppointments().subscribe(
      (appointments) => {
        // Convert the appointments data to CSV format
        const csvData = this.convertToCSV(appointments);
  
        // Create a Blob with the CSV data
        const blob = new Blob([csvData], { type: 'text/csv;charset=utf-8' });
  
        // Save the Blob as a file using the file-saver library
        saveAs(blob, 'appointments.csv');
      },
      (error) => {
        this.toastr.error('Error occurred while downloading appointments');
      }
    );
  }
  
  convertToCSV(appointments: any): string {
    // Create the CSV headers
    const headers = ['Doctor Name', 'Patient Name', 'Consultancy Fees', 'Appointment Date', 'Appointment Time', 'Current Status'];
  
    // Create an array to store each row of the CSV data
    const rows = [];
  
    // Iterate through the appointments and convert each one to a CSV row
    for (const appointment of appointments) {
      const row = [
        `Dr. ${appointment.doctor.firstName} ${appointment.doctor.lastName}`,
        `${appointment.patient.firstName} ${appointment.patient.lastName}`,
        `${appointment.fees} MAD`,
        appointment.date,
        appointment.time,
        appointment.status
      ];
  
      rows.push(row.join(','));
    }
  
    // Combine the headers and rows into a single CSV string
    const csvData = [headers.join(','), ...rows].join('\n');
  
    return csvData;
  }
}

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Appointment } from '../models/appointment';
import { DoctorService } from '../services/doctor.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-appointment',
  templateUrl: './add-appointment.component.html',
  styleUrls: ['./add-appointment.component.css']
})
export class AddAppointmentComponent implements OnInit {
  addAppointmentForm: FormGroup | undefined;

  constructor(
    private formBuilder: FormBuilder,
    private doctorService: DoctorService,
    private toastr: ToastrService
  ) {}


  ngOnInit(): void {
      
  }

  
}

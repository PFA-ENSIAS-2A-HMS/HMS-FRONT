import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RoomService } from '../services/room.service';
import { PatientService } from '../services/patient.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-assign-room',
  templateUrl: './assign-room.component.html',
  styleUrls: ['./assign-room.component.css']
})
export class AssignRoomComponent implements OnInit {
  assignRoomForm: FormGroup | any;
  rooms :any;
  room : any;
  patient : any;
  patients : any;
  constructor(private formBuilder: FormBuilder,
    private roomService : RoomService,
    private patientService : PatientService,
    private toastr : ToastrService) { }

  ngOnInit(): void {
    this.initAssignRoomForm();
    this.loadRooms();
    this.loadPatients();
  }

  initAssignRoomForm(): void {
    this.assignRoomForm = this.formBuilder.group({
      room: ['', Validators.required],
      patient: ['', Validators.required],
      admissionDate: ['', Validators.required],
      dischargeDate: ['', Validators.required],
      additionalNotes: ['']
    });
  }
  
  

  onSubmit(): void {
    if (this.assignRoomForm.invalid) {
      return;
    }
    const data = this.assignRoomForm.value;
    const assignment = {
      room : this.room,
      patient : this.patient,
      admissionDate : data.admissionDate,
      dischargeDate : data.dischargeDate,
      additionalNotes : data.additionalNotes
    }
   
    this.saveAssignment(assignment);
  }
  saveAssignment(assignment : any){
    this.roomService.addAssignment(assignment).subscribe(
      () => {
        this.toastr.success('Assignment has been successfully added.');
      },
      (error) => {
        // Error handling
       
        this.toastr.info(error.error.message);
      }
    );
  }
  loadRooms() {
    this.roomService.loadRooms().subscribe(
      (response) => {
        this.rooms = response;
        console.log(this.rooms);
      },
      (error) => {
        console.log('Error while loading rooms:', error);
      }
    );
  }
  loadPatients() {
    this.patientService.getPatients().subscribe(
      (response) => {
        this.patients = response;
        console.log(this.rooms);
      },
      (error) => {
        console.log('Error while loading rooms:', error);
      }
    );
  }
  onPatientSelected(){
      const selectedPatientId = this.assignRoomForm.get('patient')?.value;
      this.getPatientById(selectedPatientId);
  }

  getPatientById(id : any){
    this.patientService.getPatientById(id).subscribe((data)=>{
      this.patient = data;
    });
  }
  onRoomSelected() {
    const selectedRoomId = this.assignRoomForm.get('room')?.value;
    this.getRoomById(selectedRoomId);
  }
  getRoomById(id:any){
   this.roomService.getRoomById(id).subscribe((data)=>{
    this.room = data;
    console.log(this.room);
   });
  }
}



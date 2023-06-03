import { Component, OnInit } from '@angular/core';
import { saveAs } from 'file-saver';
import { SearchService } from '../search.service';
import { ToastrService } from 'ngx-toastr';
import { RoomService } from '../services/room.service';
import { FormBuilder, FormGroup,Validators } from '@angular/forms';
import { PatientService } from '../services/patient.service';



@Component({
  selector: 'app-room-list',
  templateUrl: './room-list.component.html',
  styleUrls: ['./room-list.component.css']
})
export class RoomListComponent implements OnInit {
 
  role: any;
  rooms : any;
  roomId : any;
  selectedRoom : any;
  assignments : any;
  assignRoomForm: FormGroup | any;
  room : any;
  patient : any;
  patients : any;

  constructor(private roomService: RoomService, private toastr: 
    ToastrService, public searchService: SearchService,
    private formBuilder: FormBuilder,
    private patientService : PatientService) {
    this.getCurrentUserRole();
  }

  ngOnInit() {
    this.loadRooms();
    this.initAssignRoomForm();
    this.loadRooms();
    this.loadPatients();
  }
  
  getCurrentUserRole() {
    this.role = localStorage.getItem('role');
  }

  assignRoom(){

  }
  viewRoom(){
    
  }
  loadRooms() {
    this.roomService.loadRooms().subscribe(
      (response) => {
        this.rooms = response;
      },
      (error) => {
        console.log('Error while loading rooms:', error);
      }
    );
  }

  selectRoomId(id : any){
    this.roomId = id;
    this.getRoomById(id);
    this.getAssignmentsByRoomId(id);
  }

  getRoomById(id:any){
   this.roomService.getRoomById(id).subscribe((data)=>{
    this.selectedRoom = data;
   })
  }
  getAssignmentsByRoomId(id:any){
   this.roomService.getAssignmentsByRoomId(id).subscribe((data)=>{
     this.assignments = data;
   });
  }

  downloadCSV() {
    const csvContent = this.convertToCSV(this.rooms);
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', 'rooms.csv');
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  convertToCSV(data: any[]): string {
    const separator = ',';
    const keys = Object.keys(data[0]);
    const headerRow = keys.join(separator);

    const rows = data.map((item) => {
      return keys.map((key) => {
        return item[key];
      }).join(separator);
    });

    return `${headerRow}\n${rows.join('\n')}`;
  }


  
  initAssignRoomForm(): void {
    this.assignRoomForm = this.formBuilder.group({
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
      room : this.selectedRoom,
      patient : this.patient,
      admissionDate : data.admissionDate,
      dischargeDate : data.dischargeDate,
      additionalNotes : data.additionalNotes
    }
    console.log(assignment);
    this.saveAssignment(assignment);
  }
  saveAssignment(assignment : any){
    this.roomService.addAssignment(assignment).subscribe(
      () => {
        this.toastr.success('Assignment has been successfully added.');
        this.loadRooms();
      },
      (error) => {
        // Error handling
        this.toastr.info(error.error.message);
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

}

import { Room } from '../models/branch';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { RoomService } from '../services/branch.service';
@Component({
  selector: 'app-assign-room',
  templateUrl: './assign-room.component.html',
  styleUrls: ['./assign-room.component.css']
})
export class AssignRoomComponent {
  formData: any;
  myRoom: Room = {
    code: '',
    name: '',
    description: '',
  }
  branchs: Room[] = [];
  addRoomForm: FormGroup;
  constructor(private bracnhService: RoomService, private toastr: ToastrService) {
    this.addRoomForm = new FormGroup({
      code: new FormControl('', [
        Validators.required,
        Validators.minLength(2)
      ]),
      name: new FormControl('', [
        Validators.required,
        Validators.minLength(6)
      ]),
      description: new FormControl('', [
        Validators.required,
        Validators.minLength(10)
      ]),
    });
  }
  get code() {
    return this.addRoomForm.get('code');
  }
  get name() {
    return this.addRoomForm.get('name');
  }
  get description() {
    return this.addRoomForm.get('description');
  }

  addHoliday(branch: Room) {
    console.log(branch);
    this.bracnhService.addRoom(branch).subscribe(branchs => {
      this.toastr.success('Room added successfully');
    }, error => {
      this.toastr.error('error');
      
    });
  }
  onSubmit(): any {
    this.formData = this.addRoomForm.value;
    let branch: Room;
    branch = {
      code: this.formData?.code,
      name: this.formData?.name,
      description: this.formData?.description,
    }
    let x = this.addHoliday(branch);
  }
}

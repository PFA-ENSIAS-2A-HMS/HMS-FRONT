import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RoomService } from '../services/room.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-room',
  templateUrl: './add-room.component.html',
  styleUrls: ['./add-room.component.css']
})
export class AddRoomComponent implements OnInit {
  addRoomForm: FormGroup | any;

  constructor(private formBuilder: FormBuilder,
    private roomService : RoomService,
    private toastr: ToastrService) { 

  }

  ngOnInit() {
    this.createAddRoomForm();
  }

  createAddRoomForm() {
    this.addRoomForm = this.formBuilder.group({
      roomNumber: ['', Validators.required],
      roomCapacity: ['', Validators.required],
      roomFloor: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.addRoomForm.valid) {
      const room = {
        roomNumber :this.addRoomForm.value.roomNumber,
        roomCapacity : this.addRoomForm.value.roomCapacity,
        floor :  this.addRoomForm.value.roomFloor,
        occupiedBeds : 0
      }
      console.log(room);
      this.addRoom(room);
    }
  }
  addRoom(room:any){
    this.roomService.addRoom(room).subscribe(
      () => {
        // Success handling
        this.toastr.success('Room added successfully');
      },
      (error) => {
        // Error handling
        this.toastr.error('Error while adding room');
      }
    );
  }
}

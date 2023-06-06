import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { environment } from 'src/config/environment';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.css'],
  providers : [UserService]
})
export class MyProfileComponent implements OnInit {
  user: any;
  constructor(private userService : UserService) { }
  ngOnInit() {
    const userId : string = localStorage.getItem('id') || '';
    this.userService.getAdminById(userId).subscribe((user) => {
      this.user = user;
      this.user.image_url =  environment.serverAddress+"/api/v1/doctors/display/"+this.user?.image_url;
    });
  }
}

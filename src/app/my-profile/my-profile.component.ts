import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';



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
    const userId = localStorage.getItem('id');
    console.log(userId);
    this.userService.getUserById(userId).subscribe((user) => {
      this.user = user;
  
    });
  }
}

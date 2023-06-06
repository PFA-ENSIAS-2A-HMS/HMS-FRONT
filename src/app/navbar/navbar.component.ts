import { Component, OnInit } from '@angular/core';
import { SearchService } from '../search.service';
import { LoginService } from '../services/login.service';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
 
import { Doctor } from '../models/doctor';
import { environment } from 'src/config/environment';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  providers: [UserService]
})

export class NavbarComponent implements OnInit {
  user: any;
  
  id : any;
  constructor(public searchService: SearchService,private loginService :  LoginService
    ,private router : Router,private userService :  UserService) { 
      this.id = localStorage.getItem('id');
      this.getUserById(this.id);
  }

  ngOnInit(): void {
    this.getUserById(this.id);
  }

  logout() {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('role');
    localStorage.removeItem('id');
    this.loginService.isLoggedIn = false;
    this.router.navigate(['/login']);
  }

  getUserById(id : any){
    this.userService.getAdminById(id).subscribe(user=>{
       this.user = user;
       this.getHospitalId(this.user?.id);
       this.user.image_url =  environment.serverAddress+"/api/v1/doctors/display/"+this.user?.image_url;
      },error=>{
    }
    ); 
   }

   getHospitalId(id : string){
    this.userService.getHospitalId(""+id).subscribe((data)=>{
     localStorage.setItem("hospitalId",data?.id);
    });
   }
}

import { Component } from '@angular/core';
import { SearchService } from '../search.service';
import { LoginService } from '../services/login.service';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-navbar-nosearcch',
  templateUrl: './navbar-nosearcch.component.html',
  styleUrls: ['./navbar-nosearcch.component.css']
})
export class NavbarNosearcchComponent {

  user: any;
  
  id : any;
  constructor(public searchService: SearchService,private loginService :  LoginService
    ,private router : Router,private userService :  UserService) { 
      this.id = localStorage.getItem('id');
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
   },error=>{
   }
   ); 
  }
}

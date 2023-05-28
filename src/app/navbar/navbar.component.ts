import { Component } from '@angular/core';
import { SearchService } from '../search.service';
import { LoginService } from '../services/login.service';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { Teacher } from '../models/teacher';
import { Doctor } from '../models/doctor';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  providers: [UserService]
})

export class NavbarComponent {
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
   this.userService.getUserById(id).subscribe(user=>{
      this.user = user;
      
   },error=>{

   }
   );
  }
}

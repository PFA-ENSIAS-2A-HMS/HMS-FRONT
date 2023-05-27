import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LoginService } from '../services/login.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm : FormGroup;
 
  constructor(private loginService : LoginService,private toastr: ToastrService,
    private router :Router){
    this.loginForm = new FormGroup({
     email : new FormControl('',
      Validators.required
     ),
     password : new FormControl(
      '',
      Validators.required
     )
    }
    );
  }

  get email(){
    return this.loginForm.get('email');
  }

  get password(){
    return this.loginForm.get('password');
  }
  submitForm() {
   this.loginService.login(this.email?.value,this.password?.value).subscribe(data=>{
    this.router.navigate(['/dashboard']);
   }, error=>{
    this.toastr.error('Invalid email or password. Please try again.')
   });
  }
}

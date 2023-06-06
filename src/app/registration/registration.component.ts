import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Admin } from '../models/admin';
import { UserService } from '../services/user.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  registrationForm: FormGroup;
  admin : Admin | any;
  constructor(private formBuilder: FormBuilder,
    private userService : UserService,
    private toastr: ToastrService,
    private router : Router) {
    this.registrationForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required]
    });
  }

  ngOnInit() {
    
  }

  submitForm() {
      const formData = this.registrationForm.value;
      console.log(formData);
      const nameParts = formData?.name.split(' '); // Split the name by space
      const firstName = nameParts[0] || ''; // Assign the first part to firstName
      const lastName = nameParts[1] || ''; // Assign the second part to lastName

      this.admin = {
        firstName: firstName,
        lastName: lastName,
        role : "ADMIN",
        email : formData?.email,
        password : formData?.password,
        gender : "MALE"
      }
      this.registerAdmin();
  }


  registerAdmin(){
    this.userService.registerAdmin(this.admin).subscribe(
      (response) => {
        
        this.toastr.success('You have registered successfully!');
        this.router.navigateByUrl('/login'); // Redirige vers la page de connexion
       },
      (error) => {
        this.toastr.error('Something went wrong');
       }
    );
  }
  
}

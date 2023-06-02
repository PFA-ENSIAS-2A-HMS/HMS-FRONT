import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReceptionistService } from '../services/receptionist.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-receptionist',
  templateUrl: './add-receptionist.component.html',
  styleUrls: ['./add-receptionist.component.css'],
})
export class AddReceptionistComponent implements OnInit {
  addReceptionistForm: FormGroup | any;

  constructor(
    private formBuilder: FormBuilder,
    private receptionistService: ReceptionistService,
    private toast: ToastrService
  ) {
    this.addReceptionistForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      gender: ['', Validators.required],
      dob: ['', Validators.required],
      email: ['', Validators.required],
      phoneNumber: ['', Validators.required],
      joiningDate: ['', Validators.required],
      profile: [null] 
    });
  }

  ngOnInit(): void {}

  // Getter for form controls
  get f() {
    return this.addReceptionistForm.controls;
  }

  onSubmit(): void {
    if (this.addReceptionistForm.invalid) {
      return;
    }
    
    const receptionistData = this.transformFormDataToReceptionist(this.addReceptionistForm.value);
    this.receptionistService.saveReceptionist(receptionistData).subscribe(
      () => {
        this.toast.success('Receptionist added successfully');
      },
      (error) => {
        this.toast.error('Error while adding receptionist');
      }
    );
  }

  selectedImageFile: File | undefined;

  onFileChange(event: any) {
    const files = event.target.files;
    if (files && files.length > 0) {
      this.selectedImageFile = files[0];
    }
  }
  
  private transformFormDataToReceptionist(formData: any): FormData {
    const transformedData = new FormData();
    transformedData.append('firstName', formData.firstName);
    transformedData.append('lastName', formData.lastName);
    transformedData.append('gender', formData.gender);
    transformedData.append('date_of_birth', formData.dob);
    transformedData.append('email', formData.email);
    transformedData.append('phoneNumber', formData.phoneNumber);
    transformedData.append('joiningDate', formData.joiningDate);
    if (this.selectedImageFile) {
      transformedData.append('imageFile', this.selectedImageFile);
    }
    transformedData.append('role', 'RECEPTIONIST');
    return transformedData;
  }
  
  saveReceptionist(receptionist: FormData) {
     
    this.receptionistService.saveReceptionist(receptionist).subscribe(
      () => {
        this.toast.success('Receptionist added successfully');
      },
      (error) => {
        this.toast.error('Error while adding receptionist');
      }
    );
  }
}

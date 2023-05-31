import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { HospitalService } from '../services/hospital.service';
import { Hospital } from '../models/hospital';
import { countries } from '../store/countries';
declare var $: any; 
@Component({
  selector: 'app-add-hospital',
  templateUrl: './add-hospital.component.html',
  styleUrls: ['./add-hospital.component.css'],
  providers: [HospitalService]
})
export class AddHospitalComponent {
  public countries: any = countries;
  selectedCountry: string = "";

  formData: any;
  myHospital: Hospital = {
    name: '',
    country: '',
    address: '',
    logo : ''
  };
  hospitals: Hospital[] = [];
  addHospitalForm: FormGroup;

  constructor(private hospitalService: HospitalService, private toastr: ToastrService) {
    this.addHospitalForm = new FormGroup({
      name: new FormControl('', [
        Validators.required,
        Validators.minLength(5)
      ]),
      country: new FormControl('', [
        Validators.required,
        Validators.minLength(3)
      ]),
      address: new FormControl('', [
        Validators.required,
      ]),
      logo : new FormControl('')
    });
  }

  get name() {
    return this.addHospitalForm.get('name');
  }

  get country() {
    return this.addHospitalForm.get('country');
  }

  get address() {
    return this.addHospitalForm.get('address');
  }

  get logo() {
    return this.addHospitalForm.get('logo');
  }
  addHospital(hospital: Hospital) {
    this.hospitalService.addHospital(hospital).subscribe(
      () => {
        $('#informationModal').modal('show');
        this.toastr.success('Your request has been submitted successfully.');
      },
      (error) => {
        this.toastr.error('Error: Failed to submit your request. Please try again later.');

      }
    );
  }

  onSubmit(): void {
    if (this.addHospitalForm.invalid) {
      return;
    }

    this.formData = this.addHospitalForm.value;
    const hospital: Hospital = {
      name: this.formData?.name,
      country: this.formData?.country,
      address: this.formData?.address,
      logo : this.formData?.logo
    };
    console.log(hospital);
    this.addHospital(hospital);
  }
}

import { Branch } from '../models/branch';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { BranchService } from '../services/branch.service';
@Component({
  selector: 'app-add-branch',
  templateUrl: './add-branch.component.html',
  styleUrls: ['./add-branch.component.css'],
  providers: [BranchService]
})

export class AddBranchComponent {
  formData: any;
  myBranch: Branch = {
    code: '',
    name: '',
    description: '',
  }
  branchs: Branch[] = [];
  addBranchForm: FormGroup;
  constructor(private bracnhService: BranchService, private toastr: ToastrService) {
    this.addBranchForm = new FormGroup({
      code: new FormControl('', [
        Validators.required,
        Validators.minLength(2)
      ]),
      name: new FormControl('', [
        Validators.required,
        Validators.minLength(6)
      ]),
      description: new FormControl('', [
        Validators.required,
        Validators.minLength(10)
      ]),
    });
  }
  get code() {
    return this.addBranchForm.get('code');
  }
  get name() {
    return this.addBranchForm.get('name');
  }
  get description() {
    return this.addBranchForm.get('description');
  }

  addHoliday(branch: Branch) {
    console.log(branch);
    this.bracnhService.addBranch(branch).subscribe(branchs => {
      this.toastr.success('Branch added successfully');
    }, error => {
      this.toastr.error('error');
      
    });
  }
  onSubmit(): any {
    this.formData = this.addBranchForm.value;
    let branch: Branch;
    branch = {
      code: this.formData?.code,
      name: this.formData?.name,
      description: this.formData?.description,
    }
    let x = this.addHoliday(branch);
  }
}

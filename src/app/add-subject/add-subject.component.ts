import { Room } from './../models/branch';
import { Subject } from '../models/subject';
import { Component, OnInit, Pipe } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { SubjectService } from '../services/subject.service';
import { RoomService } from '../services/branch.service'; 

@Component({
  selector: 'app-add-subject',
  templateUrl: './add-subject.component.html',
  styleUrls: ['./add-subject.component.css']
})
export class AddSubjectComponent {
  formData: any;
  subjects: Subject[] = [];
  addSubjectForm: FormGroup;
  filiersExist: any;
  constructor(private subjectService: SubjectService, private toastr: ToastrService, private branchService: RoomService) {
    this.addSubjectForm = new FormGroup({
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
      filiere: new FormControl('', [
        Validators.required
      ])
    });
    this.branchService.getRooms().subscribe((data: any) => {
      this.filiersExist = data;
      console.log(this.filiersExist);
    });
  }
  get code() {
    return this.addSubjectForm.get('code');
  }
  get name() {
    return this.addSubjectForm.get('name');
  }
  get description() {
    return this.addSubjectForm.get('description');
  }
  get filiere() {
    return this.addSubjectForm.get('filiere');
  }
  addSubject(subject: Subject) {
    this.subjectService.addSubject(subject).subscribe(subjects => {
      this.toastr.success('Subject added successfully');
    }, error => {
      this.toastr.error('error');
      console.log(error);
    });
  }
  onSubmit(): any {
    this.formData = this.addSubjectForm.value;
    let subject: Subject;
    subject = {
      course: {
        name: this.formData?.name,
        description: this.formData?.description,
        code: this.formData?.code
      },
      filiereIDS: [].concat(...this.formData?.filiere)
    }

    console.log(subject);
    this.addSubject(subject);
    // console.log(x);
  }

}

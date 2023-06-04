import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Receptionist } from '../models/receptionist';
import { ToastrService } from 'ngx-toastr';
import { ReceptionistService } from '../services/receptionist.service';
import { saveAs } from 'file-saver';
import { SearchService } from '../search.service';
import { MatDialog } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
declare var $: any;

@Component({
  selector: 'app-receptionist-list',
  templateUrl: './receptionist-list.component.html',
  styleUrls: ['./receptionist-list.component.css'],
  providers: [ReceptionistService]
})
export class ReceptionistListComponent implements OnInit {
  @ViewChild('confirmationDialog') confirmationDialogTemplate!: TemplateRef<any>;
  receptionistName: string = "";
  receptionistId: string = "";
  receptionists: any;
  role: string | any;
  updateReceptionistForm: FormGroup | any;
  receptionist: any;

  constructor(private receptionistService: ReceptionistService,
    private formBuilder: FormBuilder,
    private dialog: MatDialog,
    private toastr: ToastrService,
    public searchService: SearchService) {
    this.getReceptionists();
    this.updateReceptionistForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      gender: ['', Validators.required],
      dob: ['', Validators.required],
      email: ['', Validators.required],
      mobileNumber: ['', Validators.required],
      jod: [''],
      profile: [null] // Initialize profile field as null
    });
  }

  ngOnInit(): void {
    this.getCurrentUserRole();
  }

  get f() {
    return this.updateReceptionistForm.controls;
  }

  confirmDelete() {
    this.deleteReceptionist(this.receptionistId);
    $('#confirmationModal').modal('hide');
  }

  deleteReceptionist(receptionistId: string) {
    this.receptionistService.deleteReceptionist(receptionistId).subscribe(
      () => {
        this.getReceptionists();
        this.toastr.success('Receptionist ' + this.receptionistName + ' has been deleted successfully.');
      },
      (error) => {
        this.toastr.error('An error occurred while deleting Receptionist ' + this.receptionistName + '. Please try again later.');
      }
    );
  }

  setReceptionistNameAndId(name: string, id: string) {
    this.receptionistName = name;
    this.receptionistId = id;
    this.getReceptionistById(this.receptionistId);
  }

  getReceptionistById(receptionistId: string) {
    this.receptionistService.getReceptionistById(receptionistId).subscribe(receptionist => {
      this.receptionist = receptionist;
      this.updateReceptionistForm.patchValue({
        firstName: this.receptionist.firstName,
        lastName: this.receptionist.lastName,
        gender: this.receptionist.gender,
        dob: this.receptionist.date_of_birth,
        email: this.receptionist.email,
        mobileNumber: this.receptionist.phoneNumber,
        jod: this.receptionist.jod
      });
    });
  }

  getCurrentUserRole() {
    this.role = localStorage.getItem('role');
  }

  getReceptionists(): void {
    this.receptionistService.getReceptionists().subscribe(receptionists => {
      this.receptionists = receptionists;
      this.receptionists.forEach((receptionist: any) => {
        receptionist.image_url = "http://100.76.108.249:8080/api/v1/doctors/display/" + receptionist.image_url;
      });
    });
  }

  onSubmit(): void {
    if (this.updateReceptionistForm.invalid) {
      return;
    }
    const receptionistData = this.transformFormDataToReceptionist(this.updateReceptionistForm.value);
    this.receptionistService.updateReceptionist(receptionistData, this.receptionistId).subscribe(
      () => {
        this.toastr.success('Receptionist updated successfully');
        this.getReceptionists();
      },
      (error) => {
        this.toastr.error('Error while updating receptionist');
      }
    );
  }

  private transformFormDataToReceptionist(formData: any) {
    const transformedData = {
      firstName: formData.firstName,
      phoneNumber: formData.mobileNumber,
      lastName: formData.lastName,
      email: formData.email,
      date_of_birth: formData.dob,
      gender: formData.gender,
      joiningDate: formData.jod,
      role: 'RECEPTIONIST'
    };
    return transformedData;
  }

  downloadReceptionistsCSV(): void {
    this.receptionistService.getReceptionists().subscribe(receptionists => {
      const csvData = this.convertReceptionistsToCSV(this.receptionists);
      const blob = new Blob([csvData], { type: 'text/csv;charset=utf-8' });
      saveAs(blob, 'receptionists.csv');
    });
  }

  private convertReceptionistsToCSV(receptionists: Receptionist[]): string {
    const header = 'First Name,Last Name,Gender,Date of Birth,Email,Mobile Number,joining date\n';
    let csv = '';
    receptionists.forEach(receptionist => {
      const row = `${receptionist.firstName},${receptionist.lastName},${receptionist.gender},${receptionist.date_of_birth},${receptionist.email},${receptionist.phoneNumber},${receptionist.joiningDate}\n`;
      csv += row;
    });
    return header + csv;
  }
}

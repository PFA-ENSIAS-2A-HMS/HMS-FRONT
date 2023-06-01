import { Component, OnInit } from '@angular/core';
import { ReceptionistService } from '../services/receptionist.service';
import { ToastrService } from 'ngx-toastr';
import { SearchService } from '../search.service';

import * as saveAs from 'file-saver';

@Component({
  selector: 'app-receptionist-list',
  templateUrl: './receptionist-list.component.html',
  styleUrls: ['./receptionist-list.component.css'],
 
})
export class ReceptionistListComponent implements OnInit {
  
  students: any;
  role: string | any;
  receptionists : any;

  constructor(private receptionistService: ReceptionistService
    , private toastr: ToastrService, public searchService: SearchService) {
     this.receptionistService.getReceptionists().subscribe((data) => { console.log(data) });
  }

  ngOnInit(): void {
    this.receptionistService.getReceptionists().subscribe((data) => {
      this.receptionists = data;
    })
    this.getCurrentUserRole();
  }
  
  getCurrentUserRole(){
    //le code a ajouter après
    this.role = localStorage.getItem('role');
  }

  deleteTeacher(id: string) {
    this.receptionistService.deleteTeacher(id).subscribe(() => {
      this.toastr.success('Teacher deleted successfully');
      this.getReceptionists();
    }, error => {
      this.toastr.error("Failed to delete Teacher");
    });
  }

  getReceptionists(): void {
    this.receptionistService.getReceptionists().subscribe(receptionists => {
      this.receptionists = receptionists;
      console.log(this.receptionists);
    });
  }
/*
  downloadReceptionists(): void {
    this.receptionistService.getReceptionists().subscribe(receptionists => {
      this.receptionists = receptionists;
      const data = this.generateCsvData(this.receptionists);
      const blob = new Blob([data], { type: 'text/csv;charset=utf-8' });
      saveAs(blob, 'receptionists.csv');

    });
  }*/

  confirmDelete(){
    
  }
  /*
  generateCsvData(receptionists: Re[]): string {
    const headers = ['ID', 'CNE', 'First Name', 'Last Name', 'Phone', 'Email', 'Gender', 'Image URL', 'Date of Birth', 'Password'];
    const rows = receptionists.map(teacher => {
      const row = [teacher.id, teacher.matricule, teacher.firstname, teacher.lastname, teacher.phone, teacher.email, teacher.gender, teacher.image_url, teacher.date_of_birth, teacher.password];
      return row.join(',');
    });
    return [headers.join(','), ...rows].join('\n');
  }*/
}
   
 

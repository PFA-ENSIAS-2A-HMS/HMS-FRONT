import { Component, OnInit } from '@angular/core';
import { ReceptionistService } from '../services/receptionist.service';
import { ToastrService } from 'ngx-toastr';
import { SearchService } from '../search.service';
import { Teacher } from '../models/teacher';
import * as saveAs from 'file-saver';

@Component({
  selector: 'app-receptionist-list',
  templateUrl: './receptionist-list.component.html',
  styleUrls: ['./receptionist-list.component.css'],
 
})
export class ReceptionistListComponent implements OnInit {
  
  students: any;
  role: string | any;
  teachers : any;
  x = [
    {
      "CIN": "ZT277932",
      "Name": "AHMED ROUBALE",
      "Class": "10",
      "Gender": "MALE",
      "Subject": "MACHINE LEARNING",
      "Section": "A",
      "Mobile Number": "0628201023",
      "Email": "Ahmed.roubale@gmail.com"
    },
    {
      "CIN": "AK465821",
      "Name": "FATIMA ZAHRA",
      "Class": "11",
      "Gender": "FEMALE",
      "Subject": "BIOLOGY",
      "Section": "B",
      "Mobile Number": "0627508943",
      "Email": "fatima.zahra@gmail.com"
    },
    {
      "CIN": "DK764932",
      "Name": "SAID EL MAHDI",
      "Class": "12",
      "Gender": "MALE",
      "Subject": "PHYSICS",
      "Section": "C",
      "Mobile Number": "0624309258",
      "Email": "said.elmahdi@gmail.com"
    },
    {
      "CIN": "FG645391",
      "Name": "SARA MOUSSAOUI",
      "Class": "10",
      "Gender": "FEMALE",
      "Subject": "CHEMISTRY",
      "Section": "A",
      "Mobile Number": "0623100967",
      "Email": "sara.moussaoui@gmail.com"
    },
    {
      "CIN": "HG346198",
      "Name": "YASSINE EL KABBAJ",
      "Class": "11",
      "Gender": "MALE",
      "Subject": "ENGLISH",
      "Section": "B",
      "Mobile Number": "0628974305",
      "Email": "yassine.elkabbaj@gmail.com"
    }
  ];
  

  
  constructor(private receptionistService: ReceptionistService
    , private toastr: ToastrService, public searchService: SearchService) {
     this.receptionistService.getReceptionists().subscribe((data) => { console.log(data) });
  }

  ngOnInit(): void {
    this.receptionistService.getReceptionists().subscribe((data) => {
      this.teachers = data;
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
    this.receptionistService.getReceptionists().subscribe(teachers => {
      this.teachers = teachers;
      console.log(this.teachers);
    });
  }

  downloadReceptionists(): void {
    this.receptionistService.getReceptionists().subscribe(teachers => {
      this.teachers = teachers;
      const data = this.generateCsvData(this.teachers);
      const blob = new Blob([data], { type: 'text/csv;charset=utf-8' });
      saveAs(blob, 'teachers.csv');

    });
  }

  generateCsvData(teachers: Teacher[]): string {
    const headers = ['ID', 'CNE', 'First Name', 'Last Name', 'Phone', 'Email', 'Gender', 'Image URL', 'Date of Birth', 'Password'];
    const rows = teachers.map(teacher => {
      const row = [teacher.id, teacher.matricule, teacher.firstname, teacher.lastname, teacher.phone, teacher.email, teacher.gender, teacher.image_url, teacher.date_of_birth, teacher.password];
      return row.join(',');
    });
    return [headers.join(','), ...rows].join('\n');
  }
}
   
 

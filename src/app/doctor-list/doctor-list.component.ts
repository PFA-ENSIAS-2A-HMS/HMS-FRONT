import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Doctor } from '../models/doctor';
import { ToastrService } from 'ngx-toastr';
import { DoctorService } from '../services/doctor.service';
import { saveAs } from 'file-saver';
import { SearchService } from '../search.service';
import { MatDialog } from '@angular/material/dialog';
@Component({
  selector: 'app-doctor-list',
  templateUrl: './doctor-list.component.html',
  styleUrls: ['./doctor-list.component.css'],
  providers: [DoctorService]
})
export class DoctorListComponent implements OnInit {
  @ViewChild('confirmationDialog') confirmationDialogTemplate!: TemplateRef<any>;
  doctorName: string = "";

  students: any;
  doctorsList =  [
    { name: 'Dr. John Smith', specialty: 'Cardiology', location: 'New York' },
    { name: 'Dr. Sarah Johnson', specialty: 'Pediatrics', location: 'Chicago' },
    { name: 'Dr. Robert Davis', specialty: 'Orthopedics', location: 'Los Angeles' },
    // Add more doctor objects as needed
  ];
  role: string | any;

  constructor(private studentsServices: DoctorService,
    private dialog: MatDialog,
    private toastr: ToastrService, public searchService: SearchService) {
    this.studentsServices.getDoctors().subscribe((data) => { console.log(data) });
  }

  ngOnInit(): void {
    this.studentsServices.getDoctors().subscribe((data) => {
      this.students = data;
     
    })
    this.getCurrentUserRole();
  }
  setDoctorName(name:string){
   this.doctorName = name;
  }

  getCurrentUserRole(){
    //le code a ajouter après
    this.role = localStorage.getItem('role');
  }

 
 

  deleteDoctor(cne: string) {
    this.studentsServices.deleteDoctor(cne).subscribe(() => {
      this.toastr.success('Doctor deleted successfully');
      this.getDoctors();
    }, error => {
      this.toastr.error("Failed to delete student");
    });
  }

  getDoctors(): void {
    this.studentsServices.getDoctors().subscribe(students => {
      this.students = students;
    });
  }

  downloadDoctors(): void {
    this.studentsServices.getDoctors().subscribe(students => {
      this.students = students;
      const data = this.generateCsvData(this.students);
      const blob = new Blob([data], { type: 'text/csv;charset=utf-8' });
      saveAs(blob, 'students.csv');
    });
  }

  generateCsvData(students: Doctor[]): string {
    const headers = ['ID', 'CNE', 'First Name', 'Last Name', 'Phone', 'Email', 'Gender', 'Image URL', 'Date of Birth', 'Password'];
    const rows = students.map(student => {
      const row = [student.id, student.cne, student.first_name, student.last_name, student.phone, student.email, student.genre, student.image_url, student.date_of_birth, student.password];
      return row.join(',');
    });
    return [headers.join(','), ...rows].join('\n');
  }
  confirmDelete(){
      console.log('Deleting doctor:', this.doctorName);
  }

  

}

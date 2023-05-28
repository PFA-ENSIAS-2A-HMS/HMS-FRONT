import { Component } from '@angular/core';
import { SubjectService } from '../services/subject.service';
import { ToastrService } from 'ngx-toastr';
import { SearchService } from '../search.service';
import { saveAs } from 'file-saver';
@Component({
  selector: 'app-appointment',
  templateUrl: './appointment.component.html',
  styleUrls: ['./appointment.component.css']
})
export class AppointmentComponent {
  
  Patients: any;
  role: any;
  colors = ['#FFC107', '#2196F3', '#4CAF50'];
  constructor(private subjectService: SubjectService, private toastr: ToastrService, public searchService: SearchService) {
    this.subjectService.getPatients().subscribe((data: any) => {

    });
  }


  ngOnInit(): void {
    this.subjectService.getPatients().subscribe((data) => {
      this.Patients = data;
    })
    this.getCurrentUserRole();
  }
  getRooms(): void {
    this.subjectService.getPatients().subscribe(data => {
      this.Patients = data;
    });
  }
  getCurrentUserRole() {
    this.role = localStorage.getItem('role');
  }
   

  downloadPatients(): void {
    const data = this.generateCsvData(this.Patients);
    const blob = new Blob([data], { type: 'text/csv;charset=utf-8' });
    saveAs(blob, 'subjects.csv');
  }
  
  generateCsvData(data: any[]): string {
    // Créer les en-têtes CSV
    const headers = ['Subject Code', 'Name', 'Description', 'Rooms CONCERNED'];
     
    
    // Créer les lignes de données CSV
    const rows = [];
for (let i = 0; i < data.length; i++) {
  const subject = data[i];
  const filiereNames = [];
  for (let j = 0; j < subject.filiere.length; j++) {
    const filiere = subject.filiere[j];
    filiereNames.push(filiere.name);
  }
  const row = [
    subject.code,
    subject.name,
    subject.description,
    filiereNames.join(', ')
  ];
  rows.push(row);
   }

    // Concaténer les en-têtes et les lignes avec les délimiteurs CSV
    const csvContent = [headers, ...rows].map(row => row.join(',')).join('\n');
  
    return csvContent;
  }
  cancelAppointment(){
    
  }
}

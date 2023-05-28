import { Component, OnInit } from '@angular/core';
import { HospitalService } from '../services/hospital.service';
import { saveAs } from 'file-saver';
import { SearchService } from '../search.service';
import { ToastrService } from 'ngx-toastr';
import { Holiday } from '../models/holiday';

@Component({
  selector: 'app-holiday',
  templateUrl: './hospital.component.html',
  styleUrls: ['./hospital.component.css'],
  providers: [HospitalService]
})
export class HospitalComponent implements OnInit {

  deleteHoliday(id: any) {
    this.hospitalService.deleteHoliday(id).subscribe(() => {
      this.toastr.success('Holiday deleted successfully');
      this.getHolidays();
    }, error => {
      this.toastr.error("Failed to delete holiday");
    });
  }
  holidays: any;
  role : any;
  constructor(private hospitalService: HospitalService
    , private toastr: ToastrService, public searchService: SearchService) {
    console.log(this.hospitalService.getHolidays().subscribe((data) => { console.log(data) }))
  }

  ngOnInit(): void {
    this.hospitalService.getHolidays().subscribe((data) => {
      this.holidays = data;
    });
    this.getCurrentUserRole();
  }


  getCurrentUserRole(){
   this.role = localStorage.getItem('role');
   }
  getHolidays(): void {
    this.hospitalService.getHolidays().subscribe(holidays => {
      this.holidays = holidays;
    });
  }

  downloadDoctors(): void {
    this.hospitalService.getHolidays().subscribe(holidays => {
      this.holidays = holidays;
      const data = this.generateCsvData(this.holidays);
      const blob = new Blob([data], { type: 'text/csv;charset=utf-8' });
      saveAs(blob, 'holidays.csv');

    });
  }

  generateCsvData(holidays: Holiday[]): string {
    const headers = ['ID', 'TITLE', 'TYPE', 'START DATE', 'END DATE'];
    const rows = holidays.map(holiday => {
      const row = [holiday.id, holiday.title, holiday.type, holiday.start_date, holiday.end_date];
      return row.join(',');
    });
    return [headers.join(','), ...rows].join('\n');
  }
}

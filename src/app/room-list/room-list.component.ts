import { Component, OnInit } from '@angular/core';
import { saveAs } from 'file-saver';
import { SearchService } from '../search.service';
import { ToastrService } from 'ngx-toastr';
import { RoomService } from '../services/branch.service';


@Component({
  selector: 'app-room-list',
  templateUrl: './room-list.component.html',
  styleUrls: ['./room-list.component.css']
})
export class RoomListComponent implements OnInit {
  Rooms: any;
  role: any;

  constructor(private branchService: RoomService, private toastr: ToastrService, public searchService: SearchService) {
    this.branchService.getRooms().subscribe((data: any) => {
      const ids = data.map((branch: any) => branch.id);
      console.log(ids);
    });
  }


  ngOnInit(): void {
    this.branchService.getRooms().subscribe((data) => {
      this.Rooms = data;
    })
    this.getCurrentUserRole();
  }
  getRooms(): void {
    this.branchService.getRooms().subscribe(branchs => {
      this.Rooms = branchs;
    });
  }
  getCurrentUserRole() {
    this.role = localStorage.getItem('role');
  }

  assignRoom(){

  }
  viewRoom(){
    
  }

  // downloadDoctors(): void {
  //   this.holidayService.getHolidays().subscribe(holidays => {
  //     this.holidays = holidays;
  //     const data = this.generateCsvData(this.holidays);
  //     const blob = new Blob([data], { type: 'text/csv;charset=utf-8' });
  //     saveAs(blob, 'holidays.csv');


  //   });
  // }


  // generateCsvData(holidays: Holiday[]): string {
  //   const headers = ['ID', 'TITLE', 'TYPE', 'START DATE', 'END DATE'];
  //   const rows = holidays.map(holiday => {
  //     const row = [holiday.id, holiday.title, holiday.type, holiday.start_date, holiday.end_date];
  //     return row.join(',');
  //   });
  //   return [headers.join(','), ...rows].join('\n');
  // }
}

import { Component, OnInit } from '@angular/core';
import { saveAs } from 'file-saver';
import { SearchService } from '../search.service';
import { ToastrService } from 'ngx-toastr';
import { RoomService } from '../services/branch.service';

@Component({
  selector: 'app-invoices',
  templateUrl: './invoices.component.html',
  styleUrls: ['./invoices.component.css']
})
export class InvoicesComponent {
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

  viewInvoice(){

  }
  editInvoice(){

  }
  deleteInvoice(){
    
  }
}

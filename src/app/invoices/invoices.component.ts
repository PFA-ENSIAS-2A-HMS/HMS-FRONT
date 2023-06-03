import { Component, OnInit } from '@angular/core';
import { saveAs } from 'file-saver';
import { SearchService } from '../search.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-invoices',
  templateUrl: './invoices.component.html',
  styleUrls: ['./invoices.component.css']
})
export class InvoicesComponent {
  Rooms: any; 
  role: any;

}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})

export class SidebarComponent implements OnInit{
  showOptions: boolean[] = new Array(100).fill(false);
  currentPath: any;
  role : string|any;
   constructor(private route: ActivatedRoute){
    
   }
   change(i : any){
    this.showOptions[i] = !this.showOptions[i];
   }
  ngOnInit(): void {
    this.currentPath = this.route.snapshot.url.join('/');
    this.getCurrentUserRole();
  }
  getCurrentUserRole(){
    //le code a changer après
   this.role = localStorage.getItem('role');
  }
}


import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoctorListComponent } from './doctor-list.component';
import { HttpClientModule } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { saveAs } from 'file-saver';
import { NavbarComponent } from '../navbar/navbar.component';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ToastrModule } from 'ngx-toastr';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SearchFlterPipe } from '../pipes/search-flter.pipe';
import { Doctor } from '../models/doctor';
import { of, throwError } from 'rxjs';
import { DoctorService } from '../services/doctor.service';
describe('DoctorListComponent', () => {
  let component: DoctorListComponent;
  let fixture: ComponentFixture<DoctorListComponent>;
  let studentService: DoctorService;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DoctorListComponent,NavbarComponent,
        SidebarComponent,SearchFlterPipe],
       imports: [RouterTestingModule, 
        HttpClientTestingModule,
        ToastrModule.forRoot(),
        ReactiveFormsModule,
        FormsModule
      ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(DoctorListComponent);
    component = fixture.componentInstance;
    studentService = TestBed.inject(DoctorService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should generate correct CSV data', () => {
    // Arrange
    const students: Doctor[] = [
      {
        id: 1,
        cne: '123456',
        first_name: 'John',
        last_name: 'Doe',
        phone: '1234567890',
        email: 'john.doe@example.com',
        genre: 'Male',
        image_url: 'http://example.com/image.jpg',
        date_of_birth: '1990-01-01',
        password: 'password123'
      },
    ];
    const expectedCsvData = 'ID,CNE,First Name,Last Name,Phone,Email,Gender,Image URL,Date of Birth,Password\n' +
      '1,123456,John,Doe,1234567890,john.doe@example.com,Male,http://example.com/image.jpg,1990-01-01,password123';
    const csvData = component.generateCsvData(students);
    expect(csvData).toEqual(expectedCsvData);
  });

  it('should set the role from localStorage', () => {
    const role = 'ADMIN';
    spyOn(localStorage, 'getItem').and.returnValue(role);
    component.getCurrentUserRole();

    // Assert
    expect(localStorage.getItem).toHaveBeenCalledWith('role');
    expect(component.role).toEqual(role);
  });

  it('should set the role to null if not found in localStorage', () => {
    spyOn(localStorage, 'getItem').and.returnValue(null);
    component.getCurrentUserRole();
    expect(localStorage.getItem).toHaveBeenCalledWith('role');
    expect(component.role).toBeNull();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubjectListComponent } from './subject-list.component';
import { NavbarComponent } from '../navbar/navbar.component';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ToastrModule } from 'ngx-toastr';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { OverviewChartComponent } from '../overview-chart/overview-chart.component';
describe('SubjectListComponent', () => {
  let component: SubjectListComponent;
  let fixture: ComponentFixture<SubjectListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubjectListComponent,NavbarComponent,
        SidebarComponent,OverviewChartComponent],
       imports: [RouterTestingModule, 
        HttpClientTestingModule,
        ToastrModule.forRoot(),
        ReactiveFormsModule,
        FormsModule
      ],
    })
    .compileComponents();
    fixture = TestBed.createComponent(SubjectListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should set the role from localStorage', () => {
    // Arrange
    const role = 'admin';
    spyOn(localStorage, 'getItem').and.returnValue(role);

    // Act
    component.getCurrentUserRole();

    // Assert
    expect(localStorage.getItem).toHaveBeenCalledWith('role');
    expect(component.role).toEqual(role);
  });

  it('should set the role to null if not found in localStorage', () => {
    // Arrange
    spyOn(localStorage, 'getItem').and.returnValue(null);

    // Act
    component.getCurrentUserRole();

    // Assert
    expect(localStorage.getItem).toHaveBeenCalledWith('role');
    expect(component.role).toBeNull();
  });
  
  it('should generate CSV data', () => {
    const data = [
      {
        code: 'SUB1',
        name: 'Subject 1',
        description: 'Description 1',
        filiere: [
          { id: 1, name: 'Filiere 1' },
          { id: 2, name: 'Filiere 2' }
        ]
      },
      {
        code: 'SUB2',
        name: 'Subject 2',
        description: 'Description 2',
        filiere: [
          { id: 3, name: 'Filiere 3' }
        ]
      }
    ];

    const expectedCsvData = `Subject Code,Name,Description,Rooms CONCERNED
SUB1,Subject 1,Description 1,Filiere 1, Filiere 2
SUB2,Subject 2,Description 2,Filiere 3`;

    const csvData = component.generateCsvData(data);

    expect(csvData.trim()).toEqual(expectedCsvData.trim());
  });
});

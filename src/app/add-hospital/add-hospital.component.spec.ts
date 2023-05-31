import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddHospitalComponent } from './add-hospital.component';
import { NavbarComponent } from '../navbar/navbar.component';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HospitalService } from '../services/hospital.service';
import { throwError } from 'rxjs/internal/observable/throwError';
describe('AddHolidayComponent', () => {
  let component: AddHospitalComponent;
  let fixture: ComponentFixture<AddHospitalComponent>;
  let holidayService: HospitalService;
  let toastrService: ToastrService;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddHospitalComponent,NavbarComponent,
        SidebarComponent],
       imports: [RouterTestingModule, 
        HttpClientTestingModule,
        ToastrModule.forRoot(),
        ReactiveFormsModule,
        FormsModule
      ],
      providers : [HospitalService, ToastrService]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddHospitalComponent);
    component = fixture.componentInstance;
    holidayService = TestBed.inject(HospitalService);
    toastrService = TestBed.inject(ToastrService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form with default values', () => {
    expect(component.addHospitalForm.value).toEqual({
      title: '',
      type: '',
      start_date: '',
      end_date: ''
    });
  });
  it('should set form controls correctly', () => {
    const nameControl = component.addHospitalForm.get('name');
    const countryControl = component.addHospitalForm.get('country');
    const addresseDateControl = component.addHospitalForm.get('addresse');
    const logoControl = component.addHospitalForm.get('logo');

    expect(nameControl).toBeTruthy();
    expect(countryControl).toBeTruthy();
    expect(addresseDateControl).toBeTruthy();
    expect(logoControl).toBeTruthy();
  });
 
  
});

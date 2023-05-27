import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddHolidayComponent } from './add-holiday.component';
import { NavbarComponent } from '../navbar/navbar.component';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HolidayService } from '../services/holiday.service';
import { throwError } from 'rxjs/internal/observable/throwError';
describe('AddHolidayComponent', () => {
  let component: AddHolidayComponent;
  let fixture: ComponentFixture<AddHolidayComponent>;
  let holidayService: HolidayService;
  let toastrService: ToastrService;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddHolidayComponent,NavbarComponent,
        SidebarComponent],
       imports: [RouterTestingModule, 
        HttpClientTestingModule,
        ToastrModule.forRoot(),
        ReactiveFormsModule,
        FormsModule
      ],
      providers : [HolidayService, ToastrService]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddHolidayComponent);
    component = fixture.componentInstance;
    holidayService = TestBed.inject(HolidayService);
    toastrService = TestBed.inject(ToastrService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form with default values', () => {
    expect(component.addHolidayForm.value).toEqual({
      title: '',
      type: '',
      start_date: '',
      end_date: ''
    });
  });
  it('should set form controls correctly', () => {
    const titleControl = component.addHolidayForm.get('title');
    const typeControl = component.addHolidayForm.get('type');
    const startDateControl = component.addHolidayForm.get('start_date');
    const endDateControl = component.addHolidayForm.get('end_date');

    expect(titleControl).toBeTruthy();
    expect(typeControl).toBeTruthy();
    expect(startDateControl).toBeTruthy();
    expect(endDateControl).toBeTruthy();
  });
 
  
});

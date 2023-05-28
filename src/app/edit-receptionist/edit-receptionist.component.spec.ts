import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EditReceptionistComponenet } from './edit-receptionist.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ToastrModule } from 'ngx-toastr';
import { NavbarComponent } from '../navbar/navbar.component';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
describe('EditTeacherComponent', () => {
  let component: EditReceptionistComponenet;
  let fixture: ComponentFixture<EditReceptionistComponenet>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditReceptionistComponenet,NavbarComponent,
        SidebarComponent],
       imports: [RouterTestingModule, 
        HttpClientTestingModule,
        ToastrModule.forRoot(),
        ReactiveFormsModule,
        FormsModule
      ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditReceptionistComponenet);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

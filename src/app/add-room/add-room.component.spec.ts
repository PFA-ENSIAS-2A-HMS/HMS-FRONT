import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddRoomComponent } from './add-room.component';
import { NavbarComponent } from '../navbar/navbar.component';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ToastrModule } from 'ngx-toastr';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

describe('AddRoomComponent', () => {
  let component: AddRoomComponent;
  let fixture: ComponentFixture<AddRoomComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        AddRoomComponent,
        NavbarComponent,
        SidebarComponent
      ],
      imports: [
        RouterTestingModule,
        HttpClientTestingModule,
        ToastrModule.forRoot(),
        ReactiveFormsModule,
        FormsModule
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AddRoomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create AddRoomComponent', () => {
    expect(component).toBeTruthy();
  });

  it('should create NavbarComponent', () => {
    const navbarFixture = TestBed.createComponent(NavbarComponent);
    const navbarComponent = navbarFixture.componentInstance;
    expect(navbarComponent).toBeTruthy();
  });

  it('should create SidebarComponent', () => {
    const sidebarFixture = TestBed.createComponent(SidebarComponent);
    const sidebarComponent = sidebarFixture.componentInstance;
    expect(sidebarComponent).toBeTruthy();
  });
});

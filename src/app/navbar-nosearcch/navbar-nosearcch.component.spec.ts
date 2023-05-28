import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarNosearcchComponent } from './navbar-nosearcch.component';

describe('NavbarNosearcchComponent', () => {
  let component: NavbarNosearcchComponent;
  let fixture: ComponentFixture<NavbarNosearcchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NavbarNosearcchComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NavbarNosearcchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

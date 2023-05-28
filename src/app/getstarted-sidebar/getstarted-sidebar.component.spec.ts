import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetstartedSidebarComponent } from './getstarted-sidebar.component';

describe('GetstartedSidebarComponent', () => {
  let component: GetstartedSidebarComponent;
  let fixture: ComponentFixture<GetstartedSidebarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GetstartedSidebarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GetstartedSidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

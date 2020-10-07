import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalendatComponent } from './calendat.component';

describe('CalendatComponent', () => {
  let component: CalendatComponent;
  let fixture: ComponentFixture<CalendatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CalendatComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CalendatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

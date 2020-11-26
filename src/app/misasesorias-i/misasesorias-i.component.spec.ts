import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MisasesoriasIComponent } from './misasesorias-i.component';

describe('MisasesoriasIComponent', () => {
  let component: MisasesoriasIComponent;
  let fixture: ComponentFixture<MisasesoriasIComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MisasesoriasIComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MisasesoriasIComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

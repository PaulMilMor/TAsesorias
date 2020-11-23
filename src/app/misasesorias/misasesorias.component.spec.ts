import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MisasesoriasComponent } from './misasesorias.component';

describe('MisasesoriasComponent', () => {
  let component: MisasesoriasComponent;
  let fixture: ComponentFixture<MisasesoriasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MisasesoriasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MisasesoriasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

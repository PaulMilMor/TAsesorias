import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BanlistComponent } from './banlist.component';

describe('BanlistComponent', () => {
  let component: BanlistComponent;
  let fixture: ComponentFixture<BanlistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BanlistComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BanlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

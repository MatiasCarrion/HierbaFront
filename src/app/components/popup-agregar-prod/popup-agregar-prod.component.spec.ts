import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupAgregarProdComponent } from './popup-agregar-prod.component';

describe('PopupAgregarProdComponent', () => {
  let component: PopupAgregarProdComponent;
  let fixture: ComponentFixture<PopupAgregarProdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PopupAgregarProdComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PopupAgregarProdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

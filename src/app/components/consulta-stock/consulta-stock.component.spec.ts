import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultaStockComponent } from './consulta-stock.component';

describe('ConsultaStockComponent', () => {
  let component: ConsultaStockComponent;
  let fixture: ComponentFixture<ConsultaStockComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConsultaStockComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsultaStockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
